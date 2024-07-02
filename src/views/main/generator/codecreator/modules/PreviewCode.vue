<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { preview } from '@/service/main/generator/codeCreator/api';
import CodeGenIde from '@/components/fs-components/code-gen-ide/src/CodeGenIde.vue';
import type { FsGenFile } from '@/components/fs-components/code-gen-ide/src/types';
import { useTabStore } from '@/store/modules/tab';
import { useMessage } from '@/hooks/web/useMessage';
const { createErrorModal } = useMessage();
const { removeActiveTab } = useTabStore();

const route = useRoute();
const treeData = ref<FsGenFile[]>([]);
if (!route.query.ids) {
  createErrorModal({
    title: '请选择要预览/生成的代码',
    onCancel() {
      removeActiveTab();
    },
    onOk() {
      removeActiveTab();
    }
  });
}
onMounted(async () => {
  const ids = (route.query.ids as string).split(',');
  treeData.value = await preview({ ids, reload: false, genStrategy: {} });
});
</script>

<template>
  <div class="h-full">
    <CodeGenIde :tree-data="treeData"></CodeGenIde>
  </div>
</template>
