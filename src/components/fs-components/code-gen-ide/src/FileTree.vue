<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import { SimpleScrollbar } from '@sa/materials';
import FileItem from './FileItem.vue';
import type { FsGenFile } from './types';
const props = defineProps<{
  treeData: Array<FsGenFile>;
}>();
const emits = defineEmits<{
  (e: 'select', data: FsGenFile): void;
}>();
const selectedKey = ref<string>('');
function onSelectOne(data: FsGenFile) {
  selectedKey.value = data.id || '';
  emits('select', data);
}
</script>

<template>
  <SimpleScrollbar class="p-1">
    <FileItem
      v-for="(file, index) in treeData"
      :key="index"
      :selected-key="selectedKey"
      :data="file"
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
