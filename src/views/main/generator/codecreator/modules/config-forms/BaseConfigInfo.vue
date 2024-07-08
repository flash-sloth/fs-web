<script lang="ts" setup>
import { type VxeFormInstance } from 'vxe-table';
import { VxeForm, VxeFormItem } from 'vxe-pc-ui';
import { onMounted, ref, watch } from 'vue';
import { isNumber } from 'xe-utils';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { isValidKey } from '~/packages/utils/src';

import type { ConfigFormInstance } from './types';
const props = defineProps<{
  loading: boolean;

  configData: CodeCreatorEidtDto;
}>();
const formRef = ref<VxeFormInstance>();
interface formType {
  dsId: number;
  tableName: string;
  tableDescription: string;
}
const formData = ref<formType>({
  dsId: 0,
  tableName: '',
  tableDescription: ''
});

function initFormData() {
  const { configData } = props;
  for (const key in formData.value) {
    if (isValidKey(key, formData.value)) {
      formData.value[key] = configData[key];
    }
  }
  formData.value = { ...formData.value };
}

watch(
  () => props.configData,
  () => {
    initFormData();
  }
);
onMounted(() => {
  initFormData();
});
const rules = {
  tableName: [{ required: true, message: '请输入表名称' }],
  tableDescription: [{ required: true, message: '请输入表注释信息' }]
};
// 判断是否有修改
function hasChange() {
  let flag = false;
  const { configData } = props;
  for (const key in formData.value) {
    if (isValidKey(key, formData.value)) {
      let oldValue: any = configData[key];
      oldValue = isNumber(oldValue) ? `${oldValue}` : oldValue;
      let value: any = formData.value[key];
      value = isNumber(value) ? `${value}` : value;
      if (oldValue !== value) {
        flag = true;
      }
    }
  }
  return flag;
}
defineExpose<ConfigFormInstance>({
  hasChange,
  validate: async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      return formData.value;
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading">
    <VxeFormItem field="tableName" title="数据源" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.dsId" disabled placeholder="请输入数据源" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="tableName" title="表名称" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.tableName" disabled placeholder="请输入名称" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="tableDescription" title="表注释" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.tableDescription" placeholder="请输入表注释信息" />
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
