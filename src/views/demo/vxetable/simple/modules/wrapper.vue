<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { FsAModal, useDmSwitcherInner } from '@/components/fs-components/drawer-modal-switcher';
import type { CodeTestSimpleVo } from '@/service/demo/test/codeTestSimple/model';
import type { Emits } from '../data/form';
import Form from './form.vue';

const emit = defineEmits<Emits>();
const formRef = ref();
const title = ref<string>('新增');
const titleMap: Record<string, string> = {
  add: '新增',
  update: '修改'
};

const [register, { close }] = useDmSwitcherInner<CodeTestSimpleVo>(async ({ action, data }) => {
  title.value = titleMap[action] || '新增';
  formRef.value?.load(data);
});

const submitEvent = async () => {
  await formRef.value?.doSubmit();
  emit('success');
  close();
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
