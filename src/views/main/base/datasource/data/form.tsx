import type { VxeFormPropTypes } from 'vxe-table';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {
    name: [{ required: true, message: '请输入名称' }],
    username: [{ required: true, message: '请填写用户名' }],
    password: [{ required: true, message: '请填写密码' }],
    url: [{ required: true, message: '请填写连接地址' }],
    driverClass: [{ required: true, message: '请填写驱动类' }]
  };
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    { field: 'name', title: '名称', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'username', title: '用户名', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'password', title: '密码', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'url', title: '连接地址', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'driverClass', title: '驱动类', span: 12, itemRender: { name: 'VxeInput' } }
  ];
};

/** 定义事件 */
export interface Emits {
  (e: 'success'): void;
}
