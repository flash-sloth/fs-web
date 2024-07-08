<script lang="ts" setup>
import { type VxeFormInstance } from 'vxe-table';
import { VxeForm, VxeFormItem, VxeOption, VxeSelect, VxeSwitch, VxeText } from 'vxe-pc-ui';
import { onMounted, ref, watch } from 'vue';
import { isNumber } from 'xe-utils';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { isValidKey } from '~/packages/utils/src';
import type { CodeBaseClass } from '@/service/main/generator/codeBaseClass/model';
import type { ConfigFormInstance } from './types';
const props = defineProps<{
  loading: boolean;
  configData: CodeCreatorEidtDto;
  baseClassList: CodeBaseClass[];
}>();
const formRef = ref<VxeFormInstance>();
interface formType {
  packageName?: string;
  classPrefix?: string;
  classSuffix?: string;
  superClassName?: string;
  withCache?: boolean;
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.serviceImplDesign) {
    formData.value = { ...configData.serviceImplDesign };
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
  if (configData.serviceImplDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.serviceImplDesign[key];
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
      return { serviceImplDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem :span="24" class="b-t b-t-info-200">
      <VxeText status="primary" content="ServiceImpl信息"></VxeText>
    </VxeFormItem>
    <VxeFormItem field="packageName" title="ServiceImpl包" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.packageName" placeholder="基础包.模块包.ServiceImpl包" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="superClassName" title="父类" title-colon :span="8">
      <template #default>
        <VxeSelect v-model="formData.superClassName" placeholder="选择父类">
          <VxeOption
            v-for="baseClass in baseClassList"
            :key="baseClass.id"
            :value="baseClass.packageName + '.' + baseClass.name"
            :label="baseClass.name"
          ></VxeOption>
        </VxeSelect>
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
    <VxeFormItem field="withCache" title="缓存" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.withCache"></VxeSwitch>
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
