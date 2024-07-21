<script lang="tsx">
import type { CSSProperties, FunctionalComponent, PropType } from 'vue';
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, unref } from 'vue';
import { Divider, Menu } from 'ant-design-vue';
import Icon from '@/components/fs/icon';
import type { Axis, ContextMenuItem, ItemContentProps } from './typing';

const prefixCls = 'context-menu';

const ItemContent: FunctionalComponent<ItemContentProps> = props => {
  const { item } = props;
  return (
    <span style="display: inline-block; width: 100%; " class="px-4" onClick={props.handler.bind(null, item)}>
      {props.showIcon && item.icon && <Icon class="mr-2" icon={item.icon} />}
      <span>{item.label}</span>
    </span>
  );
};

export default defineComponent({
  name: 'ContextMenu',
  props: {
    width: { type: Number, default: 156 },
    customEvent: { type: Object as PropType<Event>, default: null },
    styles: { type: Object as PropType<CSSProperties> },
    showIcon: { type: Boolean, default: true },
    axis: {
      // The position of the right mouse button click
      type: Object as PropType<Axis>,
      default() {
        return { x: 0, y: 0 };
      }
    },
    items: {
      // The most important list, if not, will not be displayed
      type: Array as PropType<ContextMenuItem[]>,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const wrapRef = ref(null);
    const showRef = ref(false);

    const getStyle = computed((): CSSProperties => {
      const { axis, items, styles, width } = props;
      const { x, y } = axis || { x: 0, y: 0 };
      const menuHeight = (items || []).length * 40;
      const menuWidth = width;
      const body = document.body;

      const left = body.clientWidth < x + menuWidth ? x - menuWidth : x;
      const top = body.clientHeight < y + menuHeight ? y - menuHeight : y;
      return {
        ...styles,
        position: 'absolute',
        width: `${width}px`,
        left: `${left + 1}px`,
        top: `${top + 1}px`,
        zIndex: 9999
      };
    });

    onMounted(() => {
      nextTick().then(() => (showRef.value = true));
    });

    onUnmounted(() => {
      const el = unref(wrapRef);
      el && document.body.removeChild(el);
    });

    function handleAction(item: ContextMenuItem, e: MouseEvent) {
      const { handler, disabled } = item;
      if (disabled) {
        return;
      }
      showRef.value = false;
      e?.stopPropagation();
      e?.preventDefault();
      handler?.();
    }

    function renderMenuItem(items: ContextMenuItem[]) {
      const visibleItems = items.filter(item => !item.hidden);
      return visibleItems.map(item => {
        const { disabled, label, children, divider = false } = item;

        const contentProps = {
          item,
          handler: handleAction,
          showIcon: props.showIcon
        };

        if (!children || children.length === 0) {
          return (
            <>
              <Menu.Item disabled={disabled} class={`${prefixCls}__item`} key={label}>
                <ItemContent {...contentProps} />
              </Menu.Item>
              {divider ? <Divider key={`d-${label}`} /> : null}
            </>
          );
        }
        if (!unref(showRef)) return null;

        return (
          <Menu.SubMenu key={label} disabled={disabled} popupClassName={`${prefixCls}__popup`}>
            {{
              title: () => <ItemContent {...contentProps} />,
              default: () => renderMenuItem(children)
            }}
          </Menu.SubMenu>
        );
      });
    }
    return () => {
      if (!unref(showRef)) {
        return null;
      }
      const { items } = props;
      return (
        <div class={prefixCls}>
          <Menu inlineIndent={12} mode="vertical" ref={wrapRef} style={unref(getStyle)}>
            {renderMenuItem(items)}
          </Menu>
        </div>
      );
    };
  }
});
</script>

<style lang="scss">
// 定义变量
$default-height: 42px !important;
$small-height: 36px !important;
$large-height: 36px !important;

// 定义一个mixin
@mixin item-style() {
  li {
    display: inline-block;
    width: 100%;
    height: $default-height;
    margin: 0 !important;
    line-height: $default-height;

    span {
      line-height: $default-height;
    }

    > div {
      margin: 0 !important;
    }

    &:not(.ant-menu-item-disabled):hover {
      color: $text-color-base; // 注意：这里假设$text-color-base和@item-hover-bg已经定义
      // background-color: $item-hover-bg; // 注意：同样假设$item-hover-bg已经定义
    }
  }
}

.context-menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  display: block;
  width: 156px;
  margin: 0;
  list-style: none;
  background-color: $component-background; // 注意：假设$component-background已经定义
  border: 1px solid rgba(0, 0, 0, 0.08); // 转换为rgba
  border-radius: 0.25rem;
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.06);
  background-clip: padding-box;
  user-select: none;

  &__item {
    margin: 0 !important;
  }

  @include item-style(); // 引入mixin

  .ant-divider {
    margin: 0;
  }

  &__popup {
    .ant-divider {
      margin: 0;
    }

    @include item-style(); // 再次引入mixin
  }

  .ant-menu-submenu-title,
  .ant-menu-item {
    padding: 0 !important;
  }
}
</style>
