import { abort } from 'node:process';
import type { RouteMeta } from 'vue-router';
import ElegantVueRouter from '@elegant-router/vue/vite';
import type { RouteKey } from '@elegant-router/types';

export function setupElegantRouter() {
  return ElegantVueRouter({
    layouts: {
      base: 'src/layouts/base-layout/index.vue',
      blank: 'src/layouts/blank-layout/index.vue'
    },
    customRoutes: {
      names: ['exception_403', 'exception_404', 'exception_500']
    },
    pagePatterns: ['((_builtin)|(demo))/**/index.vue', '((_builtin)|(demo))/**/[[]*[]].vue'],
    routePathTransformer(routeName, routePath) {
      const key = routeName as RouteKey;
      if (key === 'login') {
        const modules: UnionKey.LoginModule[] = ['pwd-login', 'code-login', 'register', 'reset-pwd', 'bind-wechat'];

        const moduleReg = modules.join('|');

        return `/login/:module(${moduleReg})?`;
      }

      return routePath;
    },
    /**
     * 默认生成的路由都是不需要登录，需要特殊登录的路由按key处理
     *
     * @returns
     */
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;
      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}` as App.I18n.I18nKey
      };
      const noneedLoginRouteKey: RouteKey[] = ['403', '404', '500', 'login'];
      if (noneedLoginRouteKey.includes(key)) {
        meta.constant = true;
      }
      return meta;
    }
  });
}
