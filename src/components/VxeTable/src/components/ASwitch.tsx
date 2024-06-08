import { h } from 'vue';
import XEUtils from 'xe-utils';
import type { VxeGlobalRendererHandles } from 'vxe-table';
import {
  createDefaultFilterRender,
  createDefaultRender,
  createEditRender,
  createEvents,
  createFormItemRender,
  createProps,
  getComponent
} from './common';

export default {
  renderDefault: createDefaultRender(),
  renderEdit: createEditRender(),
  renderFilter(
    renderOpts: VxeGlobalRendererHandles.RenderOptions,
    params: VxeGlobalRendererHandles.RenderParams & { column: any; $panel: any }
  ) {
    const { column } = params;
    const { name, attrs } = renderOpts;
    const Component = getComponent(name);

    return [
      h(
        'div',
        {
          class: 'vxe-table--filter-antd-wrapper'
        },
        column.filters.map((option: { data: any }, oIndex: any) => {
          const optionValue = option.data;
          return h(Component, {
            key: oIndex,
            ...attrs,
            ...createProps(renderOpts, optionValue),
            ...createEvents({
              renderOpts,
              params,
              inputFunc: (value: any) => {
                // 处理 model 值双向绑定
                option.data = value;
              },
              changeFunc: () => {
                // 处理 change 事件相关逻辑
                const { $panel } = params;
                $panel.changeOption(null, XEUtils.isBoolean(option.data), option);
              }
            })
          });
        })
      )
    ];
  },
  defaultFilterMethod: createDefaultFilterRender(),
  renderItemContent: createFormItemRender()
};
