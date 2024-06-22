<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import { SimpleScrollbar } from '@sa/materials';
import FileItem from './FileItem.vue';
import type { FsGenFile } from './types';
const props = withDefaults(
  defineProps<{
    treeData: Array<FsGenFile>;
    showSetting?: boolean;
    settingMap?: Record<string, any>;
  }>(),
  { showSetting: false, settingMap: {} as any }
);
const emits = defineEmits<{
  (e: 'select', data: FsGenFile): void;
  (e: 'setting-change', data: any): void;
}>();
const selectedKey = ref<string>('');
function onSelectOne(data: FsGenFile) {
  selectedKey.value = data.id || '';
  emits('select', data);
}
function dispatchSetting(data: any) {
  emits('setting-change', data);
}
</script>

<template>
  <SimpleScrollbar class="p-1">
    <FileItem
      v-for="(file, index) in treeData"
      :key="index"
      :show-setting="showSetting"
      :setting-map="settingMap as Record<string, any>"
      :selected-key="selectedKey"
      :data="file"
      @setting-change="dispatchSetting"
      @select="onSelectOne"
    ></FileItem>
  </SimpleScrollbar>
</template>

<style lang="scss" scoped>
.file-tree-box {
  height: 100%;
  overflow: auto;
  padding: 5px;
  .project {
  }
  .children {
    padding-left: 8px;
  }
}
</style>
