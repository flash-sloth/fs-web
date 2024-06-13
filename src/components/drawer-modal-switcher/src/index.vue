v
<script lang="ts" setup>
import { computed, defineEmits, getCurrentInstance, ref } from 'vue';
import { omit } from 'lodash';
import type { DrawerProps, ModalProps } from 'ant-design-vue';
import { Drawer, Modal } from 'ant-design-vue';
import type { VxeDrawerProps } from 'vxe-pc-ui';
import { VxeDrawer, VxeModal } from 'vxe-pc-ui';
import type { DmSwitcherInnerMethods, SwitcherWrapperType } from './typing';
const instance = getCurrentInstance();
const wapperRef = ref();
interface Props {
  is?: SwitcherWrapperType;
}
const props = withDefaults(defineProps<Props & (DrawerProps & ModalProps & VxeDrawerProps & VxeDrawerProps)>(), {
  is: 'AModal'
});
const visible = ref(false);
defineOptions({
  inheritAttrs: false
});
const emit = defineEmits<{
  register: [modalInstance: DmSwitcherInnerMethods, uuid: number];
}>();
const modalMethods: DmSwitcherInnerMethods = {
  show: () => {
    visible.value = true;
    wapperRef?.value?.open();
  },
  close: () => {
    console.log('close,switcher');
    visible.value = false;
    wapperRef?.value?.close();
  }
};
if (instance) {
  emit('register', modalMethods, instance.uid);
}
const wapper = computed(() => {
  return (
    {
      AModal: Modal,
      VxeModal,
      ADrawer: Drawer,
      VxeDrawer
    }[props.is] || Modal
  );
});
</script>

<template>
  <div>我在这里{{ visible }}</div>
  <component :is="wapper" ref="wapperRef" v-bind="$attrs" v-model:visible="visible">
    <slot></slot>
    <template v-for="item in Object.keys(omit($slots, 'default'))" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </component>
</template>
