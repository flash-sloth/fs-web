import type { VxeGridPropTypes } from 'vxe-table';

export function queryBefore<T>(params: VxeGridPropTypes.ProxyAjaxQueryParams): Model.PageParam<T> {
  const { page, sorts, form } = params;
  const filters = params.filters;
  const queryParams: Model.PageParam<any> = { model: { ...form }, size: page.pageSize, current: page.currentPage };

  // 处理排序条件
  const firstSort = sorts[0];
  if (firstSort) {
    queryParams.sort = firstSort.property;
    queryParams.order = firstSort.order;
  }
  // 处理筛选条件
  filters.forEach(({ property, values }) => {
    queryParams.model[property] = values.join(',');
  });
  return queryParams;
}
