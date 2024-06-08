import type { VxeGlobalRendererHandles } from 'vxe-table';
import XEUtils from 'xe-utils';
import { createCellRender, createEditRender, createExportMethod, createFormItemRender } from './common';

function matchCascaderData({
  index,
  list,
  values,
  labels
}: {
  index: number;
  list: any[];
  values: any[];
  labels: any[];
}) {
  const val = values[index];
  if (list && values.length > index) {
    XEUtils.each(list, item => {
      if (item.value === val) {
        labels.push(item.label);
        const newIndex = index + 1;
        matchCascaderData({ index: newIndex, list: item.children, values, labels });
      }
    });
  }
}

function getCascaderCellValue(
  renderOpts: VxeGlobalRendererHandles.RenderOptions,
  params: VxeGlobalRendererHandles.RenderCellParams
) {
  const { props = {} } = renderOpts;
  const { row, column } = params;
  const cellValue = XEUtils.get(row, column.field as string);
  const values = cellValue || [];
  const labels: Array<any> = [];
  matchCascaderData({ index: 0, list: props.options, values, labels });
  return (props.showAllLevels === false ? labels.slice(labels.length - 1, labels.length) : labels).join(
    ` ${props.separator || '/'} `
  );
}

export default {
  renderEdit: createEditRender(),
  renderCell: createCellRender(getCascaderCellValue),
  renderItemContent: createFormItemRender(),
  exportMethod: createExportMethod(getCascaderCellValue)
};
