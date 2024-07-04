import { ref, unref } from 'vue';
import { isFunction, isUnDef } from '@/utils/is';

export interface ScrollToParams {
  el: any;
  to: number;
  duration?: number;
  callback?: () => any;
}

// eslint-disable-next-line max-params
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  let innerT = t / d / 2;
  if (innerT < 1) {
    return (c / 2) * innerT * innerT + b;
  }
  innerT -= 1;
  return (-c / 2) * (innerT * (innerT - 2) - 1) + b;
};

const move = (el: HTMLElement, amount: number) => {
  el.scrollTop = amount;
};

const position = (el: HTMLElement) => {
  return el.scrollTop;
};
export function useScrollTo({ el, to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false);
  const start = position(el);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  const varDuration = isUnDef(duration) ? 500 : duration;

  // eslint-disable-next-line func-names
  const animateScroll = function () {
    if (!unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, varDuration);
    move(el, val);
    if (currentTime < varDuration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else if (callback && isFunction(callback)) {
      callback();
    }
  };

  const run = () => {
    isActiveRef.value = true;
    animateScroll();
  };

  const stop = () => {
    isActiveRef.value = false;
  };

  return { start: run, stop };
}
