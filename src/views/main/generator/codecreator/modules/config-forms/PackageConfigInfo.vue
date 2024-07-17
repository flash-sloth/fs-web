<script lang="ts" setup>
import { type VxeFormInstance } from 'vxe-table';
import { VxeForm, VxeFormItem, VxeOption, VxeSelect, VxeText } from 'vxe-pc-ui';
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
  sourceDir?: string;
  basePackage?: string;
  module?: string;
  moduleDescription?: string;
  subSystemId?: number;
  author?: string;
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.packageDesign) {
    formData.value = { ...configData.packageDesign };
  }
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
  module: [{ required: true, message: '请输入模块包信息' }],
  basePackage: [{ required: true, message: '请输入基础包信息' }],
  sourceDir: [{ required: true, message: '请输入生成路径' }],
  author: [{ required: true, message: '请输入作者信息' }]
};
// 判断是否有修改
function hasChange() {
  let flag = false;
  const { configData } = props;
  if (configData.packageDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.packageDesign[key];
        oldValue = isNumber(oldValue) ? `${oldValue}` : oldValue;
        let value: any = formData.value[key];
        value = isNumber(value) ? `${value}` : value;
        if (oldValue !== value) {
          flag = true;
        }
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
      return { packageDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading">
    <VxeFormItem :span="24"><VxeText status="primary" content="包信息"></VxeText></VxeFormItem>
    <VxeFormItem field="author" title="作者" title-colon :span="12">
      <VxeInput v-model="formData.author" placeholder="请输入作者" />
    </VxeFormItem>
    <VxeFormItem field="sourceDir" title="生成路径" title-colon :span="12">
      <template #default>
        <VxeInput v-model="formData.sourceDir" placeholder="本地代码绝对路径" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="basePackage" title="基础包" title-colon :span="12">
      <template #default>
        <VxeInput v-model="formData.basePackage" placeholder="src/main/java目录下的基础包" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="module" title="模块包" title-colon :span="12">
      <template #default>
        <VxeInput v-model="formData.module" placeholder="基础包.模块包" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="subSystemId" title="子系统" title-colon :span="12">
      <template #default>
        <VxeSelect v-model="formData.subSystemId" placeholder="选择子系统">
          <VxeOption :value="1" label="主系统"></VxeOption>
        </VxeSelect>
      </template>
    </VxeFormItem>
    <VxeFormItem field="moduleDescription" title="模块描述" title-colon :span="24">
      <template #default>
        <VxeTextarea v-model="formData.moduleDescription" placeholder="模块描述" />
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
