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
  packageName?: string;
  classPrefix?: string;
  classSuffix?: string;
  superClassName?: string;
  genericityTypeName?: string;
  implInterfaceNames: string[];
  withLombok?: boolean;
  withChain?: boolean;
  withValidator?: boolean;
  withSwagger?: boolean;
  ignoreColumns: string[];
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.dtoDesign) {
    formData.value = { ...configData.dtoDesign };
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
  if (configData.dtoDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.dtoDesign[key];
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
      return { dtoDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem :span="24" class="b-t b-t-info-200">
      <VxeText status="primary" content="Dto信息   （Controller save和update方法入参）"></VxeText>
    </VxeFormItem>
    <VxeFormItem field="packageName" title="Dto包" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.packageName" placeholder="基础包.模块包.Dto包" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="classPrefix" title="前缀" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.classPrefix" placeholder="前缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="classSuffix" title="后缀" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.classSuffix" placeholder="后缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="withLombok" title="lombok" title-colon :span="4">
      <template #default>
        <VxeSwitch v-model="formData.withLombok"></VxeSwitch>
      </template>
    </VxeFormItem>
    <VxeFormItem field="withChain" title="链式" title-colon :span="4">
      <template #default>
        <VxeSwitch v-model="formData.withChain"></VxeSwitch>
      </template>
    </VxeFormItem>
    <VxeFormItem field="withSwagger" title="Swagger" title-colon :span="4">
      <template #default>
        <VxeSwitch v-model="formData.withSwagger"></VxeSwitch>
      </template>
    </VxeFormItem>
    <VxeFormItem field="withValidator" title="校验" title-colon :span="4">
      <template #default>
        <VxeSwitch v-model="formData.withValidator"></VxeSwitch>
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
