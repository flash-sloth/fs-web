/** 系统分页请求参数 */
export interface PageParam<T> {
  size: number;
  current: number;
  model: T;
  sort?: string;
  order?: string;
  extra?: any;
}
/** 系统分页响应参数 */
export interface PageResult<T> {
  records: T[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
  totalRow: number;
  optimizeCountQuery: boolean;
}
