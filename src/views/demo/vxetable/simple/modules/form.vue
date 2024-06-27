<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import type { CurdModel, CurdSaveDto, CurdUpdateDto } from '@/models/demo/curd-models';
import { get, save, update } from '@/api/demo/curd-api';
import { formItems, formRules } from '../data/form';

const formRef = ref<VxeFormInstance>();
const formLoading = useLoading(false);

const formConfig = reactive<{
  formData: PNullable<CurdModel>;
  formItems: VxeFormPropTypes.Items;
  formRules: VxeFormPropTypes.Rules;
}>({
  formData: {
    id: null,
    name: '',
    type3: '',
    type2: '0'
  },
  formRules: formRules(),
  formItems: formItems()
});

/**
 * @param id 记录的ID
 * @returns Promise<ROWVo> 返回记录详情
 */
async function loadInfo(id: number) {
  return await get(id);
}

async function load(data: any) {
  formRef.value?.reset();
  if (data?.id) {
    formLoading.startLoading();
    try {
      formConfig.formData = await loadInfo(data.id);
    } finally {
      formLoading.endLoading();
    }
  } else {
    formConfig.formData = {} as CurdModel;
  }
}

const doSubmit = async () => {
  await formRef.value?.validate();
  formLoading.startLoading();
  try {
    if (formConfig.formData.id) {
      await update(formConfig.formData as CurdUpdateDto);
      message.success('修改成功');
    } else {
      await save(formConfig.formData as CurdSaveDto);
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
