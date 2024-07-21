<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import type { SysMenuDto } from '@/service/main/system/menu/model';
import type { FormInstance } from '@/typings/fs';
import { SimpleScrollbar } from '~/packages/materials/src';
import type { Emits } from '../data/form';
import Form from './form.vue';

type FormDataType = SysMenuDto;
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance<FormDataType>>();

const action = ref<string>('view');

function setData(action_: string, data: FormDataType) {
  action.value = action_;
  formRef.value?.init(action.value, data);
}

const submitEvent = async () => {
  const res = await formRef.value?.handleSubmit();
  if (res) {
    emit('success');
    close();
  }
};
defineExpose<MenuFormWrapper>({
  setData
});
</script>

<script lang="ts">
export interface MenuFormWrapper {
  setData: (action: string, data: DataSource) => void;
}
</script>

<template>
  <div class="h-full flex-col">
    <div v-if="action !== 'view'" class="text-right">
      <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
    </div>
    <div class="h-1 flex-1">
      <SimpleScrollbar>
        <Form ref="formRef"></Form>
      </SimpleScrollbar>
    </div>
  </div>
</template>

<style scoped></style>
