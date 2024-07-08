import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { PageParam } from '@/models/common-models';
import type { DataSource } from './model';
const urlPrefix = '/baseDatasource';
/**
 * 分页查询
 *
 * @param params 分页查询参数
 * @returns
 */
export const queryPage = (params: PageParam<DataSource>) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}/page`,
    method: RequestEnum.POST,
    params
  });

/**
 * 删除
 *
 * @param ids
 * @returns
 */
export const deleteBatch = (ids: number[]) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}`,
    method: RequestEnum.DELETE,
    data: ids
  });

export const getInfo = (id: number) =>
  defHttp.request<DataSource>({
    url: `${urlPrefix}/cache/${id}`,
    method: RequestEnum.GET
  });

export const update = (params: DataSource) => {
  return defHttp.request<DataSource>({
    url: `${urlPrefix}`,
    params,
    method: RequestEnum.PUT
  });
};
export const save = (params: DataSource) => {
  return defHttp.request<DataSource>({
    url: `${urlPrefix}`,
    params,
    method: RequestEnum.POST
  });
};
