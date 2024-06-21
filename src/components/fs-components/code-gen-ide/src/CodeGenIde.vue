<script lang="ts" setup>
import { computed, ref } from 'vue';
import CodePanel from './CodePanel.vue';
import FileTree from './FileTree.vue';
import { type FsGenFile, FsGenFileType } from './types';
const props = defineProps<{
  treeData: Array<FsGenFile>;
}>();
defineOptions({
  name: 'CodeGenIde'
});
const selectedFile = ref<FsGenFile | null>(null);
const editFile = ref<FsGenFile | null>(null);
/** 当选中一个文件 */
function onFileSelect(file: FsGenFile) {
  selectedFile.value = file;
  if (file && file.type === FsGenFileType.File) {
    editFile.value = file;
  }
}
</script>

<template>
  <div class="code-gen-ide">
    <div class="code-gen-ide-title">{{ selectedFile?.path }}</div>
    <div class="code-gen-ide-main">
      <div class="code-gen-ide-left">
        <FileTree :tree-data="treeData" @select="onFileSelect"></FileTree>
      </div>
      <div class="code-gen-ide-content">
        <CodePanel :file="editFile"></CodePanel>
      </div>
    </div>
    <div class="code-gen-ide-footer">{{ editFile?.path }}</div>
  </div>
</template>

<style lang="scss">
.dark {
  .code-gen-ide {
    background-color: #333;
    border: 1px solid #ccc;
    color: #ccc;
    .code-gen-ide-footer,
    .code-gen-ide-title {
      background-color: #333;
    }
    .code-gen-ide-left {
      background-color: rgb(37, 37, 38);
    }
  }
}
.code-gen-ide {
  height: 100%;
  background-color: aquamarine;
  border: 1px solid #444;
  display: flex;
  color: #333;
  flex-direction: column;
  .code-gen-ide-title,
  .code-gen-ide-footer {
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;

    overflow: hidden;
    background-color: white;
    flex-grow: 0; /* 防止放大 */
    flex-shrink: 0; /* 防止缩小 */
    flex-basis: auto; /* 保持原有大小 */
  }

  .code-gen-ide-main {
    flex: 1;
    flex-basis: 1px;
    height: 1px;
    display: flex;
  }
  .code-gen-ide-left {
    background-color: #f7fafc;
    min-width: 150px;
    width: 200px;
    overflow-x: hidden;
    max-width: 600px;
  }
  .code-gen-ide-content {
    flex: 1;
    flex-basis: 1px;
    overflow: hidden;
  }
}
</style>
