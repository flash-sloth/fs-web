import type { VxeFormPropTypes } from 'vxe-table';
import type { HibernateValidator } from '@/typings/hibernateValidator';
import { transformRules } from '@/utils/hibernateValidator/forVxeForm';

const heibernateValidators: { [key: string]: HibernateValidator[] } = {
  NotBlank: [
    {
      type: 'NotBlank',
      message: '不能为空'
    }
  ],
  NotNull: [
    {
      type: 'NotNull',
      message: '不能为空'
    }
  ],
  NotEmpty: [
    {
      type: 'NotEmpty',
      message: '不能为空'
    }
  ],
  Size: [
    {
      type: 'Size',
      message: '长度在 {min} 到 {max} 个字符',
      max: 5,
      min: 3
    }
  ],
  Length: [
    {
      type: 'Length',
      message: '字符串长度在 {min} 到 {max} 个字符',
      max: 5,
      min: 3
    }
  ],
  Range: [
    {
      type: 'Range',
      message: '数字应该在 {min} 到 {max} 之间',
      max: 100,
      min: 3
    }
  ],
  Min: [
    {
      type: 'Min',
      message: '数字应该大于等于 {value}',
      value: 3
    }
  ],
  Max: [
    {
      type: 'Max',
      message: '数字应该小于等于 {value}',
      value: 100
    }
  ],
  Pattern: [
    {
      type: 'Pattern',
      message: '格式不正确',
      regexp: '^[a-zA-Z0-9_-]{3,16}$'
    }
  ],
  Email: [
    {
      type: 'Email',
      message: '邮箱校验'
    }
  ]
};

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return transformRules(heibernateValidators);
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    { field: 'NotBlank', title: 'NotBlank', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'NotNull', title: 'NotNull', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'NotEmpty', title: 'NotEmpty', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Size', title: 'Size', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Range', title: 'Range', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Min', title: 'Min', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Max', title: 'Max', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Pattern', title: 'Pattern', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'Email', title: 'Email', span: 12, itemRender: { name: 'VxeInput' } }
  ];
};

export interface Emits {
  (e: 'success'): void;
}
