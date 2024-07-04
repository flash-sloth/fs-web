import type { InjectionKey, UnwrapRef } from 'vue';
import { readonly as defineReadonly, inject, provide, reactive } from 'vue';

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function createContext<T>(context: any, key: InjectionKey<T>, options: CreateContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return {
    state
  };
}

// eslint-disable-next-line default-param-last
export function useContext<T>(key: InjectionKey<T>, defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
