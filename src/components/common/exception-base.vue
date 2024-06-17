<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSessionStorage, useStorage } from '@vueuse/core';
import { $t } from '@/locales';
import { useRouterPush } from '@/hooks/common/router';
import type { StorageType } from '@/typings/storage';
import { pageNotFindMessageStorageKey } from '@/constants/common';
defineOptions({ name: 'ExceptionBase' });

type ExceptionType = '403' | '404' | '500';

interface Props {
  /**
   * Exception type
   *
   * - 403: no permission
   * - 404: not found
   * - 500: service error
   */
  type: ExceptionType;
}

const props = defineProps<Props>();

const { routerPushByKey } = useRouterPush();

const iconMap: Record<ExceptionType, string> = {
  '403': 'no-permission',
  '404': 'not-found',
  '500': 'service-error'
};

const icon = computed(() => iconMap[props.type]);
const route = useRoute();
const messageStorage = useSessionStorage<StorageType.PageNotFindMessageStorage>(
  `${pageNotFindMessageStorageKey}_${route.path}`,
  {
    message: '',
    viewPath: '',
    routePath: ''
  }
);
const show404Message = computed(() => {
  return props.type === '404' && route.path === messageStorage.value.routePath;
});
</script>

<template>
  <div class="size-full min-h-520px flex-col-center gap-24px overflow-hidden">
    <div v-if="show404Message" class="text-16px text-warning">
      <div>{{ messageStorage.message }}</div>
      <div>组件路径：{{ messageStorage.viewPath }}</div>
      <div>系统已将 {{ messageStorage.routePath }} 路由映射到404页面</div>
    </div>
    <div class="flex text-400px text-primary">
      <SvgIcon :local-icon="icon" />
    </div>

    <AButton type="primary" @click="routerPushByKey('root')">{{ $t('common.backToHome') }}</AButton>
  </div>
</template>

<style scoped></style>
