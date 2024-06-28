import { defHttp } from '../http';

/** get constant routes */
export function fetchGetConstantRoutes() {
  return defHttp.request<Api.Route.MenuRoute[]>({ url: '/route/getConstantRoutes' });
}

/** get user routes */
export function fetchGetUserRoutes() {
  return defHttp.request<Api.Route.UserRoute>({ url: '/route/getUserRoutes' });
}

/**
 * whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return defHttp.request<boolean>({ url: '/route/isRouteExist', params: { routeName } });
}
