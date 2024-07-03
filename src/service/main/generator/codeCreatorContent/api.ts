import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
const urlPrefix = '/codeCreatorContent';

export const updateCodeCreatorContent = (params: { id: string; content: string }) => {
  return defHttp.request({ url: urlPrefix, params, method: RequestEnum.PUT });
};
