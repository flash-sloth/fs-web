interface Window {
  /** NProgress instance */
  NProgress?: import('nprogress').NProgress;
  /** Ant-design-vue message instance */
  $message?: import('ant-design-vue/es/message/interface').MessageInstance;
  /** Ant-design-vue modal instance */
  $modal?: Omit<import('ant-design-vue/es/modal/confirm').ModalStaticFunctions, 'warn'>;
  /** Ant-design-vue notification instance */
  $notification?: import('ant-design-vue/es/notification/interface').NotificationInstance;
}

interface ViewTransition {
  ready: Promise<void>;
}

interface Document {
  startViewTransition?: (callback: () => Promise<void> | void) => ViewTransition;
}

interface ImportMeta {
  readonly env: Env.ImportMeta;
}

/** Build time of the project */
declare const BUILD_TIME: string;

declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;

/** Make all properties in T nullable */
type PNullable<T> = {
  [P in keyof T]: T[P] | null;
};

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
