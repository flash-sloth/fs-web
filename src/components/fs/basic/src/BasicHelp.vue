<script lang="tsx">
import type { CSSProperties, PropType } from 'vue';
import { computed, defineComponent, unref } from 'vue';
import { Tooltip } from 'ant-design-vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { getPopupContainer } from '@/utils';
import { isArray, isString } from '@/utils/is';
import { getSlot } from '@/utils/helper/tsxHelper';
import { useDesign } from '@/hooks/web/useDesign';

export default defineComponent({
  name: 'BasicHelp',
  components: { Tooltip },
  props: {
    /**
     * Help text max-width
     *
     * @default: 600px
     */
    maxWidth: { type: String, default: '600px' },
    /**
     * Whether to display the serial number
     *
     * @default: false
     */
    showIndex: { type: Boolean },
    /**
     * Help text font color
     *
     * @default: #ffffff
     */
    color: { type: String, default: '#ffffff' },
    /**
     * Help text font size
     *
     * @default: 14px
     */
    fontSize: { type: String, default: '14px' },
    /** Help text list */
    placement: { type: String, default: 'right' },
    /** Help text list */
    text: { type: [Array, String] as PropType<string[] | string> }
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('basic-help');

    const getTooltipStyle = computed((): CSSProperties => ({ color: props.color, fontSize: props.fontSize }));

    const getOverlayStyle = computed((): CSSProperties => ({ maxWidth: props.maxWidth }));

    function renderTitle() {
      const textList = props.text;

      if (isString(textList)) {
        return <p>{textList}</p>;
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {props.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          );
        });
      }
      return null;
    }

    return () => {
      return (
        <Tooltip
          overlayClassName={`${prefixCls}__wrap`}
          title={<div style={unref(getTooltipStyle)}>{renderTitle()}</div>}
          autoAdjustOverflow={true}
          overlayStyle={unref(getOverlayStyle)}
          placement={props.placement as 'right'}
          getPopupContainer={() => getPopupContainer()}
        >
          <span class={prefixCls}>{getSlot(slots) || <InfoCircleOutlined />}</span>
        </Tooltip>
      );
    };
  }
});
</script>

<style lang="scss">
$prefix-cls: $namespace + '-basic-help';

.#{$prefix-cls} {
  display: inline-block;
  margin-left: 6px;
  font-size: 14px;
  color: rgb(var(--base-text-color));
  cursor: pointer;

  &:hover {
    color: rgb(var(--primary-color));
  }

  &__wrap {
    p {
      margin-bottom: 0;
    }
  }
}
</style>
