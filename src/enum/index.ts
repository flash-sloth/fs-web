export enum SetupStoreId {
  App = 'app-store',
  Theme = 'theme-store',
  Auth = 'auth-store',
  Route = 'route-store',
  Tab = 'tab-store'
}

export enum VxeGridProxyEventCode {
  /** 刷新当前 */
  QUERY = 'query',
  /** 重置条件并重载 */
  RELOAD = 'reload',

  /** 删除/取消 */
  MAKE_CANCEL = 'mark_cancel'
}
