import type { VxeFormPropTypes } from 'vxe-table';
import { $t } from '@/locales';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {
    packageName: [
      { required: true, message: $t('common.inputText', [$t('main.generator.codeBaseClass.packageName')]) }
    ],
    name: [{ required: true, message: $t('common.inputText', [$t('main.generator.codeBaseClass.name')]) }],
    classType: [{ required: true, message: $t('common.inputText', [$t('main.generator.codeBaseClass.classType')]) }],
    state: [{ required: true, message: $t('common.inputText', [$t('main.generator.codeBaseClass.state')]) }],
    weight: [{ required: true, message: $t('common.inputText', [$t('main.generator.codeBaseClass.weight')]) }]
  };
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    {
      field: 'packageName',
      title: $t('main.generator.codeBaseClass.packageName'),
      span: 24,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.packageName')]) }
      }
    },
    {
      field: 'name',
      title: $t('main.generator.codeBaseClass.name'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.name')]) }
      }
    },
    {
      field: 'classType',
      title: $t('main.generator.codeBaseClass.classType'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.classType')]) }
      }
    },
    {
      field: 'state',
      title: $t('main.generator.codeBaseClass.state'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.state')]) }
      }
    },
    {
      field: 'weight',
      title: $t('main.generator.codeBaseClass.weight'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.weight')]) }
      }
    },
    {
      field: 'remark',
      title: $t('main.generator.codeBaseClass.remark'),
      span: 24,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.generator.codeBaseClass.remark')]) }
      }
    }
  ];
};

/** 定义事件 */
export interface Emits {
  (e: 'success'): void;
}
