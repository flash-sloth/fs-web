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
      title: $t('main.generator.codeBaseClass.name')
    },
    {
      field: 'packageName',
      title: $t('main.generator.codeBaseClass.packageName')
    },
    {
      field: 'classType',
      title: $t('main.generator.codeBaseClass.classType')
    },
    {
      field: 'state',
      title: $t('main.generator.codeBaseClass.state')
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
/** 搜索表单配置 */
export const searchFormConfig = (): VxeGridPropTypes.FormConfig => {
  return {
    data: {
      name: ''
    },
    items: [
      { field: 'name', title: $t('main.generator.codeBaseClass.name'), itemRender: { name: 'VxeInput' } },
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
