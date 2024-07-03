<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { preview } from '@/service/main/generator/codeCreator/api';
import { useTabStore } from '@/store/modules/tab';
import { useMessage } from '@/hooks/web/useMessage';
import CodeGenIde from './code-gen-ide/CodeGenIde.vue';
import type { FsGenFile } from './code-gen-ide/types';
const { createErrorModal } = useMessage();
const { removeActiveTab } = useTabStore();

const route = useRoute();
const ids = ref<string[]>([]);
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
  ids.value = (route.query.ids as string).split(',');
});
</script>

<template>
  <div class="h-full">
    <CodeGenIde :ids="ids"></CodeGenIde>
  </div>
</template>
