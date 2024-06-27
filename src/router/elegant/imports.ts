/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type { RouteComponent } from "vue-router";
import type { LastLevelRouteKey, RouteLayout } from "@elegant-router/types";

import BaseLayout from "@/layouts/base-layout/index.vue";
import BlankLayout from "@/layouts/blank-layout/index.vue";

export const layouts: Record<RouteLayout, RouteComponent | (() => Promise<RouteComponent>)> = {
  base: BaseLayout,
  blank: BlankLayout,
};

export const views: Record<LastLevelRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import("@/views/_builtin/403/index.vue"),
  404: () => import("@/views/_builtin/404/index.vue"),
  500: () => import("@/views/_builtin/500/index.vue"),
  about: () => import("@/views/_builtin/about/index.vue"),
  home: () => import("@/views/_builtin/home/index.vue"),
  login: () => import("@/views/_builtin/login/index.vue"),
  "user-center": () => import("@/views/_builtin/user-center/index.vue"),
  demo_ide: () => import("@/views/demo/ide/index.vue"),
  demo_vxetable_curd: () => import("@/views/demo/vxetable/curd/index.vue"),
  demo_vxetable_simple: () => import("@/views/demo/vxetable/simple/index.vue"),
  demo_vxetable_treeform: () => import("@/views/demo/vxetable/treeForm/index.vue"),
};
