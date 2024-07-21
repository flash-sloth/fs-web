import type { VxeFormPropTypes } from 'vxe-table';
import { $t } from '@/locales';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {};
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    {
      field: 'subSystemId',
      title: $t('main.system.menu.subSystemId'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.subSystemId')]) }
      }
    },
    {
      field: 'parentId',
      title: $t('main.system.menu.parentId'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.parentId')]) }
      }
    },
    {
      field: 'name',
      title: $t('main.system.menu.name'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.name')]) }
      }
    },
    {
      field: 'code',
      title: $t('main.system.menu.code'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.code')]) }
      }
    },
    {
      field: 'resourceType',
      title: $t('main.system.menu.resourceType'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.resourceType')]) }
      }
    },
    {
      field: 'path',
      title: $t('main.system.menu.path'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.path')]) }
      }
    },
    {
      field: 'component',
      title: $t('main.system.menu.component'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.component')]) }
      }
    },

    {
      field: 'state',
      title: $t('main.system.menu.state'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.state')]) }
      }
    },
    {
      field: 'weight',
      title: $t('main.system.menu.weight'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.weight')]) }
      }
    },
    {
      field: 'remarks',
      title: $t('main.system.menu.remarks'),
      span: 24,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.remarks')]) }
      }
    }
  ];
};

/** 定义事件 */
export interface Emits {
  (e: 'success'): void;
}
