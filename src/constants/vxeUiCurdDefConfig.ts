import type { VxeGridProps } from 'vxe-table';
import { deepMerge } from '@sa/utils';
/**
 * @param customer 用户关于xgrid 的自定义配置
 * @returns 默认配置和用户自定义配置合并后的对象
 */
export function defGridConfig<T>(customer: VxeGridProps<T>): VxeGridProps<T> {
  return deepMerge(
    {
      /** 保持撑满父控件 */
      height: 'auto',
      minHeight: 500,
      pagerConfig: {
        enabled: true,
        pageSize: 20
      }
    },
    customer
  );
}
