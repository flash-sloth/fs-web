import type { VxeFormPropTypes, VxeGridPropTypes } from 'vxe-table';
export interface pageConfig {
  enabled: boolean;
  getTotal: string | ((data: any) => number);
  getData: string | ((data: any) => any[]);
}
/**
 * 加载数据的方法 返回Promise<any> 可以通过pageConfig.getData获取数据 pageConfig.getTotal获取总条数 用于数据分页显示 如果用户未开启分页功能，则返回Promise<any[]>
 *
 * @param params 参数是 props.params 与 searchForm.data 合并
 */
export type LoaderFunction = (params: any) => Promise<any>;
/** 参数回显函数 */
export type echoLoaderFunction = (selectKey: any[]) => Promise<{ [key: string]: string }>;

export interface AssociationSelectProps {
  value: string | any[];
  loader: LoaderFunction;
  valueType: 'string' | 'array';
  echoLoader?: echoLoaderFunction;
  params?: { [key: string]: any };
  pageConfig: pageConfig;
  columns: VxeGridPropTypes.Columns;
  /** 搜索表单配置 */
  searchFormConfig?: VxeFormPropTypes.Items;
  /** 弹窗宽度 */
  modalWidth?: number;
  placeholder?: string;
}
