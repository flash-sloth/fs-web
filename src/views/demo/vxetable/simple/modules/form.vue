<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { getById, save, update } from '@/service/demo/test/codeTestSimple/api';
import type { CodeTestSimpleDto } from '@/service/demo/test/codeTestSimple/model';
import { formItems, formRules } from '../data/form';

const formRef = ref<VxeFormInstance>();
const formLoading = useLoading(false);

const formConfig = reactive<{
  formData: CodeTestSimpleDto;
  formItems: VxeFormPropTypes.Items;
  formRules: VxeFormPropTypes.Rules;
}>({
  formData: {} as CodeTestSimpleDto,
  formRules: formRules(),
  formItems: formItems()
});

async function load(data: any) {
  formRef.value?.reset();
  if (data?.id) {
    formLoading.startLoading();
    try {
      formConfig.formData = await getById(data.id);
    } finally {
      formLoading.endLoading();
    }
  } else {
    formConfig.formData = {} as CodeTestSimpleDto;
  }
}

const doSubmit = async () => {
  await formRef.value?.validate();
  formLoading.startLoading();
  try {
    if (formConfig.formData.id) {
      await update(formConfig.formData);
      message.success('修改成功');
    } else {
      await save(formConfig.formData);
      message.success('新增成功');
    }
  } finally {
    formLoading.endLoading();
  }
};

defineExpose({ load, doSubmit });
</script>

<template>
  <VxeForm
    ref="formRef"
    :loading="formLoading.loading.value"
    :rules="formConfig.formRules"
    :data="formConfig.formData"
    :items="formConfig.formItems"
    title-colon
  ></VxeForm>
</template>

<style scoped></style>
