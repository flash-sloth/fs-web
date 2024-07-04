import { getCurrentInstance, nextTick, reactive, ref, unref, watchEffect } from 'vue';
import { tryOnUnmounted } from '@vueuse/core';
import { isFunction, isProdMode } from '@sa/utils';
import type {
  DmSwitcherInnerCallBack,
  DmSwitcherInnerMethods,
  DmSwitcherInnerRegister,
  DmSwitcherMethods,
  DmSwitcherOpenParam,
  UseDmSwitcherReturnType
} from './typing';

const dataTransfer = reactive<any>({});

/** @description: Applicable to independent modal and call outside */
export function useDmSwitcher<T>(): UseDmSwitcherReturnType<T> {
  const switcher = ref<Nullable<DmSwitcherMethods<T>>>(null);
  const loaded = ref<Nullable<boolean>>(false);
  const uid = ref<number>(0);

  function register(modalMethod: DmSwitcherMethods<T>, uuid: number) {
    isProdMode() &&
      tryOnUnmounted(() => {
        switcher.value = null;
      });
    if (!getCurrentInstance()) {
      throw new Error('useDmSwitcher() can only be used inside setup() or functional components!');
    }
    uid.value = uuid;
    switcher.value = modalMethod;
    loaded.value = true;
  }

  const getInstance = () => {
    const instance = unref(switcher);
    if (!instance) {
      throw new Error('switcher instance is undefined!');
    }
    return instance;
  };

  return [
    register,
    {
      show: (data?: DmSwitcherOpenParam<T>) => {
        dataTransfer[unref(uid)] = data;
        getInstance()?.show();
      },
      close: () => {
        getInstance()?.close();
      }
    }
  ];
}

export const useDmSwitcherInner: <T>(
  callbackFn?: DmSwitcherInnerCallBack<T>
) => [register: DmSwitcherInnerRegister, innerMethods: DmSwitcherInnerMethods] = <T>(
  callbackFn?: DmSwitcherInnerCallBack<T>
) => {
  const switcher = ref<Nullable<DmSwitcherInnerMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<number>(0);

  const getInstance = () => {
    const instance = unref(switcher);
    if (!instance) {
      throw new Error('switcher instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance: DmSwitcherInnerMethods, uuid: number) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        switcher.value = null;
      });
    uidRef.value = uuid;
    switcher.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };
  watchEffect(() => {
    const data = dataTransfer[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      show: () => {
        getInstance()?.show();
      },
      close: () => {
        getInstance()?.close();
      }
    }
  ];
};
