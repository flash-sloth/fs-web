declare namespace Model {
  /** 系统分页请求参数 */
  interface PageParam<T> {
    /** 查询参数 */
    model: T;
    /** 每页显示数据 */
    size: number;
    /** 当前页 */
    current: number;
    /** 排序,默认id */
    sort?: string;
    /** 排序规则, 默认descending */
    order?: string;
    extra?: any;
  }
  /** 系统分页响应参数 */
  interface PageResult<T> {
    records: T[];
    /** 当前页码 */
    pageNumber: number;
    /** 每页数据数量 */
    pageSize: number;
    /** 总页数 */
    totalPage: number;
    /** 总数据数量 */
    totalRow: number;
    /** 是否优化分页查询 COUNT 语句 */
    optimizeCountQuery: boolean;
  }
}
