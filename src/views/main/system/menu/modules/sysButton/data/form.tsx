import type { VxeFormPropTypes } from 'vxe-table';
import { $t } from '@/locales';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {};
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    { field: 'menuId', title: $t('main.system.sysButton.menuId'), span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'code', title: $t('main.system.sysButton.code'), itemRender: { name: 'VxeInput' }, span: 12 },
    { field: 'name', title: $t('main.system.sysButton.name'), itemRender: { name: 'VxeInput' }, span: 12 },
    { field: 'icon', title: $t('main.system.sysButton.icon'), itemRender: { name: 'VxeInput' }, span: 12 },
    {
      field: 'showMode',
      title: $t('main.system.sysButton.showMode'),
      span: 12,
      itemRender: {
        name: 'VxeRadioGroup',
        props: {
          type: 'button'
        },
        options: [
          {
            value: '01',
            label: '文字'
          },
          {
            value: '02',
            label: '图标'
          },
          {
            value: '03',
            label: '文字+图标'
          }
        ]
      }
    },
    { field: 'state', span: 12, title: $t('main.system.sysButton.state'), itemRender: { name: 'VxeSwitch' } },
    {
      field: 'btnType',
      span: 24,
      title: $t('main.system.sysButton.btnType'),
      itemRender: {
        name: 'VxeRadioGroup',
        props: {
          type: 'button'
        },
        options: [
          {
            value: '01',
            label: 'default'
          },
          {
            value: '02',
            label: 'primary'
          },
          {
            value: '03',
            label: 'info'
          },
          {
            value: '04',
            label: 'success'
          },
          {
            value: '05',
            label: 'warning'
          },
          {
            value: '06',
            label: 'error'
          }
        ]
      }
    }
  ];
};

export interface Emits {
  (e: 'success'): void;
}
