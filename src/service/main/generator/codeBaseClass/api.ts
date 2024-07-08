import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { PageParam } from '@/models/common-models';
import type { CodeBaseClass } from './model';
const urlPrefix = '/main/codeBaseClass';
/**
 * 分页查询
 *
 * @param params 分页查询参数
 * @returns
 */
export const queryPage = (params: PageParam<CodeBaseClass>) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}/page`,
    method: RequestEnum.POST,
    params
  });

export const list = (params: CodeBaseClass = {}) =>
  defHttp.request<CodeBaseClass[]>({
    url: `${urlPrefix}/list`,
    params,
    method: RequestEnum.POST
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
  defHttp.request<CodeBaseClass>({
    url: `${urlPrefix}/cache/${id}`,
    method: RequestEnum.GET
  });

export const update = (params: CodeBaseClass) => {
  return defHttp.request<CodeBaseClass>({
    url: `${urlPrefix}`,
    params,
    method: RequestEnum.PUT
  });
};
export const save = (params: CodeBaseClass) => {
  return defHttp.request<CodeBaseClass>({
    url: `${urlPrefix}`,
    params,
    method: RequestEnum.POST
  });
};
