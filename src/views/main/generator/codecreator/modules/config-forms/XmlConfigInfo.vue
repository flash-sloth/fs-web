<script lang="ts" setup>
import { type VxeFormInstance } from 'vxe-table';
import {
  VxeForm,
  VxeFormItem,
  VxeOption,
  VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  VxeSwitch,
  VxeText,
  VxeTextarea
} from 'vxe-pc-ui';
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
  path?: string;
  filePrefix?: string;
  fileSuffix?: string;
  withResultMap?: boolean;
  withSql?: boolean;
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.xmlDesign) {
    formData.value = { ...configData.xmlDesign };
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
const rules = {};
// 判断是否有修改
function hasChange() {
  let flag = false;
  const { configData } = props;
  if (configData.xmlDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.xmlDesign[key];
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
      return { xmlDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem :span="24" class="b-t b-t-info-200">
      <VxeText status="primary" content="Xml信息"></VxeText>
    </VxeFormItem>
    <VxeFormItem field="path" title="Controller包" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.path" placeholder="src/main/resources/mapper" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="filePrefix" title="前缀" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.filePrefix" placeholder="前缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="fileSuffix" title="后缀" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.fileSuffix" placeholder="后缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="withResultMap" title="ResultMap" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.withResultMap"></VxeSwitch>
      </template>
    </VxeFormItem>
    <VxeFormItem field="withSql" title="字段SQL" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.withSql"></VxeSwitch>
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
