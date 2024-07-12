import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { PageParam } from '@/models/common-models';
import type { BaseApiConfig } from '@/service/anyone/validate/model';
import type { CodeBaseClass } from './model';
const urlPrefix = '/main/codeBaseClass';
/** 接口配置 */
export const ApiConfig: Record<string, BaseApiConfig> = {
  // 分页查询
  QueryPage: {
    url: `${urlPrefix}/page`,
    method: RequestEnum.POST
  },
  List: {
    url: `${urlPrefix}/list`,
    method: RequestEnum.POST
  },
  Delete: {
    url: `${urlPrefix}`,
    method: RequestEnum.DELETE
  },
  GetInfo: {
    url: `${urlPrefix}/cache/:id`,
    method: RequestEnum.GET
  },
  Update: {
    url: `${urlPrefix}`,
    method: RequestEnum.PUT
  },
  Save: {
    url: `${urlPrefix}`,
    method: RequestEnum.POST
  }
};

/**
 * 分页查询
 *
 * @param params 分页查询参数
 * @returns
 */
export const queryPage = (params: PageParam<CodeBaseClass>) =>
  defHttp.request<any[]>({
    ...ApiConfig.QueryPage,
    params
  });

export const list = (params: CodeBaseClass = {}) =>
  defHttp.request<CodeBaseClass[]>({
    ...ApiConfig.List,
    params
  });

/**
 * 删除
 *
 * @param ids
 * @returns
 */
export const deleteBatch = (ids: number[]) =>
  defHttp.request<boolean>({
    ...ApiConfig.Delete,
    data: ids
  });

export const getInfo = (id: number) =>
  defHttp.request<CodeBaseClass>({
    ...ApiConfig.GetInfo,
    url: ApiConfig.GetInfo.url.replace(':id', id.toString())
  });

export const update = (params: CodeBaseClass) => {
  return defHttp.request<CodeBaseClass>({
    ...ApiConfig.Update,
    params
  });
};
export const save = (params: CodeBaseClass) => {
  return defHttp.request<CodeBaseClass>({
    ...ApiConfig.Save,
    params
  });
};
