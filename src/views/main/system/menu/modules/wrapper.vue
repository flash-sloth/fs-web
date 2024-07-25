<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { VxeTabPane, VxeTabs } from 'vxe-pc-ui';
import type { SysMenuDto } from '@/service/main/system/menu/model';
import type { FormInstance } from '@/typings/fs';
import FlexColContent from '@/components/fs/flex-box/flex-col-content.vue';
import type { Emits } from '../data/form';
import Form from './form.vue';
type FormDataType = SysMenuDto;
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance<FormDataType>>();
const selectTab = ref<string>('form');
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
  <VxeTabs v-model="selectTab" type="border-card" height="100%" padding>
    <VxeTabPane title="基本信息" name="form">
      <FlexColContent>
        <template v-if="action !== 'view'" #header>
          <div class="text-right">
            <VxeButton status="primary" content="提交" @click="submitEvent"></VxeButton>
          </div>
        </template>
        <Form ref="formRef"></Form>
      </FlexColContent>
    </VxeTabPane>
    <VxeTabPane title="按钮" name="button">按钮</VxeTabPane>
    <VxeTabPane title="字段" name="column">字段</VxeTabPane>
  </VxeTabs>
</template>

<style scoped></style>
