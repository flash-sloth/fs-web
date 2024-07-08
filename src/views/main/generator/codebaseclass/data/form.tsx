import type { VxeFormPropTypes } from 'vxe-table';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {
    packageName: [{ required: true, message: '完整包名' }],
    name: [{ required: true, message: '类名' }],
    classType: [{ required: true, message: '类型' }],
    state: [{ required: true, message: '状态' }],
    weight: [{ required: true, message: '顺序' }]
  };
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    { field: 'packageName', title: '完整包名', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'name', title: '类名', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'classType', title: '类型', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'state', title: '状态', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'weight', title: '顺序', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'remark', title: '备注', span: 24, itemRender: { name: 'VxeInput' } }
  ];
};

/** 定义事件 */
export interface Emits {
  (e: 'success'): void;
}
