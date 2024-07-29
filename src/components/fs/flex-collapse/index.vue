<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DoubleLeftOutlined } from '@ant-design/icons-vue';
import { isUndefined } from 'xe-utils';
import type { CollapseProps } from './src/typing';
const props = withDefaults(defineProps<Partial<CollapseProps>>(), {
  min: 0,
  max: '900px',
  collapsePanelPosition: 'right',
  expandedTip: '收起',
  unExpandedTip: '展开'
});
const emits = defineEmits<{
  (e: 'update:expanded', collapse: boolean): void;
  (e: 'onExpandedChange', collapse: boolean): void;
}>();
const expandedInner = ref(false);
if (isUndefined(props.expanded)) {
  expandedInner.value = props.expanded;
}

const flexBoxClass = computed(() => {
  return {
    'w-1': props.collapsePanelPosition === 'left' || props.collapsePanelPosition === 'right',
    'h-1': props.collapsePanelPosition === 'top' || props.collapsePanelPosition === 'bottom'
  };
});
const isVertical = computed(() => {
  return props.collapsePanelPosition === 'top' || props.collapsePanelPosition === 'bottom';
});
const collapsePanelStyle = computed(() => {
  const { min, max } = props;
  if (isVertical.value) {
    return {
      height: !expandedInner.value ? min : max,
      width: '100%',
      overflow: 'hidden'
    };
  }
  return {
    width: !expandedInner.value ? min : max,
    height: '100%',
    overflow: 'hidden'
  };
});

const collapsePanelInnerStyle = computed(() => {
  if (isVertical.value) {
    return {
      height: props.max,
      width: '100%'
    };
  }
  return {
    width: props.max,
    height: '100%'
  };
});
const rotate = computed(() => {
  if (isVertical.value) {
    return !expandedInner.value ? 90 : 270;
  }
  return !expandedInner.value ? 0 : 180;
});
const title = computed(() => {
  return expandedInner.value ? props.expandedTip : props.unExpandedTip;
});

watch(
  () => props.expanded,
  val => {
    expandedInner.value = val;
    emits('onExpandedChange', expandedInner.value);
  }
);
function toggle() {
  if (isUndefined(props.expanded)) {
    emits('update:expanded', !props.expanded);
  } else {
    expandedInner.value = !expandedInner.value;
    emits('update:expanded', !props.expanded);
    emits('onExpandedChange', expandedInner.value);
  }
}
</script>

<template>
  <AFlex :vertical="isVertical">
    <template v-if="collapsePanelPosition === 'left' || collapsePanelPosition === 'top'">
      <div class="trans transition-all duration-300" :style="collapsePanelStyle">
        <div :style="collapsePanelInnerStyle">
          <slot name="collapsePanel"></slot>
        </div>
      </div>
      <AFlex :vertical="!isVertical">
        <div class="flex-1"></div>
        <DoubleLeftOutlined
          :rotate="rotate"
          class="cursor-pointer text-5 text-warmGray hover:text-6"
          :title="title"
          @click="toggle"
        />
        <div class="flex-1"></div>
      </AFlex>
    </template>

    <div class="flex-1" :class="flexBoxClass">
      <slot name="flexBox"></slot>
    </div>

    <template v-if="collapsePanelPosition === 'right' || collapsePanelPosition === 'bottom'">
      <AFlex :vertical="!isVertical" align="center" justify="center">
        <div class="flex-1"></div>
        <DoubleLeftOutlined
          :rotate="rotate"
          class="cursor-pointer text-5 text-warmGray hover:text-6"
          :title="title"
          @click="toggle"
        />
        <div class="flex-1"></div>
      </AFlex>
      <div class="trans transition-all duration-300" :style="collapsePanelStyle">
        <div :style="collapsePanelInnerStyle">
          <slot name="collapsePanel"></slot>
        </div>
      </div>
    </template>
  </AFlex>
</template>
