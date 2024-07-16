<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { omit } from 'lodash';
import { Modal } from 'ant-design-vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import FullScreen from '@/components/common/full-screen.vue';
import { $t } from '@/locales';
import type { DmSwitcherInnerMethods } from './typing';
const props = withDefaults(
  defineProps<{
    title?: string;
    fullscreen?: boolean;
    canFullscreen?: boolean;
    warpClassName?: string;
    closable?: boolean;
  }>(),
  {
    title: '',
    fullscreen: false,
    canFullscreen: true,
    warpClassName: '',
    closable: true
  }
);
const wapperRef = ref();
const visible = ref(false);
const isFullscreen = ref<boolean>(false);
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
onMounted(() => {
  const instance = getCurrentInstance();
  if (instance) {
    emit('register', modalMethods, instance.uid);
  }
});
function toggle() {
  isFullscreen.value = !isFullscreen.value;
}
const warpClasses = computed(() => {
  const classes = [];
  if (props.fullscreen || isFullscreen.value) {
    classes.push('fs-fullscreen-modal');
  }
  if (props.warpClassName) {
    classes.push(props.warpClassName);
  }
  return classes.join(' ');
});

function close() {
  visible.value = false;
}
</script>

<template>
  <Modal
    ref="wapperRef"
    v-bind="$attrs"
    v-model:open="visible"
    :ok-text="$attrs.onText || $t('common.submit')"
    :closable="false"
    :wrap-class-name="warpClasses"
  >
    <template v-if="!$slots.title" #title>
      <AFlex>
        <div class="w-1 flex-1">{{ title }}</div>
        <FullScreen v-if="canFullscreen" :full="isFullscreen" @click="toggle"></FullScreen>
        <ButtonIcon v-if="closable" :tooltip-content="$t('common.close')" @click="close">
          <CloseOutlined />
        </ButtonIcon>
      </AFlex>
    </template>

    <slot></slot>
    <template v-for="item in Object.keys(omit($slots, 'default'))" :key="item" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<style lang="scss">
.fs-fullscreen-modal {
  overflow: hidden;
  .ant-modal {
    inset: 0 !important;
    width: 100% !important;
    max-width: 100%;
    height: 100%;

    &-content {
      height: 100%;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    &-body {
      flex: 1;
      overflow: auto;
    }
  }
  .ant-modal-footer {
    margin-top: 0;
  }
}
</style>
