<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { VxeButton, VxeIcon, VxeTree } from 'vxe-pc-ui';
import { tree } from '@/service/main/system/menu/api';
import ContainerLeft from '@/components/fs/container-left/index.vue';
import type { SysMenuDto, SysMenuQuery, SysMenuVo } from '@/service/main/system/menu/model';
import type { MenuFormWrapper } from './modules/wrapper.vue';
import FormWrapper from './modules/wrapper.vue';
/** 定义表单操作数据的类型 */
type FormDataType = SysMenuDto;
const formRef = ref<MenuFormWrapper>();
const treeData = ref<SysMenuVo[]>([]);
const searchFormModel = reactive<Partial<SysMenuQuery>>({});

/** 加载数据 */
async function loadData() {
  return await tree(searchFormModel);
}

/**
 * 处理编辑事件
 *
 * @param row
 */
function handleUpdate(row: FormDataType) {
  formRef.value?.setData('update', row);
}
/** 处理新增事件 */
function handleAdd(row?: FormDataType) {
  formRef.value?.setData('add', row);
}
/** 处理复制事件 */
function handleCopy(row: FormDataType) {
  formRef.value?.setData('copy', row);
}
/** @param row 处理查看事件 */
function handleView(row: FormDataType) {
  formRef.value?.setData('view', row);
}

function handleRemove() {}

onMounted(() => {
  loadData().then(res => {
    treeData.value = res;
  });
});
</script>

<template>
  <div class="h-full p-2">
    <AFlex class="h-full">
      <ContainerLeft :init-w="400" :min-w="200" :max-w="600">
        <template #header>查询条件...</template>
        <VxeTree
          :data="treeData"
          is-current
          is-hover
          key-field="id"
          title-field="name"
          @node-click="(data: any) => handleView(data.node)"
        >
          <template #title="{ node }">
            <div>
              <VxeIcon name="menu" status="info"></VxeIcon>
              <span>{{ node.name }}</span>
            </div>
          </template>
          <template #extra="{ node }">
            <VxeButton mode="text" icon="vxe-icon-edit" @click.stop="handleUpdate(node)">编辑</VxeButton>
            <VxeButton mode="text" icon="vxe-icon-edit" @click.stop="handleAdd(node)">添加菜单</VxeButton>
            <VxeButton mode="text" status="error" icon="vxe-icon-delete-fill">删除</VxeButton>
          </template>
        </VxeTree>
      </ContainerLeft>

      <div class="w-1 flex-1 p-4">
        <FormWrapper ref="formRef" @success="loadData"></FormWrapper>
      </div>
    </AFlex>
  </div>
</template>
