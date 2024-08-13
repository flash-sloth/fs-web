<script lang="ts">
import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';
import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    spin: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { prefixCls } = useDesign('svg-icon');
    // const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    const symbolId = computed(() => {
      const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env;

      const defaultLocalIcon = 'no-icon';

      const icon = props.name || defaultLocalIcon;

      return `#${prefix}-${icon}`;
    });

    const getStyle = computed((): CSSProperties => {
      const { size } = props;
      let s = `${size}`;
      s = `${s.replace('px', '')}px`;
      return {
        width: s,
        height: s
      };
    });
    return { symbolId, prefixCls, getStyle };
  }
});
</script>

<template>
  <svg :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" fill="currentColor" />
  </svg>
</template>

<style lang="scss" scoped>
$prefix-cls: $namespace + '-svg-icon';

.#{$prefix-cls} {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
