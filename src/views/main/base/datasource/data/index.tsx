import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import type { DataSource } from '@/service/main/base/datasource/model';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (
  actionColumn?: VxeTableDefines.ColumnOptions<DataSource>
): VxeGridPropTypes.Columns<DataSource> => {
  const columnsDef: VxeGridPropTypes.Columns<DataSource> = [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    {
      field: 'name',
      title: '数据源名称'
    },
    {
      field: 'username',
      title: '用户名'
    },
    {
      field: 'password',
      title: '密码'
    },
    {
      field: 'url',
      title: '连接地址'
    },
    {
      field: 'driverClass',
      title: '驱动类'
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
