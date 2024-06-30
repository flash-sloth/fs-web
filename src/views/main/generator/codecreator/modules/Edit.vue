<script lang="ts" setup>
import { VxeLayoutBody, VxeLayoutContainer, VxeLayoutHeader } from 'vxe-pc-ui';
import { useTitle } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { SimpleScrollbar } from '@sa/materials';
import { useTabStore } from '@/store/modules/tab';
import { getCodeCreatorInfo } from '@/service/main/generator/codeCreator/api';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
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
      <VxeLayoutHeader fixed>
        <Step v-model:current="activeSetp"></Step>
      </VxeLayoutHeader>
      <VxeLayoutBody class="p-2">
        <SimpleScrollbar class="h-full">
          <BaseInfoForm v-show="activeSetp === 0" ref="baseInfoFormRef">0</BaseInfoForm>
          <div v-show="activeSetp === 1">1</div>
          <div v-show="activeSetp === 2">2</div>
          <div v-show="activeSetp === 3">3</div>
          <div v-show="activeSetp === 4">4</div>
          <div v-show="activeSetp === 5">5</div>
        </SimpleScrollbar>
      </VxeLayoutBody>
    </VxeLayoutContainer>
  </div>
</template>
