import type { VxeFormPropTypes } from 'vxe-table';

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
