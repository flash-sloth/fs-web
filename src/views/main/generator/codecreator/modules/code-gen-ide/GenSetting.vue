<script setup lang="ts">
import { reactive, ref } from 'vue';
import XEUtils from 'xe-utils';
import { key } from 'localforage';
import { FsAModal, useDmSwitcherInner } from '@/components/fs-components/drawer-modal-switcher';
import type { FsGenFile } from './types';
import FileTree from './FileTree.vue';
const treeData = ref<FsGenFile[]>();
const settingMap = reactive<Record<string, any>>({});
const [register] = useDmSwitcherInner<FsGenFile[]>(data => {
  treeData.value = data.data;
  XEUtils.eachTree(data.data, item => {
    settingMap[item.id || ''] = item.generateConfig || 'generate';
  });
});
function settingChange(data: Record<string, any>) {
  Object.assign(settingMap, data);
}
</script>

<template>
  <FsAModal
    :width="800"
    title="代码生成设置"
    :body-style="{
      height: '500px'
    }"
    @register="register"
  >
    <FileTree
      v-if="treeData"
      show-setting
      :mask-closable="false"
      :tree-data="treeData"
      :setting-map="settingMap"
      @setting-change="settingChange"
    />
  </FsAModal>
</template>

<style lang="scss"></style>
