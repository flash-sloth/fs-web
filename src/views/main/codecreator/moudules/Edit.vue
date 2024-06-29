<script lang="ts" setup>
import { VxeLayoutBody, VxeLayoutContainer, VxeLayoutHeader } from 'vxe-pc-ui';
import { useTitle } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { assign, cloneDeep } from 'lodash-es';
import { useTabStore } from '@/store/modules/tab';
import { getCodeCreatorInfo } from '@/service/api/main/codeCreator';
import type { CodeCreatorEidtDto } from '@/service/model/main/codeCreator';
import type { BaseInfoFormInstance } from './BaseInfoForm.vue';
import BaseInfoForm from './BaseInfoForm.vue';
import Step from './Step.vue';
const { setTabLabel, activeTabId } = useTabStore();

const activeSetp = ref(0);
const $route = useRoute();
const configInfo = ref<CodeCreatorEidtDto>({});
const baseInfoFormRef = ref<BaseInfoFormInstance>();
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
</script>

<template>
  <div class="h-full">
    <VxeLayoutContainer vertical>
      <VxeLayoutHeader>
        <Step v-model:current="activeSetp"></Step>
      </VxeLayoutHeader>
      <VxeLayoutBody class="p-2">
        <BaseInfoForm v-if="activeSetp === 0" ref="baseInfoFormRef">0</BaseInfoForm>
        <div v-if="activeSetp === 1">1</div>
        <div v-if="activeSetp === 2">2</div>
        <div v-if="activeSetp === 3">3</div>
        <div v-if="activeSetp === 4">4</div>
        <div v-if="activeSetp === 5">5</div>
      </VxeLayoutBody>
    </VxeLayoutContainer>
  </div>
</template>
