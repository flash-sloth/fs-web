<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';
import { omit } from 'lodash';
import { Modal } from 'ant-design-vue';
import type { DmSwitcherInnerMethods } from './typing';
const instance = getCurrentInstance();
const wapperRef = ref();
const visible = ref(false);

const emit = defineEmits<{
  register: [modalInstance: DmSwitcherInnerMethods, uuid: number];
}>();
const modalMethods: DmSwitcherInnerMethods = {
  show: () => {
    visible.value = true;
  },
  close: () => {
    visible.value = false;
  }
};
if (instance) {
  emit('register', modalMethods, instance.uid);
}
</script>

<template>
  <Modal ref="wapperRef" v-bind="$attrs" v-model:visible="visible">
    <slot></slot>
    <template v-for="item in Object.keys(omit($slots, 'default'))" :key="item" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>
