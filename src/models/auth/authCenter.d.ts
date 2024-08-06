import type { RouteMeta } from 'vue-router';

/** 登录参数 */
export interface LoginDto {
  /** 用户名 */
  ususerName: string;
  /** 密码 */
  password: string;
}
/** 登录返回参数 */
export interface LoginVo {
  /** token */
  token: string;
  /** 刷新token */
  refreshToken: string;
  /** 过期时间 */
  expireTime: number;
  /** 刷新过期时间 */
  refreshExpireTime: number;
}

/** 用户信息返回参数 */
export interface UserInfoVo {
  /** 用户id */
  userId: string;
  /** 用户昵称 */
  userName: string;
  /** 用户拥有的角色 */
  roles: Array<string | number>;
  /** 用户拥有的按钮权限 */
  buttons: Array<string | number>;
}
/** 系统路由 */
export interface SysRouterVo {
  /** 路由id */
  id: string;
  /** 路由code */
  code: string;
  /** 路由名称 */
  name: string;
  /** 路由类型 */
  menuType: string;
  /** 路由打开方式 */
  openWith: string;
  /** 路由备注 */
  remarks: string;
  /** 路由路径 */
  path: string;
  /** 路由组件 */
  component: string;
  /** 路由重定向 */
  redirect: string;
  children: Array<SysRouterVo>;
  meta: RouteMeta;
}

/** 用户资源接口返回参数 */
export interface UserResourceVo {
  enabled: boolean;
  routerList: Array<SysRouterVo>;
}
