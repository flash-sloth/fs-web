import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import type { CodeBaseClass } from '@/service/main/generator/codeBaseClass/model';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (
  actionColumn?: VxeTableDefines.ColumnOptions<CodeBaseClass>
): VxeGridPropTypes.Columns<CodeBaseClass> => {
  const columnsDef: VxeGridPropTypes.Columns<CodeBaseClass> = [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    {
      field: 'name',
      title: '类名'
    },
    {
      field: 'packageName',
      title: '完整包名'
    },
    {
      field: 'classType',
      title: '类型'
    },
    {
      field: 'state',
      title: '状态'
    },
    {
      field: 'weight',
      title: '顺序'
    },
    {
      field: 'remark',
      title: '备注'
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
      { field: 'name', title: '数据源名称', itemRender: { name: 'VxeInput' } },
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
