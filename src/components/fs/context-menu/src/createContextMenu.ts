import { createVNode, render } from 'vue';
import { isClient } from '@/utils/is';
import { usePermission } from '@/hooks/web/usePermission';
import contextMenuVue from './ContextMenu.vue';
import type { ContextMenuProps, CreateContextOptions } from './typing';

const menuManager: {
  domList: Element[];
  resolve: Fn;
} = {
  domList: [],
  resolve: () => {}
};

export const createContextMenu = (options: CreateContextOptions): Promise<any> => {
  const { event } = options || {};

  event && event?.preventDefault();

  if (!isClient) {
    throw new Error('no window');
  }

  return new Promise(resolve => {
    const body = document.body;

    const container = document.createElement('div');
    const propsData: Partial<ContextMenuProps> = {};
    if (options.styles) {
      propsData.styles = options.styles;
    }

    if (options.items) {
      const { isPermission } = usePermission();
      propsData.items = options.items.filter(item => {
        return isPermission(item.auth, true, item.authMode);
      });
    }

    if (options.event) {
      propsData.customEvent = event;
      propsData.axis = { x: event.clientX, y: event.clientY };
    }

    const vm = createVNode(contextMenuVue, propsData);
    render(vm, container);

    const handleClick = () => {
      menuManager.resolve('');
    };

    menuManager.domList.push(container);

    const remove = () => {
      menuManager.domList.forEach((dom: Element) => {
        try {
          dom && body.removeChild(dom);
        } catch (error) {}
      });
      body.removeEventListener('click', handleClick);
      body.removeEventListener('scroll', handleClick);
    };

    menuManager.resolve = arg => {
      remove();
      resolve(arg);
    };
    remove();
    body.appendChild(container);
    body.addEventListener('click', handleClick);
    body.addEventListener('scroll', handleClick);
  });
};

export const destroyContextMenu = () => {
  if (menuManager) {
    menuManager.resolve('');
    menuManager.domList = [];
  }
};
