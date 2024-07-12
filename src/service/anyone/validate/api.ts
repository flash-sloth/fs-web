import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { HibernateValidator } from '@/typings/hibernateValidator';
import type { BaseApiConfig } from './model';

export function getValidateConfig(apiConfig: BaseApiConfig): Promise<any> {
  return defHttp.request<{
    [key: string]: HibernateValidator[];
  }>({
    url: '/base/validate/config',
    params: apiConfig,
    method: RequestEnum.POST
  });
}
