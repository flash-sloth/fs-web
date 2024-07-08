import { $t } from '@/locales';

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[];
}

/**
 * Translate options
 *
 * @param options
 */
export function translateOptions(options: CommonType.Option<string>[]) {
  return options.map(option => ({
    ...option,
    label: $t(option.label as App.I18n.I18nKey)
  }));
}

// 弹窗标题
export const titleMap: Record<string, string> = {
  add: $t('common.add'),
  edit: $t('common.edit'),
  copy: $t('common.copy'),
  view: $t('common.view')
};

// 工具栏操作码
export const actionCode = {
  add: 'add',
  edit: 'edit',
  copy: 'copy',
  view: 'view',
  delete: 'delete',
  deleteBatch: 'deleteBatch'
};
