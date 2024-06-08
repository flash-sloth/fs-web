import { h } from 'vue';
import type { VxeGlobalRendererHandles } from 'vxe-table';
import { getComponent } from './common';

function createEmptyRender() {
  return (renderOpts: VxeGlobalRendererHandles.RenderEditOptions) => {
    const { name, attrs, props } = renderOpts;

    const Component = getComponent(name);
    return [
      h(
        'div',
        {
          class: 'flex items-center justify-center'
        },
        h(Component, {
          ...attrs,
          ...props
        })
      )
    ];
  };
}

export default {
  renderEmpty: createEmptyRender()
};
