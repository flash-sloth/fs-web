import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';

export const preview = (ids: string[]) =>
  defHttp.request<any[]>({
    url: `/main/codeCreator/preview`,
    method: RequestEnum.POST,
    params: { ids, reload: true }
  });
