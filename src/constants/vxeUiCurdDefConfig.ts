import type { VxeGridProps } from 'vxe-table';
import { deepMerge } from '@sa/utils';

/** 针对后台返回对象为mybatis-flex封装对象 ,帮助proxy解析服务器返回数据 */
export const myBatisFlexGridProxyConfigProps = {
  list: null, // 用于列表，读取响应数据
  result: 'records', // 用于分页，读取响应数据
  total: 'totalRow' // 用于分页，读取总条数
};
/**
 * @param customer 用户关于xgrid 的自定义配置
 * @returns 默认配置和用户自定义配置合并后的对象
 */
export function defGridConfig<T>(customer: VxeGridProps<T>): VxeGridProps<T> {
  return deepMerge(
    {
      /** 保持撑满父控件 */
      // height: 'auto',
      minHeight: 500,
      pagerConfig: {
        enabled: true,
        pageSize: 20
      },
      proxyConfig: {
        // 启用表单
        form: true,
        props: {
          ...myBatisFlexGridProxyConfigProps
        }
      }
    },
    customer
  );
}
