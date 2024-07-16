import { RequestEnum } from '@vben/http';
import { defHttp } from '@/service/http';
import type { PageParam } from '@/models/common-models';
import type { CodeCreatorEidtDto, CodeCreatorImportDto, CodeCreatorPageDto, CodeGenDto } from './model';
const urlPrefix = '/main/codeCreator';
/**
 * 预览
 *
 * @param ids
 * @returns
 */
export const preview = (params: CodeGenDto) =>
  defHttp.request<any[]>({
    url: `${urlPrefix}/preview`,
    method: RequestEnum.POST,
    params
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
    url: `${urlPrefix}/cache/${id}`,
    method: RequestEnum.GET
  });

export const updateCodeCreatorInfo = (params: CodeCreatorEidtDto) => {
  return defHttp.request<CodeCreatorEidtDto>({
    url: `${urlPrefix}`,
    params,
    method: RequestEnum.PUT
  });
};

export const generator = (params: CodeGenDto) =>
  defHttp.request<CodeCreatorEidtDto>({
    url: `${urlPrefix}/generator`,
    params,
    method: RequestEnum.POST
  });

export const download = (params: { ids: string[]; codeIds: string[] }) => {
  return defHttp.download({
    url: `${urlPrefix}/download`,
    params,
    method: RequestEnum.GET
  });
};

export const listTableMetadata = (params: { dsId: string }) =>
  defHttp.request<any>({
    url: `${urlPrefix}/listTableMetadata?dsId=${params.dsId}`,
    method: RequestEnum.POST
  });
