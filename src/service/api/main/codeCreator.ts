import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { CodeCreatorEidtDto, CodeCreatorImportDto, CodeCreatorPageDto } from '@/service/model/main/codeCreator';
import type { PageParam } from '@/models/common-models';
const urlPrefix = '/main/codeCreator';
/**
 * 预览
 *
 * @param ids
 * @returns
 */
export const preview = (ids: string[]) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}/preview`,
    method: RequestEnum.POST,
    params: ids
  });
/**
 * 分页查询
 *
 * @param params 分页查询参数
 * @returns
 */
export const queryPage = (params: PageParam<CodeCreatorPageDto>) =>
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

export const importTable = (params: CodeCreatorImportDto) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}/importTable`,
    method: RequestEnum.POST,
    params
  });

export const getCodeCreatorInfo = (id: string) =>
  defHttp.request<CodeCreatorEidtDto>({
    url: `${urlPrefix}/${id}`,
    method: RequestEnum.GET
  });
