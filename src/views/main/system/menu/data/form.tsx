import type { VxeFormPropTypes } from 'vxe-table';
import { $t } from '@/locales';
import { ResourceTypeEnum } from '@/service/main/system/menu/enum';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {};
};

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  return [
    {
      field: 'resourceType',
      title: $t('main.system.menu.resourceType'),
      span: 12,
      itemRender: {
        name: 'VxeRadioGroup',
        props: {
          type: 'button'
        },
        options: [
          { label: '目录', value: '10' },
          { label: '菜单', value: '20' },
          { label: '内链', value: '30' },
          { label: '外链', value: '40' }
        ]
      }
    },
    {
      field: 'state',
      title: $t('main.system.menu.state'),
      span: 6,
      itemRender: {
        name: 'VxeSwitch',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.state')]) }
      }
    },
    {
      field: 'isGeneral',
      title: $t('main.system.menu.isGeneral'),
      span: 6,
      itemRender: {
        name: 'VxeSwitch',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.isGeneral')]) }
      }
    },
    {
      field: 'parentId',
      title: $t('main.system.menu.parentId'),
      span: 12,
      slots: {
        default: 'parentId'
      },
      itemRender: {}
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
      slots: {
        default: 'code'
      },
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.code')]) }
      }
    },
    {
      field: 'path',
      title: $t('main.system.menu.path'),
      slots: {
        default: 'path'
      },
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.resourceType !== ResourceTypeEnum.OUTER_LINK;
      },
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.path')]) }
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
      field: 'icon',
      title: $t('main.system.menu.icon'),
      span: 12,
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.icon')]) }
      }
    },
    {
      field: 'component',
      title: $t('main.system.menu.component'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.resourceType === ResourceTypeEnum.MENU;
      },
      itemRender: {
        name: 'VxeInput',
        options: [
          { label: '带菜单', value: 'layout.base' },
          { label: '全屏', value: 'layout.blank' }
        ],
        props: { placeholder: $t('common.chooseText', [$t('main.system.menu.component')]) }
      }
    },
    {
      field: 'layout',
      title: $t('main.system.menu.layout'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.resourceType === ResourceTypeEnum.MENU;
      },
      itemRender: {
        name: 'VxeSelect',
        options: [
          { label: '带菜单', value: 'layout.base' },
          { label: '全屏', value: 'layout.blank' }
        ],
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.layout')]) }
      }
    },
    {
      field: 'isHidden',
      title: $t('main.system.menu.isHidden'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.resourceType === ResourceTypeEnum.MENU;
      },
      itemRender: {
        name: 'VxeSwitch',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.state')]) }
      }
    },

    {
      field: 'redirect',
      title: $t('main.system.menu.redirect'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.resourceType === ResourceTypeEnum.DIR;
      },
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.redirect')]) }
      }
    },
    {
      field: '',
      title: $t('main.system.menu.href'),
      span: 24,
      visibleMethod: ({ data }) => {
        return [ResourceTypeEnum.INNER_LINK, ResourceTypeEnum.OUTER_LINK].includes(data?.resourceType);
      },
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.href')]) }
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
