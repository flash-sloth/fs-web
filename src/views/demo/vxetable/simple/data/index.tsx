import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';

import type { CodeTestSimpleVo } from '@/service/demo/test/codeTestSimple/model';

/**
 * 表格列
 *
 * @param action 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (action: VxeTableDefines.ColumnOptions): VxeGridPropTypes.Columns<CodeTestSimpleVo> => {
  return [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', width: 50, fixed: 'left' },
    {
      field: 'name',
      title: '表名称'
    },
    {
      field: '库存',
      title: 'stock'
    },
    {
      field: 'state',
      title: '状态'
    },
    action
  ];
};

/** 搜索表单配置 */
export const searchFormConfig = (): VxeGridPropTypes.FormConfig => {
  return {
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
