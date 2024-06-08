import XEUtils from 'xe-utils';
import { $t as t } from '@/locales';
import type { ComponentType } from './componentType';
import { ignoreTrimInputComponents } from './const';

/** @description: 生成placeholder */
export function createPlaceholderMessage(component: ComponentType) {
  if (!component) return;
  if (component.includes('RangePicker')) {
    return [t('common.chooseText'), t('common.chooseText')];
  }
  if (component.includes('Input') || component.includes('Complete') || component.includes('Rate')) {
    return t('common.inputText');
  }
  return t('common.chooseText');
}

/** @description: 对输入值进行首尾空格的清理 */
export function sanitizeInputWhitespace(component: ComponentType, value: string) {
  if (ignoreTrimInputComponents.includes(component)) {
    return XEUtils.trim(value);
  }
  return value;
}
