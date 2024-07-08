<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { FsAModal, useDmSwitcherInner } from '@/components/fs/drawer-modal-switcher';
import { importTable } from '@/service/main/generator/codeCreator/api';
import type { DataSource } from '@/service/main/base/datasource/model';
import { list } from '@/service/main/base/datasource/api';

const formRef = ref<VxeFormInstance>();
const formConfig = reactive<{
  rules: VxeFormPropTypes.Rules;
  data: VxeFormPropTypes.Data;
  items: VxeFormPropTypes.Items;
}>({
  rules: {
    dsId: [{ required: true, message: '请选择数据源' }],
    tableNames: [{ required: true, message: '请输入表名称' }]
  },
  data: {
    dsId: 1,
    tableNames: ''
  },
  items: [
    {
      field: 'dsId',
      title: '数据源',
      span: 24,
      itemRender: {
        name: 'VxeSelect',
        props: {
          multiple: true
        },
        options: []
      }
    },
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

function loadDataSource() {
  list({}).then(res => {
    const dsIdItem = formConfig.items.find(item => item.field === 'dsId');
    if (dsIdItem?.itemRender?.options) {
      dsIdItem.itemRender.options = res.map((item: DataSource) => {
        return {
          label: item.name,
          value: item.id
        };
      });
    }
  });
}
const { loading: formLoading, startLoading, endLoading } = useLoading();
const emit = defineEmits(['success']);
const [register, { close }] = useDmSwitcherInner(() => {
  loadDataSource();
  formRef.value?.reset();
});

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
