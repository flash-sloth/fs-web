import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (actionColumn?: VxeTableDefines.ColumnOptions<RowVO>): VxeGridPropTypes.Columns<RowVO> => {
  const columnsDef: VxeGridPropTypes.Columns<RowVO> = [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    {
      field: 'tableName',
      title: '表名称'
    },
    {
      field: '表注释',
      title: 'tableDescription'
    },
    {
      field: 'entityDesign.name',
      title: '实体类名'
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

// 存放在 service/model
export interface RowVO {
  id: number;
  name: string;
  nickname: string;
  role: string;
  sex: string;
  age: number;
  address: string;
}
