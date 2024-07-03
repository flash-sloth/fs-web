<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useDmSwitcher } from '@/components/fs-components/drawer-modal-switcher';
import { preview } from '@/service/main/generator/codeCreator/api';
import { useMessage } from '@/hooks/web/useMessage';
import CodePanel from './CodePanel.vue';
import FileTree from './FileTree.vue';
import LineButton from './LineButton.vue';
import GenSetting from './GenSetting.vue';
import { type FsGenFile, FsGenFileType } from './types';
const { createConfirm } = useMessage();
const props = defineProps<{
  ids: string[];
}>();
const treeData = ref<FsGenFile[]>([]);
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
function loadData(reload = false) {
  if (props.ids && props.ids.length > 0) {
    preview({ ids: props.ids, reload, genStrategy: {} }).then(res => {
      treeData.value = res;
    });
  }
}
watch(
  () => props.ids,
  () => {
    loadData(false);
  }
);
function reload() {
  createConfirm({
    iconType: 'info',
    title: '确定要刷新吗？',
    content: '刷新将重新按规则生成代码，是否继续？',
    okText: '刷新',
    cancelText: '取消',
    onOk: () => {
      loadData(true);
    }
  });
}
onMounted(() => {
  loadData(false);
});
const [register, { show: showSetting }] = useDmSwitcher<FsGenFile[]>();
defineExpose({
  loadData
});
</script>

<template>
  <GenSetting @register="register"></GenSetting>
  <div class="code-gen-ide">
    <div class="code-gen-ide-title">
      <LineButton padding @click="reload">刷新</LineButton>
      <LineButton padding @click="showSetting({ action: 'setting', data: treeData })">生成</LineButton>
      <LineButton padding @click="showSetting({ action: 'setting', data: treeData })">下载</LineButton>
      <div class="code-path-line ellipsis-text">{{ editFile?.path }}</div>
      <LineButton v-if="editFile" padding @click="showSetting({ action: 'setting', data: treeData })">保存</LineButton>
    </div>
    <div class="code-gen-ide-main">
      <div class="code-gen-ide-left">
        <FileTree :tree-data="treeData" @select="onFileSelect"></FileTree>
      </div>
      <div class="code-gen-ide-content">
        <CodePanel :file="editFile"></CodePanel>
      </div>
    </div>
    <div class="code-gen-ide-footer">{{ selectedFile?.path }}</div>
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
  .code-gen-ide-title {
    display: flex;
  }
  .code-path-line {
    flex: 1;
    width: 1px;
    word-break: break-all;
    overflow: hidden;
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
    width: 260px;
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
