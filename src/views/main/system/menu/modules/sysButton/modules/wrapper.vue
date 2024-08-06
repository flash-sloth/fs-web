<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue';
import { FsAModal, useDmSwitcherInner } from '@/components/fs/drawer-modal-switcher';
import type { FormInstance } from '@/typings/fs';
import { actionCode, titleMap } from '@/utils/common';
import type { SysButtonVo } from '@/service/main/system/sysButton/model';
import type { Emits } from '../data/form';
import Form from './form.vue';

type FormDataType = Partial<SysButtonVo>;
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance<FormDataType>>();
const actionRef = ref<string>(actionCode.add);

const getTitle = computed(() => {
  return titleMap[actionRef.value] || titleMap.add;
});

const [register, { close }] = useDmSwitcherInner<FormDataType>(async ({ action, data }) => {
  actionRef.value = action;
  formRef.value?.init(action, data);
});

const submitEvent = async () => {
  await formRef.value?.handleSubmit();
  emit('success');
  close();
};
</script>

<template>
  <FsAModal
    is="VxeModal"
    show-footer
    position="top"
    show-zoom
    :title="getTitle"
    :width="900"
    @ok="submitEvent"
    @register="register"
  >
    <Form ref="formRef"></Form>
  </FsAModal>
</template>

<style scoped></style>
