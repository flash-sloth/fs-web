<script lang="ts" setup>
import { defineEmits, reactive, ref } from 'vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { message } from 'ant-design-vue';
import { useLoading } from '@sa/hooks';
import { FsAModal, useDmSwitcherInner } from '@/components/fs-components/drawer-modal-switcher';
import { get, save, update } from '@/api/demo/curd-api';
import type { CurdModel, CurdSaveDto, CurdUpdateDto } from '@/models/demo/curd-models';
import { formItems, formRules } from './curdConfig';
const formRef = ref<VxeFormInstance>();
const formLoading = useLoading(false);
const emit = defineEmits(['success']);

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
const title = ref<string>('新增');
const titleMap: Record<string, string> = {
  add: '新增',
  update: '修改'
};
const [register, { close }] = useDmSwitcherInner<CurdModel>(async ({ action, data }) => {
  title.value = titleMap[action] || '新增';
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
});

const submitEvent = async () => {
  await formRef.value?.validate();
  formLoading.startLoading();
  try {
    if (formConfig.formData.id) {
      await update(formConfig.formData as CurdUpdateDto);
      message.success('修改成功');
      emit('success');
    } else {
      await save(formConfig.formData as CurdSaveDto);
      message.success('新增成功');
      emit('success');
    }
    close();
  } finally {
    formLoading.endLoading();
  }
};
</script>

<template>
  <FsAModal is="VxeModal" show-footer position="top" show-zoom :title="title" :width="900" @register="register">
    <VxeForm
      ref="formRef"
      :loading="formLoading.loading.value"
      :rules="formConfig.formRules"
      :data="formConfig.formData"
      :items="formConfig.formItems"
      title-colon
    ></VxeForm>
    <template #footer>
      <VxeButton content="取消" @click="close"></VxeButton>
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </template>
  </FsAModal>
</template>
