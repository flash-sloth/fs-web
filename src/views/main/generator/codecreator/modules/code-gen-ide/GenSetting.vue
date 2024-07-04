<script setup lang="ts">
import { reactive, ref } from 'vue';
import XEUtils from 'xe-utils';
import { key } from 'localforage';
import { FsAModal, useDmSwitcherInner } from '@/components/fs/drawer-modal-switcher';
import { generator } from '@/service/main/generator/codeCreator/api.js';
import { useMessage } from '@/hooks/web/useMessage.jsx';
import type { FsGenFile } from './types.ts';
import FileTree from './FileTree.vue';
const { createMessage } = useMessage();
const treeData = ref<FsGenFile[]>();
const ids = ref<string[]>([]);
const settingMap = ref<Record<string, any>>({});
const [register, { close }] = useDmSwitcherInner<{
  ids: string[];
  data: FsGenFile[];
}>(data => {
  treeData.value = data.data?.data || [];
  ids.value = data.data?.ids || [];
  const temp: Record<string, any> = {};
  XEUtils.eachTree(treeData.value, item => {
    temp[item.id || ''] = item.generateConfig || 'ADD';
  });
  settingMap.value = temp;
});
function settingChange(data: Record<string, any>) {
  settingMap.value = { ...settingMap.value, ...data };
}
async function onGenerate() {
  await generator({
    ids: ids.value,
    genStrategy: settingMap.value
  });
  createMessage.success('生成成功');
  close();
}
</script>

<template>
  <FsAModal
    :width="800"
    title="代码生成设置"
    :body-style="{
      height: '500px'
    }"
    on-text="生成"
    @ok="onGenerate"
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
