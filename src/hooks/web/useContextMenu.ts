import { getCurrentInstance, onUnmounted } from 'vue';
import { createContextMenu, destroyContextMenu } from '@/components/fs/context-menu';
import type { ContextMenuItem } from '@/components/fs/context-menu';
export type { ContextMenuItem };
export function useContextMenu(authRemove = true) {
  if (getCurrentInstance() && authRemove) {
    onUnmounted(() => {
      destroyContextMenu();
    });
  }
  return [createContextMenu, destroyContextMenu];
}
