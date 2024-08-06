import type { VxeFormPropTypes } from 'vxe-table';
import { ref } from 'vue';
import { $t } from '@/locales';
import { MenuTypeEnum } from '@/service/main/system/menu/enum';

/** @returns 表单校验规则 */
export const formRules = (): VxeFormPropTypes.Rules => {
  return {};
};

function getTypeOptions() {
  return [
    {
      label: $t('main.system.menu.menuTypeEnum.dir'),
      value: MenuTypeEnum.DIR
    },
    {
      label: $t('main.system.menu.menuTypeEnum.menu'),
      value: MenuTypeEnum.MENU
    },
    {
      label: $t('main.system.menu.menuTypeEnum.innerLink'),
      value: MenuTypeEnum.INNER_LINK
    },
    {
      label: $t('main.system.menu.menuTypeEnum.outerLink'),
      value: MenuTypeEnum.OUTER_LINK
    }
  ];
}

/** @returns 返回表单配置 */
export const formItems = (): VxeFormPropTypes.Items => {
  const menuTypeOptions = ref(getTypeOptions());
  return [
    {
      field: 'menuType',
      title: $t('main.system.menu.menuType'),
      span: 12,
      itemRender: {
        name: 'VxeRadioGroup',
        props: {
          type: 'button'
        },
        options: menuTypeOptions
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
        return data?.menuType !== MenuTypeEnum.OUTER_LINK;
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
        return data?.menuType === MenuTypeEnum.MENU;
      },
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.chooseText', [$t('main.system.menu.component')]) }
      }
    },
    {
      field: 'layout',
      title: $t('main.system.menu.layout'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.menuType === MenuTypeEnum.MENU;
      },
      itemRender: {
        name: 'VxeSelect',
        options: [
          { label: '默认', value: '01' },
          { label: '全屏', value: '02' }
        ],
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.layout')]) }
      }
    },
    {
      field: 'hideInMenu',
      title: $t('main.system.menu.hideInMenu'),
      span: 12,
      visibleMethod: ({ data }) => {
        return data?.menuType === MenuTypeEnum.MENU;
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
        return data?.menuType === MenuTypeEnum.DIR;
      },
      itemRender: {
        name: 'VxeInput',
        props: { placeholder: $t('common.inputText', [$t('main.system.menu.redirect')]) }
      }
    },
    {
      field: 'href',
      title: $t('main.system.menu.href'),
      span: 24,
      visibleMethod: ({ data }) => {
        return [MenuTypeEnum.INNER_LINK, MenuTypeEnum.OUTER_LINK].includes(data?.menuType);
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
