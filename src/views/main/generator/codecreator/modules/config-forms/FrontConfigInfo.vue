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
  sourceDir?: string;
  openMode?: string;
  layout?: string;
  i18n?: boolean;
  keepAlive?: boolean;
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.frontDesign) {
    formData.value = { ...configData.frontDesign };
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
  if (configData.frontDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.frontDesign[key];
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
      return { frontDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem field="sourceDir" title="生成路径" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.sourceDir" placeholder="代码绝对位置" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="superClassName" title="表单打开方式" title-colon :span="8">
      <template #default>
        <VxeSelect v-model="formData.openMode" placeholder="选择表单打开方式">
          <VxeOption value="modal" label="弹窗"></VxeOption>
          <VxeOption value="drwaer" label="抽屉"></VxeOption>
          <VxeOption value="route" label="新页面"></VxeOption>
        </VxeSelect>
      </template>
    </VxeFormItem>
    <VxeFormItem field="superClassName" title="布局方式" title-colon :span="8">
      <template #default>
        <VxeRadioGroup v-model="formData.layout" size="mini" :strict="false">
          <VxeRadioButton label="1" content="单表"></VxeRadioButton>
          <VxeRadioButton label="2" content="主从"></VxeRadioButton>
          <VxeRadioButton label="3" content="树"></VxeRadioButton>
        </VxeRadioGroup>
      </template>
    </VxeFormItem>
    <VxeFormItem field="i18n" title="i18n" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.i18n"></VxeSwitch>
      </template>
    </VxeFormItem>
    <VxeFormItem field="keepAlive" title="keepAlive" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.keepAlive"></VxeSwitch>
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
