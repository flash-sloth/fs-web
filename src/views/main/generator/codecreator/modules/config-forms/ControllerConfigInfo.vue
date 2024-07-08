<script lang="ts" setup>
import { type VxeFormInstance } from 'vxe-table';
import { VxeForm, VxeFormItem, VxeOption, VxeSelect, VxeSwitch, VxeText } from 'vxe-pc-ui';
import { onMounted, ref, watch } from 'vue';
import { isNumber } from 'xe-utils';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { isValidKey } from '~/packages/utils/src';
import { type CodeBaseClass } from '@/service/main/generator/codeBaseClass/model';
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
  requestMappingPrefix?: string;
  withCrud?: boolean;
  restStyle?: boolean;
  superClassName?: string;
}
const formData = ref<formType>({});

function initFormData() {
  const { configData } = props;
  if (configData.controllerDesign) {
    formData.value = { ...configData.controllerDesign };
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
  if (configData.controllerDesign) {
    for (const key in formData.value) {
      if (isValidKey(key, formData.value)) {
        let oldValue: any = configData.controllerDesign[key];
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
      return { controllerDesign: { ...formData.value } };
    }
    return null;
  }
});
</script>

<template>
  <VxeForm ref="formRef" :rules="rules" :data="formData" :loading="loading" custom-layout>
    <VxeFormItem :span="24" class="b-t b-t-info-200">
      <VxeText status="primary" content="Controller信息"></VxeText>
    </VxeFormItem>
    <VxeFormItem field="packageName" title="Controller包" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.packageName" placeholder="基础包.模块包.Controller包" />
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
    <VxeFormItem field="requestMappingPrefix" title="请求前缀" title-colon :span="8">
      <template #default>
        <VxeInput v-model="formData.requestMappingPrefix" placeholder="@RequestMapping 注解的前缀" />
      </template>
    </VxeFormItem>
    <VxeFormItem field="withCrud" title="生成Crud" title-colon :span="8">
      <template #default>
        <VxeSwitch v-model="formData.withCrud"></VxeSwitch>
      </template>
    </VxeFormItem>
  </VxeForm>
</template>
