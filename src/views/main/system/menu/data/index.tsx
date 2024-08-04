import type { VxeGridPropTypes } from 'vxe-table';
import { $t } from '@/locales';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */

/** 搜索表单配置 */
export const searchFormConfig = (): VxeGridPropTypes.FormConfig => {
  return {
    data: {
      name: '',
      code: ''
    },
    items: [
      { field: 'code', title: $t('main.system.menu.code'), itemRender: { name: 'VxeInput' } },
      { field: 'name', title: $t('main.system.menu.name'), itemRender: { name: 'VxeInput' } },
      {
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            {
              type: 'submit',
              content: $t('common.search'),
              status: 'primary'
            },
            { type: 'reset', content: $t('common.reset') }
          ]
        }
      }
    ]
  };
};
