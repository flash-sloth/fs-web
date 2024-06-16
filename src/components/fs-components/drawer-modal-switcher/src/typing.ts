export type UseDmSwitcherReturnType<T> = [
  (modalMethod: DmSwitcherMethods<T>, uuid: number) => void,
  DmSwitcherMethods<T>
];
export type DmSwitcherAction = '' | 'add' | 'edit' | 'view' | 'copy';
export type DmSwitcherOpenParam<T> = { action: DmSwitcherAction; data?: T };
// 对外提供的方法
export type DmSwitcherMethods<T> = {
  /** 显示弹窗 */
  show: (openParam?: DmSwitcherOpenParam<T>) => void;
  /** 关闭弹窗 */
  close: () => void;
};
/** inner回调方法 */
export type DmSwitcherInnerCallBack<T> = (openParam: DmSwitcherOpenParam<T>) => any;
// inner内调switcher的方法
export type DmSwitcherInnerMethods = {
  /** 显示弹窗 */
  show: () => void;
  /** 关闭弹窗 */
  close: () => void;
};
// 注册器
export type DmSwitcherInnerRegister = (methods: DmSwitcherInnerMethods, uuid: number) => any;
// switcher类型选型
export type SwitcherWrapperType = 'AModal' | 'ADrawer' | 'VxeModal' | 'VxeDrawer';
