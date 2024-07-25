import type { VxeGridPropTypes, VxeTableDefines } from 'vxe-table';
import type { CodeBaseClass } from '@/service/main/generator/codeBaseClass/model';
import { $t } from '@/locales';

/**
 * @param actionColumn 用户定义的 操作列
 * @returns 返回默认列和用户操作列的集合
 */
export const columns = (
  actionColumn?: VxeTableDefines.ColumnOptions<CodeBaseClass>
): VxeGridPropTypes.Columns<CodeBaseClass> => {
  const columnsDef: VxeGridPropTypes.Columns<CodeBaseClass> = [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    {
      field: 'name',
      title: '名称'
    },
    {
      field: 'code',
      title: '编码'
    },
    {
      field: 'icon',
      title: '图标'
    },
    {
      field: 'weight',
      title: $t('main.generator.codeBaseClass.weight')
    },
    {
      field: 'remark',
      title: $t('main.generator.codeBaseClass.remark')
    }
  ];
  actionColumn && columnsDef.push(actionColumn);
  return columnsDef;
};
