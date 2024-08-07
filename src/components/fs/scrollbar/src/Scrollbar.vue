<script lang="ts">
import type { CSSProperties } from 'vue';
import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, provide, ref, unref } from 'vue';
import { addResizeListener, removeResizeListener } from '@/utils/event';
import { toObject } from './util';
import Bar from './bar';

export default defineComponent({
  name: 'Scrollbar',
  // inheritAttrs: false,
  components: { Bar },
  props: {
    native: {
      type: Boolean,
      default: false
    },
    wrapStyle: {
      type: [String, Array],
      default: ''
    },
    wrapClass: {
      type: [String, Array],
      default: ''
    },
    viewClass: {
      type: [String, Array],
      default: ''
    },
    viewStyle: {
      type: [String, Array],
      default: ''
    },
    noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
    tag: {
      type: String,
      default: 'div'
    }
  },
  setup(props) {
    const sizeWidth = ref('0');
    const sizeHeight = ref('0');
    const moveX = ref(0);
    const moveY = ref(0);
    const wrap = ref();
    const resize = ref();

    provide('scroll-bar-wrap', wrap);

    const style = computed<CSSProperties>(() => {
      if (Array.isArray(props.wrapStyle)) {
        return toObject(props.wrapStyle) as CSSProperties;
      }
      return props.wrapStyle as unknown as CSSProperties;
    });

    const handleScroll = () => {
      if (!props.native) {
        moveY.value = (unref(wrap).scrollTop * 100) / unref(wrap).clientHeight;
        moveX.value = (unref(wrap).scrollLeft * 100) / unref(wrap).clientWidth;
      }
    };

    const update = () => {
      if (!unref(wrap)) return;

      const heightPercentage = (unref(wrap).clientHeight * 100) / unref(wrap).scrollHeight;
      const widthPercentage = (unref(wrap).clientWidth * 100) / unref(wrap).scrollWidth;

      sizeHeight.value = heightPercentage < 100 ? `${heightPercentage}%` : '';
      sizeWidth.value = widthPercentage < 100 ? `${widthPercentage}%` : '';
    };

    onMounted(() => {
      if (props.native) return;
      nextTick().then(update);
      if (!props.noresize) {
        addResizeListener(unref(resize), update);
        addResizeListener(unref(wrap), update);
        addEventListener('resize', update);
      }
    });

    onBeforeUnmount(() => {
      if (props.native) return;
      if (!props.noresize) {
        removeResizeListener(unref(resize), update);
        removeResizeListener(unref(wrap), update);
        removeEventListener('resize', update);
      }
    });

    return {
      moveX,
      moveY,
      sizeWidth,
      sizeHeight,
      style,
      wrap,
      resize,
      update,
      handleScroll
    };
  }
});
</script>

<template>
  <div class="scrollbar">
    <div
      ref="wrap"
      class="scrollbar__wrap"
      :class="[wrapClass, native ? '' : 'scrollbar__wrap--hidden-default']"
      :style="style"
      @scroll="handleScroll"
    >
      <component :is="tag" ref="resize" class="scrollbar__view" :class="[viewClass]" :style="viewStyle">
        <slot></slot>
      </component>
    </div>

    <template v-if="!native">
      <Bar :move="moveX" :size="sizeWidth" />
      <Bar vertical :move="moveY" :size="sizeHeight" />
    </template>
  </div>
</template>

<style lang="scss">
.scrollbar {
  position: relative;
  height: 100%;
  overflow: hidden;

  &__wrap {
    height: 100%;
    overflow: auto;

    &--hidden-default {
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
        width: 0;
        height: 0;
        opacity: 0%;
      }
    }
  }

  &__thumb {
    position: relative;
    display: block;
    width: 0;
    height: 0;
    cursor: pointer;
    background-color: rgb(144 147 153 / 30%);
    border-radius: inherit;
    transition: 0.3s background-color;

    &:hover {
      background-color: rgb(144 147 153 / 50%);
    }
  }

  &__bar {
    position: absolute;
    right: 2px;
    bottom: 2px;
    z-index: 1;
    border-radius: 4px;
    opacity: 0%;
    transition: opacity 80ms ease;

    &.is-vertical {
      top: 2px;
      width: 6px;

      & > div {
        width: 100%;
      }
    }

    &.is-horizontal {
      left: 2px;
      height: 6px;

      & > div {
        height: 100%;
      }
    }
  }
}

.scrollbar:active > .scrollbar__bar,
.scrollbar:focus > .scrollbar__bar,
.scrollbar:hover > .scrollbar__bar {
  opacity: 100%;
  transition: opacity 340ms ease-out;
}
</style>
