<script lang="ts" setup>
import { computed, defineEmits, defineExpose, reactive, ref } from 'vue';
import type { VxeFormPropTypes } from 'vxe-table';
import { message } from 'ant-design-vue';

import { useLoading } from '@sa/hooks';
import { get, save, update } from './api';
const formRef = ref();
const modalVisible = ref(false);
const formLoading = useLoading(false);
const emit = defineEmits(['success']);
interface FormDataVO {
  id?: number | null;
  name?: string;
  type2?: string;
  type3?: string;
}
const formConfig = reactive<{
  formData: FormDataVO;
  formItems: VxeFormPropTypes.Items;
  formRules: VxeFormPropTypes.Rules;
}>({
  formData: {
    id: null,
    name: '',
    type3: '',
    type2: '0'
  },
  formRules: {
    name: [
      { required: true, message: '请输入名称' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    type3: [{ required: true, message: '请填写test1' }],
    type2: [
      { required: true, message: '请填写test2' },
      {
        validator: async ({ itemValue, data }) => {
          // 自定义校验
          if (data.type3 && itemValue === data.type3) {
            throw new Error('test1 不能与 test2 一致');
          }
          return true;
        }
      }
    ]
  },
  formItems: [
    { field: 'name', title: '名称', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'type2', title: 'type2', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'type3', title: 'type3', span: 12, itemRender: { name: 'VxeInput' } }
  ]
});

const submitEvent = async () => {
  await formRef.value?.validate();
  formLoading.startLoading();
  try {
    if (formConfig.formData.id) {
      await update(formConfig.formData);
      message.success('修改成功');
      emit('success');
    } else {
      await save(formConfig.formData);
      message.success('新增成功');
      emit('success');
    }
    closeModal();
  } finally {
    formLoading.endLoading();
  }
};

function closeModal() {
  formRef.value?.reset();
  modalVisible.value = false;
}

function cancelEvent() {
  closeModal();
}

const title = computed(() => (formConfig.formData.id ? '编辑' : '新增'));
async function openModal(data: { id?: number }) {
  modalVisible.value = true;
  if (data.id) {
    formLoading.startLoading();
    try {
      formConfig.formData = await loadInfo(data.id);
    } finally {
      formLoading.endLoading();
    }
  } else {
    formConfig.formData = {};
  }
}
/**
 * @param id 记录的ID
 * @returns Promise<ROWVo> 返回记录详情
 */
async function loadInfo(id: number) {
  return await get(id);
}
defineExpose({ openModal });
</script>

<template>
  <AModal v-model:open="modalVisible" show-footer :title="title" :width="600" resize>
    <VxeForm
      ref="formRef"
      :loading="formLoading.loading.value"
      :rules="formConfig.formRules"
      :data="formConfig.formData"
      :items="formConfig.formItems"
      title-colon
    ></VxeForm>
    <template #footer>
      <VxeButton content="取消" @click="cancelEvent"></VxeButton>
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </template>
  </AModal>
</template>
