// 列配置

import type { VxeFormPropTypes, VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
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

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {
    name: [
      { required: true, message: '请输入名称' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    type3: [{ required: true, message: '请填写test1' }],
    type2: [
      { required: true, message: '请填写test2' },
      {
        validator: async ({ itemValue, data }) => {
          // 自定义校验
          if (data.type3 && itemValue === data.type3) {
            throw new Error('test1 不能与 test2 一致');
          }
          return true;
        }
      }
    ]
  };
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    { field: 'name', title: '名称', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'type2', title: 'type2', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'type3', title: 'type3', span: 12, itemRender: { name: 'VxeInput' } }
  ];
};
