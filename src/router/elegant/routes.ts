/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { GeneratedRoute } from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: 'layout.base$view.about',
    meta: {
      title: 'about',
      i18nKey: 'route.about'
    }
  },
  {
    name: 'demo',
    path: '/demo',
    component: 'layout.base',
    meta: {
      title: 'demo',
      i18nKey: 'route.demo'
    },
    children: [
      {
        name: 'demo_comp',
        path: '/demo/comp',
        meta: {
          title: 'demo_comp',
          i18nKey: 'route.demo_comp'
        },
        children: [
          {
            name: 'demo_comp_icon',
            path: '/demo/comp/icon',
            component: 'view.demo_comp_icon',
            meta: {
              title: 'demo_comp_icon',
              i18nKey: 'route.demo_comp_icon'
            }
          }
        ]
      },
      {
        name: 'demo_ide',
        path: '/demo/ide',
        component: 'view.demo_ide',
        meta: {
          title: 'demo_ide',
          i18nKey: 'route.demo_ide'
        }
      },
      {
        name: 'demo_vxetable',
        path: '/demo/vxetable',
        meta: {
          title: 'demo_vxetable',
          i18nKey: 'route.demo_vxetable'
        },
        children: [
          {
            name: 'demo_vxetable_curd',
            path: '/demo/vxetable/curd',
            component: 'view.demo_vxetable_curd',
            meta: {
              title: 'demo_vxetable_curd',
              i18nKey: 'route.demo_vxetable_curd'
            }
          },
          {
            name: 'demo_vxetable_simple',
            path: '/demo/vxetable/simple',
            component: 'view.demo_vxetable_simple',
            meta: {
              title: 'demo_vxetable_simple',
              i18nKey: 'route.demo_vxetable_simple'
            }
          },
          {
            name: 'demo_vxetable_treeform',
            path: '/demo/vxetable/treeform',
            component: 'view.demo_vxetable_treeform',
            meta: {
              title: 'demo_vxetable_treeform',
              i18nKey: 'route.demo_vxetable_treeform'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'home',
    path: '/home',
    component: 'layout.base$view.home',
    meta: {
      title: 'home',
      i18nKey: 'route.home',
      hideInMenu: true
    }
  },
  {
    name: 'login',
    path: '/login/:module(pwd-login|code-login|register|reset-pwd|bind-wechat)?',
    component: 'layout.blank$view.login',
    props: true,
    meta: {
      title: 'login',
      i18nKey: 'route.login',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: 'layout.base$view.user-center',
    meta: {
      title: 'user-center',
      i18nKey: 'route.user-center',
      hideInMenu: true
    }
  }
];
