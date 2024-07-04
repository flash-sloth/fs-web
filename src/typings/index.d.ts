import type { VNodeChild } from 'vue';
import type { JSX } from 'vue/jsx-runtime';

// global.d.ts
declare global {
  type VueNode = VNodeChild | JSX.Element;
  type Nullable<T> = T | null;
  type Recordable<T = any> = Record<string, T>;
  type TimeoutHandle = ReturnType<typeof setTimeout>;
  type IntervalHandle = ReturnType<typeof setInterval>;

  // index.d.ts
  interface PromiseFn<T = any, R = T> {
    (...arg: T[]): Promise<R>;
  }

  type TargetContext = '_self' | '_blank';

  interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
    $el: T;
  }
  type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

  type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

  type RefType<T> = T | null;
}
