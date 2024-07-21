<script lang="ts" setup>
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import 'vue3-draggable-resizable/dist/Vue3DraggableResizable.css';
import { ref } from 'vue';
import { SimpleScrollbar } from '~/packages/materials/src';
import type { ContainerLeftProps } from './src/typing';
const containerLeftBox = ref<HTMLElement>();
const props = withDefaults(defineProps<ContainerLeftProps>(), {
  initW: 300,
  maxW: 800,
  minW: 120
});
const width = ref(props.initW);
const resizing = ref(false);
function resizeHandleEnd() {
  if (width.value < props.minW) {
    width.value = props.minW;
  } else if (width.value > props.maxW) {
    width.value = props.maxW;
  }
  resizing.value = false;
  debugger;
}

function resizeHandleStart() {
  resizing.value = true;
}
/** 修改句柄会被隐藏的bug */
function setHandleMrToShow() {
  const handleMr = containerLeftBox.value?.querySelectorAll('.handle.handle-mr');
  if (handleMr && handleMr.length > 0) {
    handleMr[0].setAttribute('style', 'display: block;');
  }
}
</script>

<template>
  <div
    ref="containerLeftBox"
    class="container-left-box"
    :class="{
      active: resizing
    }"
    :style="{ width: `${width}px` }"
    @mouseenter="setHandleMrToShow"
  >
    <Vue3DraggableResizable
      v-model:w="width"
      active
      class="h-full"
      disabled-h
      :draggable="false"
      :min-w="minW"
      :init-w="initW"
      :handles="['mr']"
      resizable
      @resize-start="resizeHandleStart"
      @resize-end="resizeHandleEnd"
    >
      <div class="h-full flex-col">
        <slot name="header"></slot>
        <div class="h-1 flex-1">
          <SimpleScrollbar>
            <slot></slot>
          </SimpleScrollbar>
        </div>
        <slot name="footer"></slot>
      </div>
    </Vue3DraggableResizable>
  </div>
</template>

<style lang="scss">
.container-left-box {
  position: relative;
  height: 100%;
  overflow: hidden;
  .vdr-container.active {
    border-color: unset;
    border-style: unset;
  }
  &active {
    .vdr-handle.vdr-handle-mr.handle.handle-mr {
      opacity: 1;
      width: 3px;
    }
  }
  .vdr-handle.vdr-handle-mr.handle.handle-mr {
    height: 100%;
    opacity: 0;
    border-bottom: 0;
    border-top: 0;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    width: 8px;
    right: 0;
    top: 0%;
    margin-top: 1;
    margin-bottom: 0;
    margin-top: 0;
    transform: 0.1s opacity;
    &:hover {
      width: 3px;
      opacity: 1;
    }
  }
}
</style>
