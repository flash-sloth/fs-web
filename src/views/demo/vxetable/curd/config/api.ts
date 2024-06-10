import type { AxiosRequestConfig } from 'axios';
import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
const MODULAR = '/system/test2';
export const Api = {
  Page: {
    url: `${MODULAR}/page`,
    method: RequestEnum.POST
  } as AxiosRequestConfig,
  save: {
    url: `${MODULAR}/save`,
    method: RequestEnum.POST
  } as AxiosRequestConfig,
  Update: {
    url: `${MODULAR}/updateById`,
    method: RequestEnum.POST
  } as AxiosRequestConfig,
  Delete: {
    url: `${MODULAR}`,
    method: RequestEnum.DELETE
  } as AxiosRequestConfig,
  Get: {
    url: `${MODULAR}/get`,
    method: RequestEnum.GET
  } as AxiosRequestConfig
};
/**
 * @param params 分页查询
 * @returns
 */
export async function page(params: any) {
  return defHttp.request<any>({
    ...Api.Page,
    params
  });
}

export async function save(params: any) {
  return defHttp.request<any>({
    ...Api.save,
    data: params
  });
}

export async function update(params: any) {
  return defHttp.request<any>({
    ...Api.Update,
    data: params
  });
}

export async function deleteBatch(ids: any[]) {
  return defHttp.request<any>({
    ...Api.Delete,
    data: ids
  });
}

export async function get(id: number) {
  return defHttp.request<any>({
    ...Api.Get,
    params: { id }
  });
}
