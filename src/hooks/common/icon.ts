import { useSvgIconRender } from '@sa/hooks';
import SvgIcon from '@/components/fs/icon/src/MergeIcon.vue';
export function useSvgIcon() {
  const { SvgIconVNode } = useSvgIconRender(SvgIcon);

  return {
    SvgIconVNode
  };
}
