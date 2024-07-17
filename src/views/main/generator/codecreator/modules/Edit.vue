<script lang="ts" setup>
import { VxeLayoutBody, VxeLayoutContainer, VxeLayoutHeader } from 'vxe-pc-ui';
import { useTitle } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { useTabStore } from '@/store/modules/tab';
import { getCodeCreatorInfo, preview } from '@/service/main/generator/codeCreator/api';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { useMessage } from '@/hooks/web/useMessage';
import CodeGenIde from './code-gen-ide/CodeGenIde.vue';
import type { BaseInfoFormInstance } from './config-forms/types';
import BaseInfoForm from './BaseInfoForm.vue';
import Step from './Step.vue';
const { setTabLabel, activeTabId } = useTabStore();
const { createMessage, createConfirm } = useMessage();
const activeSetp = ref(0);
const $route = useRoute();
const configInfo = ref<CodeCreatorEidtDto>({});
const baseInfoFormRef = ref<BaseInfoFormInstance>();
const codeGenIdeRef = ref();
const ids = ref<string[]>([]);
const settingChanged = ref(false);
/** 加载首页数据 */
async function loadData(changed: boolean) {
  settingChanged.value = changed;

  const data = await getCodeCreatorInfo($route.params.id as string);
  if (data) {
    useTitle(`编辑${data.tableName}`);
    setTabLabel(`编辑${data.tableName}`, activeTabId);
    configInfo.value = data;
    baseInfoFormRef.value?.setModles(data);
  }
  if (changed) {
    // 有信息修改立刻刷新代码
    await loadPreviewData();
  }
}
onMounted(() => {
  ids.value = [$route.params.id as string];
  loadData(false);
});
/** 当离开setp0 */
async function onOutSetp0(newSetp: number) {
  if (!baseInfoFormRef.value?.hasChange()) {
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
  codeGenIdeRef.value?.loadData(settingChanged.value);
  settingChanged.value = false;
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
        <BaseInfoForm v-show="activeSetp === 0" ref="baseInfoFormRef" @success="loadData(true)"></BaseInfoForm>
        <div v-show="activeSetp === 1">1</div>
        <div v-show="activeSetp === 2">2</div>
        <div v-show="activeSetp === 3">3</div>
        <div v-show="activeSetp === 4" class="h-full">
          <CodeGenIde ref="codeGenIdeRef" :ids="ids" :load-data-on-mounted="false"></CodeGenIde>
        </div>
      </VxeLayoutBody>
    </VxeLayoutContainer>
  </div>
</template>
