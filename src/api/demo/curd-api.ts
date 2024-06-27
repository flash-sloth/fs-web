import type { AxiosRequestConfig } from 'axios';
import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { CurdModel, CurdPageDto, CurdPageVo, CurdSaveDto, CurdUpdateDto } from '@/models/demo/curd-models';
import type { PageParam, PageResult } from '@/models/common-models';
const MODULAR = '/demo/genTestSimple';
export const Api = {
  Page: {
    url: `${MODULAR}/page`,
    method: RequestEnum.POST
  } as AxiosRequestConfig,
  save: {
    url: `${MODULAR}`,
    method: RequestEnum.POST
  } as AxiosRequestConfig,
  Update: {
    url: `${MODULAR}`,
    method: RequestEnum.PUT
  } as AxiosRequestConfig,
  Delete: {
    url: `${MODULAR}`,
    method: RequestEnum.DELETE
  } as AxiosRequestConfig,
  Get: {
    url: `${MODULAR}/detail`,
    method: RequestEnum.GET
  } as AxiosRequestConfig
};
/**
 * @param params 分页查询
 * @returns
 */
export async function page(params: PageParam<CurdPageDto>) {
  return defHttp.request<PageResult<CurdPageVo>>({
    ...Api.Page,
    params
  });
}

export async function save(params: CurdSaveDto) {
  return defHttp.request<CurdModel>({
    ...Api.save,
    data: params
  });
}

export async function update(params: CurdUpdateDto) {
  return defHttp.request<CurdModel>({
    ...Api.Update,
    data: params
  });
}

export async function deleteBatch(ids: number[]) {
  return defHttp.request<boolean>({
    ...Api.Delete,
    data: ids
  });
}

export async function get(id: number) {
  return defHttp.request<CurdModel>({
    ...Api.Get,
    params: { id }
  });
}
