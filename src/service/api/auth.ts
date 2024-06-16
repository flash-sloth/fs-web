import type { LoginVo, UserInfoVo, UserResourceVo } from '@/models/auth/authCenter';
import { request } from '../request';
import { defHttp } from '../http';

/** 根据用户ID和路由名称判断用户是否具有权限 */
export function isRouteExist(routeName: string) {
  return defHttp.request<Boolean>({
    url: '/anyone/isRouteExist',
    method: 'get',
    params: {
      routeName
    }
  });
}

/** 查询用户可见资源（菜单及其他权限） */
export function getVisileResource() {
  return defHttp.request<UserResourceVo>({
    url: '/anyone/visible/resource',
    method: 'get'
  });
}
/**
 * Login
 *
 * @param userName User name
 * @param password Password
 */
export function fetchLogin(userName: string, password: string) {
  return request<LoginVo>({
    url: '/auth/login',
    method: 'post',
    data: {
      userName,
      password
    }
  });
}

/** Get user info */
export function fetchGetUserInfo() {
  return request<UserInfoVo>({ url: '/auth/getUserInfo' });
}

/**
 * Refresh token
 *
 * @param refreshToken Refresh token
 */
export function fetchRefreshToken(refreshToken: string) {
  return request<LoginVo>({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken
    }
  });
}

/**
 * return custom backend error
 *
 * @param code error code
 * @param msg error message
 */
export function fetchCustomBackendError(code: string, msg: string) {
  return request({ url: '/auth/error', params: { code, msg } });
}
