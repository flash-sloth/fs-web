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
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.serviceDesign) {
    formData.value = { ...configData.serviceDesign };
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
  if (configData.serviceDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.serviceDesign[key];
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
      return { serviceDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem :span="24" class="b-t b-t-info-200">
      <VxeText status="primary" content="Service信息"></VxeText>
    </VxeFormItem>
    <VxeFormItem field="packageName" title="ServiceImpl包" title-colon :span="6">
      <template #default>
        <VxeInput v-model="formData.packageName" placeholder="基础包.模块包.Service包" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="superClassName" title="父类" title-colon :span="6">
      <template #default>
        <VxeSelect v-model="formData.superClassName" placeholder="选择父类">
          <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
        </VxeSelect>
      </template>
    </VxeFormItem>
    <VxeFormItem field="classPrefix" title="前缀" title-colon :span="6">
      <template #default>
        <VxeInput v-model="formData.classPrefix" placeholder="前缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="classSuffix" title="后缀" title-colon :span="6">
      <template #default>
        <VxeInput v-model="formData.classSuffix" placeholder="后缀" />
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
