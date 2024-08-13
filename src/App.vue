<script setup lang="ts">
import { computed } from 'vue';
import { ConfigProvider } from 'ant-design-vue';
import { createAppProviderContext } from './hooks/web/useDesign';
import { useAppStore } from './store/modules/app';
import { useThemeStore } from './store/modules/theme';
import { antdLocales } from './locales/antd';

defineOptions({
  name: 'App'
});

const appStore = useAppStore();
const themeStore = useThemeStore();

/** Setup the prefixCls */
createAppProviderContext({
  prefixCls: 'fs'
});
const antdLocale = computed(() => {
  return antdLocales[appStore.locale];
});
</script>

<template>
  <ConfigProvider :theme="themeStore.antdTheme" :locale="antdLocale">
    <AppProvider>
      <RouterView class="bg-layout" />
    </AppProvider>
  </ConfigProvider>
</template>

<style scoped></style>
