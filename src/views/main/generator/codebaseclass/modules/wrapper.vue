<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { FsAModal, useDmSwitcherInner } from '@/components/fs/drawer-modal-switcher';
import type { DataSource } from '@/service/main/base/datasource/model';
import type { FormInstance } from '@/typings/fs';
import type { Emits } from '../data/form';
import Form from './form.vue';

type FormDataType = DataSource;
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance<FormDataType>>();
const title = ref<string>('新增');
const titleMap: Record<string, string> = {
  add: '新增',
  update: '编辑',
  copy: '复制',
  view: '查看'
};

const [register, { close }] = useDmSwitcherInner<FormDataType>(async ({ action, data }) => {
  title.value = titleMap[action] || '查看';
  formRef.value?.init(action, data);
});

const submitEvent = async () => {
  const res = await formRef.value?.handleSubmit();
  if (res) {
    emit('success');
    close();
  }
};
</script>

<template>
  <FsAModal is="VxeModal" show-footer position="top" show-zoom :title="title" :width="900" @register="register">
    <Form ref="formRef"></Form>
    <template #footer>
      <VxeButton content="取消" @click="close"></VxeButton>
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </template>
  </FsAModal>
</template>

<style scoped></style>
