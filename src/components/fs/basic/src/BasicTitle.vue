<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { useDesign } from '@/hooks/web/useDesign';
import BasicHelp from './BasicHelp.vue';

interface Props {
  helpPosition?: 'before' | 'after';
  /** Help text list or string */
  helpMessage?: string | string[];
  /** Whether the color block on the left side of the title */
  span?: boolean;
  /** Whether to default the text, that is, not bold */
  normal?: boolean;
  /** 是否显示底部线条 */
  line?: boolean;
  /** 底部线条 是否虚线 */
  dashed?: boolean;
  /** 是否显示光标 */
  cursor?: boolean;
  /** 是否不能选择 */
  noneSelect?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  helpPosition: 'after',
  helpMessage: '',
  span: false,
  normal: true,
  line: false,
  dashed: false,
  cursor: false,
  noneSelect: false
});

const { prefixCls } = useDesign('basic-title');
const slots = useSlots();
const getClass = computed(() => [
  prefixCls,
  { [`${prefixCls}-show-span`]: props.span && slots.default },
  { [`${prefixCls}-line`]: Boolean(props.line) },
  { [`${prefixCls}-cursor`]: Boolean(props.cursor) },
  { [`${prefixCls}-none-select`]: Boolean(props.noneSelect) },
  { [`${prefixCls}-dashed`]: Boolean(props.line) && Boolean(props.dashed) },
  { [`${prefixCls}-normal`]: Boolean(props.normal) }
]);
</script>

<template>
  <span :class="getClass">
    <slot></slot>
    <BasicHelp v-if="helpMessage" :class="`${prefixCls}-help`" :text="helpMessage" />
  </span>
</template>

<style lang="scss" scoped>
$prefix-cls: $namespace + '-basic-title';

.#{$prefix-cls} {
  position: relative;
  display: flex;
  padding-left: 7px;
  font-size: var(--n-font-size);
  font-weight: 500;
  line-height: 24px;
  color: rgb(var(--base-text-color));

  &-none-select {
    user-select: none;
  }

  &-cursor {
    cursor: pointer;
  }

  &-normal {
    font-size: var(--n-font-size);
    font-weight: normal;
  }

  &-line {
    border-bottom: $border-width-base solid transparent;
    // Chrome not accept `inherit` in `border-top`
    border-bottom-color: inherit;
  }

  &-dashed {
    background: none;
    border-color: $divider-color;
    border-style: dashed;
    border-width: 0 0 $border-width-base;
  }

  &-show-span::before {
    position: absolute;
    top: 4px;
    left: 0;
    width: 3px;
    height: var(--n-font-size);
    margin-right: 4px;
    background-color: rgb(var(--primary-color));
    content: '';
  }

  &-help {
    margin-left: 10px;
  }
}
</style>
