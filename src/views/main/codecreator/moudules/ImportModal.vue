<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { FsAModal, useDmSwitcherInner } from '@/components/fs-components/drawer-modal-switcher';
import { importTable } from '@/service/api/main/codeCreator';
const formRef = ref<VxeFormInstance>();
const formConfig = reactive<{
  rules: VxeFormPropTypes.Rules;
  data: VxeFormPropTypes.Data;
  items: VxeFormPropTypes.Items;
}>({
  rules: {
    tableNames: [{ required: true, message: '请输入表名称' }]
  },
  data: {
    dsId: 1,
    tableNames: ''
  },
  items: [
    {
      field: 'tableNames',
      title: '表名称',
      span: 24,
      itemRender: {
        name: 'VxeInput'
      }
    }
  ]
});
const emit = defineEmits(['success']);
const [register, { close }] = useDmSwitcherInner(() => {
  formRef.value?.reset();
});
const { loading: formLoading, startLoading, endLoading } = useLoading();
const submitEvent = async () => {
  const error = await formRef.value?.validate();
  if (error) {
    return;
  }
  try {
    startLoading();
    const param = { ...formConfig.data };
    param.tableNames = param.tableNames.split(',');
    await importTable(param);
    emit('success');
    close();
  } finally {
    endLoading();
  }
};
</script>

<template>
  <FsAModal is="VxeModal" show-footer position="top" show-zoom title="导入表格" :width="400" @register="register">
    <VxeForm ref="formRef" :loading="formLoading" v-bind="formConfig" title-colon></VxeForm>
    <template #footer>
      <VxeButton content="取消" @click="close"></VxeButton>
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </template>
  </FsAModal>
</template>

<style scoped></style>
