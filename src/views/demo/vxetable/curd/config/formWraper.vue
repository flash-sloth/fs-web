<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeFormPropTypes } from 'vxe-table';
import { message } from 'ant-design-vue';
import { save } from './api';
const formRef = ref();
const modalVisible = ref(true);
interface FormDataVO {
  id?: number | null;
  name: string;
  type2: string;
  type3: string;
}

const formData = reactive<FormDataVO>({
  id: null,
  name: '',
  type3: '',
  type2: '0'
});

const formRules = ref<VxeFormPropTypes.Rules<FormDataVO>>({
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
});

const formItems = ref<VxeFormPropTypes.Items>([
  { field: 'name', title: '名称', span: 24, itemRender: { name: 'VxeInput' } },
  { field: 'type2', title: 'type2', span: 12, itemRender: { name: 'VxeInput' } },
  { field: 'type3', title: 'type3', span: 12, itemRender: { name: 'VxeInput' } }
]);

const submitEvent = async () => {
  await formRef.value?.validate();
  if (formData.id) {
    // update
  } else {
    await save(formData);
    message.success('新增成功');
  }
};

function cancelEvent() {
  modalVisible.value = false;
}
</script>

<template>
  <VxeModal v-model="modalVisible" show-footer title="表单" width="800" height="500" resize>
    <VxeForm ref="formRef" :rules="formRules" :data="formData" :items="formItems" title-colon></VxeForm>
    <template #footer>
      <VxeButton content="取消" @click="cancelEvent"></VxeButton>
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </template>
  </VxeModal>
</template>
