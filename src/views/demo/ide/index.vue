<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import CodeGenIde from '@/components/fs/code-gen-ide/src/CodeGenIde.vue';
import { fileTreeData } from '@/components/fs/code-gen-ide/src/test-data';
import type { FsGenFile } from '@/components/fs/code-gen-ide/src/types';
import { preview } from '@/api/main/generator/codeCreator';
async function loadData(): Promise<FsGenFile[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(fileTreeData);
    }, 1000);
  });
}
const treeData = ref<FsGenFile[]>([]);
onMounted(async () => {
  treeData.value = await preview(["514259627173666816"]);
});
</script>

<template>
  <div class="testbox">
    <CodeGenIde :tree-data="treeData"></CodeGenIde>
  </div>
</template>

<style>
.testbox {
  height: 100%;
}
</style>
