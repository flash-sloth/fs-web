import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import type { SysButtonVo } from '@/service/main/system/sysButton/model';
import { $t } from '@/locales';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (action: VxeTableDefines.ColumnOptions): VxeGridPropTypes.Columns<SysButtonVo> => {
  return [
    { type: 'checkbox', width: 50, fixed: 'left' },
    { type: 'seq', width: 50, fixed: 'left' },
    {
      field: 'menuId',
      title: $t('main.system.sysButton.menuId')
    },
    {
      field: 'code',
      title: $t('main.system.sysButton.code')
    },
    {
      field: 'name',
      title: $t('main.system.sysButton.name')
    },
    {
      field: 'icon',
      title: $t('main.system.sysButton.icon')
    },
    {
      field: 'showMode',
      title: $t('main.system.sysButton.showMode')
    },
    {
      field: 'btnType',
      title: $t('main.system.sysButton.btnType')
    },
    {
      field: 'state',
      title: $t('main.system.sysButton.state')
    },
    {
      field: 'deletedBy',
      title: $t('main.system.sysButton.deletedBy')
    },
    {
      field: 'deletedAt',
      title: $t('main.system.sysButton.deletedAt')
    },
    action
  ];
};

/** 搜索表单配置 */
export const searchFormConfig = (): VxeGridPropTypes.FormConfig => {
  return {
    enabled: false
  };
};
