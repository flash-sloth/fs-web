<script lang="ts" setup>
import { VxeLayoutBody, VxeLayoutContainer, VxeLayoutHeader } from 'vxe-pc-ui';
import { useTitle } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useTabStore } from '@/store/modules/tab';
import { getCodeCreatorInfo, preview } from '@/service/main/generator/codeCreator/api';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { useMessage } from '@/hooks/web/useMessage';
import CodeGenIde from '@/components/fs-components/code-gen-ide/src/CodeGenIde.vue';
import type { FsGenFile } from '@/components/fs-components/code-gen-ide/src/types';
import type { BaseInfoFormInstance } from './BaseInfoForm.vue';
import BaseInfoForm from './BaseInfoForm.vue';
import Step from './Step.vue';
const { setTabLabel, activeTabId } = useTabStore();
const { createMessage, createConfirm } = useMessage();
const activeSetp = ref(0);
const $route = useRoute();
const configInfo = ref<CodeCreatorEidtDto>({});
const baseInfoFormRef = ref<BaseInfoFormInstance>();
const treeData = ref<FsGenFile[]>([]);
async function loadData() {
  const data = await getCodeCreatorInfo($route.params.id as string);
  if (data) {
    useTitle(`编辑${data.tableName}`);
    setTabLabel(`编辑${data.tableName}`, activeTabId);
    configInfo.value = data;
    baseInfoFormRef.value?.setModles(data);
  }
}
onMounted(() => {
  loadData();
});
/** 当离开setp0 */
async function onOutSetp0(newSetp: number) {
  try {
    await baseInfoFormRef.value?.validate();
  } catch (e) {
    return;
  }
  const baseFromData = await baseInfoFormRef.value?.validate();
  if (JSON.stringify(baseFromData) === JSON.stringify(configInfo.value)) {
    switchToSetp(newSetp);
  } else {
    createConfirm({
      iconType: 'warning',
      title: '提示',
      content: '表单内容未保存，是否继续?',
      okText: '继续',
      cancelText: '取消',
      onOk() {
        switchToSetp(newSetp);
      }
    });
  }
}

async function loadPreviewData() {
  treeData.value = await preview({ ids: [$route.params.id as string], reload: false, genStrategy: {} });
}

/** @param newSetp 切换到新的步骤 */
function switchToSetp(newSetp: number) {
  activeSetp.value = newSetp;
  if (newSetp === 4) {
    // 预览代码页面
    loadPreviewData();
  }
}
async function onStepChange(newSetp: number) {
  if (activeSetp.value === 0) {
    onOutSetp0(newSetp);
  } else {
    switchToSetp(newSetp);
  }
}
</script>

<template>
  <div class="h-full">
    <VxeLayoutContainer vertical>
      <VxeLayoutHeader fixed>
        <Step :current="activeSetp" @update:current="onStepChange"></Step>
      </VxeLayoutHeader>
      <VxeLayoutBody class="h1 flex-1 p-2">
        <BaseInfoForm v-show="activeSetp === 0" ref="baseInfoFormRef">0</BaseInfoForm>
        <div v-show="activeSetp === 1">1</div>
        <div v-show="activeSetp === 2">2</div>
        <div v-show="activeSetp === 3">3</div>
        <div v-show="activeSetp === 4" class="h-full">
          <CodeGenIde :tree-data="treeData"></CodeGenIde>
        </div>
      </VxeLayoutBody>
    </VxeLayoutContainer>
  </div>
</template>
