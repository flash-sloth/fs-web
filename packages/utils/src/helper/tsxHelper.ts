import type { Slots } from 'vue';
import { isFunction } from '../is';

/** @description: Get slot to prevent empty error */
export function getSlot(options: { slots: Slots; slot: string; data?: any; opts?: any }) {
  const { slots, slot = 'default', data, opts } = options;
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  const params = { ...data, ...opts };
  return slotFn(params);
}

/**
 * extends slots
 *
 * @param slots
 * @param excludeKeys
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots);
  const ret: any = {};
  slotKeys.forEach(key => {
    if (excludeKeys.includes(key)) {
      return;
    }
    ret[key] = (data?: any) => getSlot({ slots, slot: key, data });
  });
  return ret;
}
