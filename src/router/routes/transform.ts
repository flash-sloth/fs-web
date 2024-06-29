import type { RouteComponent, RouteRecordRaw } from 'vue-router';
import type { ElegantConstRoute } from '@elegant-router/vue';
import { useSessionStorage } from '@vueuse/core';
import type { StorageType } from '@/typings/storage';
import { pageNotFindMessageStorageKey } from '@/constants/common';
const viewsModules = import.meta.glob('@/views/**/**.vue');

/**
 * transform elegant const routes to vue routes
 *
 * @param routes elegant const routes
 * @param layouts layout components
 * @param views view components
 */
export function transformElegantRoutesToVueRoutes(
  routes: ElegantConstRoute[],
  layouts: Record<string, RouteComponent | (() => Promise<RouteComponent>)>,
  views: Record<string, RouteComponent | (() => Promise<RouteComponent>)>
) {
  return routes.flatMap(route => transformElegantRouteToVueRoute(route, layouts, views));
}

/**
 * transform elegant route to vue route
 *
 * @param route elegant const route
 * @param layouts layout components
 * @param views view components
 */
function transformElegantRouteToVueRoute(
  route: ElegantConstRoute,
  layouts: Record<string, RouteComponent | (() => Promise<RouteComponent>)>,
  views: Record<string, RouteComponent | (() => Promise<RouteComponent>)>
) {
  const LAYOUT_PREFIX = 'layout.';
  const VIEW_PREFIX = 'view.';
  const ROUTE_DEGREE_SPLITTER = '_';
  const FIRST_LEVEL_ROUTE_COMPONENT_SPLIT = '$';

  function isLayout(component: string) {
    return component.startsWith(LAYOUT_PREFIX);
  }

  function getLayoutName(component: string) {
    return component.replace(LAYOUT_PREFIX, '');
  }

  function isView(component: string) {
    return component.startsWith(VIEW_PREFIX);
  }

  function isFromServer(route: ElegantConstRoute) {
    return Boolean((route as any).id);
  }

  function getViewName(component: string) {
    return component.replace(VIEW_PREFIX, '');
  }

  function isFirstLevelRoute(item: ElegantConstRoute) {
    return !item.name.includes(ROUTE_DEGREE_SPLITTER);
  }

  function isSingleLevelRoute(item: ElegantConstRoute) {
    return isFirstLevelRoute(item) && !item.children?.length;
  }

  function getSingleLevelRouteComponent(component: string) {
    const [layout, view] = component.split(FIRST_LEVEL_ROUTE_COMPONENT_SPLIT);

    return {
      layout: getLayoutName(layout),
      view: getViewName(view)
    };
  }

  const vueRoutes: RouteRecordRaw[] = [];

  // add props: true to route
  if (route.path.includes(':') && !route.props) {
    route.props = true;
  }

  const { name, path, component, children, ...rest } = route;

  const vueRoute = { name, path, ...rest } as RouteRecordRaw;

  if (component) {
    if (isSingleLevelRoute(route)) {
      const { layout, view } = getSingleLevelRouteComponent(component);

      const singleLevelRoute: RouteRecordRaw = {
        path,
        component: layouts[layout],
        children: [
          {
            name,
            path: '',
            component: views[view],
            ...rest
          } as RouteRecordRaw
        ]
      };

      return [singleLevelRoute];
    }

    if (isLayout(component)) {
      const layoutName = getLayoutName(component);

      vueRoute.component = layouts[layoutName];
    } else if (isView(component)) {
      const viewName = getViewName(component);

      vueRoute.component = views[viewName];
    } else if (isFromServer(route)) {
      vueRoute.component = () => {
        return new Promise((resolve, _reject) => {
          const path = `/src/views/${component.replace(/[.]vue$/g, '')}.vue`;
          if (viewsModules[path]) {
            viewsModules[path]().then(view => {
              resolve(view);
            });
          } else {
            console.warn(`找不到组件：${path}`);
            const pathArry = path.split('/');
            vueRoute.beforeEnter = () => {
              alert();
            };
            const errData = {
              message: `找不到组件：${pathArry[pathArry.length - 1]}`,
              viewPath: path,
              routePath: vueRoute.path
            };
            const messageStorage = useSessionStorage<StorageType.PageNotFindMessageStorage>(
              `${pageNotFindMessageStorageKey}_${vueRoute.path}`,
              errData
            );
            messageStorage.value = errData;
            (views['404'] as () => Promise<RouteComponent>)().then(v404 => {
              resolve(v404);
            });
          }
        });
      };
    }
  }

  // add redirect to child
  if (children?.length && !vueRoute.redirect) {
    vueRoute.redirect = {
      name: children[0].name
    };
  }

  if (children?.length) {
    const childRoutes = children.flatMap(child => transformElegantRouteToVueRoute(child, layouts, views));

    if (isFirstLevelRoute(route)) {
      vueRoute.children = childRoutes;
    } else {
      vueRoutes.push(...childRoutes);
    }
  }

  vueRoutes.unshift(vueRoute);

  return vueRoutes;
}
