export type ApiTreeSelectProps = {
  /**
   * 请求数据的接口，返回promise
   *
   * @param params 用户通过props传入的参数
   * @returns 返回TreeSelect需要数据
   */
  api: (params: any) => Promise<any>;
  /** 请求参数 */
  params?: any;
  /**
   * 请求前需要处理的事情
   *
   * @param params 用户通过props传入的参数
   * @returns
   */
  beforeload?: (params: any) => Promise<any>;
  /**
   * @param res 请求返回的数据
   * @returns 返回处理完成的数据，共TreeSelect
   */
  afterload?: (res: any) => Promise<any>;
  /**
   * 是否在加载时立即请求数据
   *
   * @default false
   */
  immediately?: boolean;
  value?: number[] | string[] | number | string;
};

export interface ApiTreeSelectInstance {
  reload(): void;
  blur(): void;
  focus(): void;
}
