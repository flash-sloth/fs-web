<script setup lang="ts">
import { defineEmits, ref } from 'vue';
import { VxeTabPane, VxeTabs } from 'vxe-pc-ui';
import type { SysMenuDto } from '@/service/main/system/menu/model';
import type { FormInstance } from '@/typings/fs';
import FlexColContent from '@/components/fs/flex-box/flex-col-content.vue';
import type { Emits } from '../data/form';
import SysButton from './sysButton/index.vue';
import Form from './form.vue';
type FormDataType = Partial<SysMenuDto>;
const emit = defineEmits<Emits>();
const formRef = ref<FormInstance<FormDataType>>();
const selectTab = ref<string>('form');
const action = ref<string>('view');
const activeData = ref<FormDataType>();
function setData(action_: string, data: { data?: FormDataType; treeData: FormDataType[] }) {
  action.value = action_;
  activeData.value = data.data;
  formRef.value?.init(action.value, data);
}

const submitEvent = async () => {
  const res = await formRef.value?.handleSubmit();
  if (res) {
    emit('success');
    // close();
  }
};
defineExpose<MenuFormWrapper>({
  setData
});
</script>

<script lang="ts">
export interface MenuFormWrapper {
  setData: (action: string, data: { data?: Partial<SysMenuDto>; treeData: Partial<SysMenuDto>[] }) => void;
}
</script>

<template>
  <div v-show="!activeData" class="mt-5 text-center">
    <AEmpty description="请选择菜单"></AEmpty>
  </div>

  <VxeTabs v-show="activeData" v-model="selectTab" type="border-card" height="100%" padding>
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
    <VxeTabPane title="按钮" name="button">
      <SysButton :action="action" :menu-id="activeData?.id ?? ''"></SysButton>
    </VxeTabPane>
    <VxeTabPane title="字段" name="column">字段</VxeTabPane>
  </VxeTabs>
</template>

<style scoped></style>
