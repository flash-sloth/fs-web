// 列配置

import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import type { RowVO } from './model';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (actionColumn?: VxeTableDefines.ColumnOptions<RowVO>): VxeGridPropTypes.Columns<RowVO> => {
  const columnsDef: VxeGridPropTypes.Columns<RowVO> = [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    {
      field: 'name',
      title: '名字',
      editRender: {
        name: 'VxeInput'
      }
    },
    {
      field: 'type3',
      title: 'type3',
      editRender: {
        name: 'VxeInput'
      }
    },
    {
      field: 'type2',
      title: 'type3',
      editRender: {
        name: 'VxeInput'
      }
    }
  ];
  actionColumn && columnsDef.push(actionColumn);
  return columnsDef;
};
/** 搜索表单配置 */
export const searchFormConfig = (): VxeGridPropTypes.FormConfig => {
  return {
    data: {
      name: ''
    },
    items: [
      { field: 'name', title: '名称', itemRender: { name: 'VxeInput' } },
      {
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            {
              type: 'submit',
              content: '搜索',
              status: 'primary'
            },
            { type: 'reset', content: '重置' }
          ]
        }
      }
    ]
  };
};
