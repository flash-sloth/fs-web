<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import type { VxeTreeInstance } from 'vxe-pc-ui';
import { VxeButton, VxeForm, VxeIcon, VxeTree } from 'vxe-pc-ui';
import { menuTree } from '@/service/main/system/menu/api';
import FlexCollapse from '@/components/fs/flex-collapse/index.vue';
import { type SysMenuDto, type SysMenuQuery, type SysMenuVo } from '@/service/main/system/menu/model';
import { useLoading } from '~/packages/hooks/src';
import { ResourceTypeEnum } from '@/service/main/system/menu/enum';
import FlexColContent from '@/components/fs/flex-box/flex-col-content.vue';
import type { MenuFormWrapper } from './modules/wrapper.vue';
import FormWrapper from './modules/wrapper.vue';
/** 定义表单操作数据的类型 */
type FormDataType = SysMenuDto;
const formRef = ref<MenuFormWrapper>();
const treeData = ref<SysMenuVo[]>([]);
const treeRef = ref<VxeTreeInstance>();
const searchFormModel = reactive<Partial<SysMenuQuery>>({});
const expanded = ref(false);
const { loading, startLoading, endLoading } = useLoading(false);
const searchFormAttrs = reactive({
  title: '查询',
  submitText: '查询',
  resetText: '重置',
  submit: () => {
    loadData();
  }
});
/** 加载数据 */
async function loadData() {
  startLoading();
  try {
    const res = await menuTree(searchFormModel);
    treeData.value = res;
    nextTick(async () => {
      treeRef.value?.setAllExpandNode(true);
    });
  } catch (error) {
    console.error(error);
  }
  endLoading();
}

/**
 * 处理编辑事件
 *
 * @param row
 */
function handleUpdate(row: FormDataType) {
  formRef.value?.setData('update', row);
  showForm();
}
/** 处理新增事件 */
function handleAdd(row?: FormDataType) {
  formRef.value?.setData('add', row);
  showForm();
}
/** 处理复制事件 */
function handleCopy(row: FormDataType) {
  formRef.value?.setData('copy', row);
  showForm();
}
/** @param row 处理查看事件 */
function handleView(row: FormDataType) {
  formRef.value?.setData('view', row);
  showForm();
}

const nodeTimerMap: { [key: string]: any } = {};
function handleOver(node: any) {
  if (nodeTimerMap[node.id]) {
    clearTimeout(nodeTimerMap[node.id]);
  }
  nodeTimerMap[node.id] = setTimeout(() => {
    node.showTool = true;
  }, 100);
}
function handleLeve(node: any) {
  if (nodeTimerMap[node.id]) {
    clearTimeout(nodeTimerMap[node.id]);
  }
  nodeTimerMap[node.id] = setTimeout(() => {
    node.showTool = false;
  }, 100);
}

function showForm() {
  expanded.value = true;
}

function handleRemove() {}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="h-full p-2">
    <FlexCollapse
      v-model:expanded="expanded"
      class="h-full"
      min="0px"
      max="800px"
      collapse-panel-position="right"
      expanded-tip="收起表单"
      un-expanded-tip="展开表单"
    >
      <template #flexBox>
        <FlexColContent class="h-full w-full">
          <template #header>
            <div>
              <VxeForm v-bind="searchFormAttrs"></VxeForm>
              <VxeButton mode="text" icon="vxe-icon-search" @click="loadData">查询</VxeButton>
            </div>
          </template>
          <VxeTree
            ref="treeRef"
            :data="treeData"
            is-current
            is-hover
            :loading="loading"
            key-field="id"
            title-field="name"
            @node-click="(data: any) => handleView(data.node)"
          >
            <template #title="{ node }">
              <div @mouseenter="handleOver(node)" @mouseleave="handleLeve(node)">
                <VxeIcon v-if="node.resourceType === ResourceTypeEnum.MENU" name="menu" status="info"></VxeIcon>
                <VxeIcon v-if="node.resourceType === ResourceTypeEnum.VIEW" name="" status="info"></VxeIcon>
                <span>{{ node.name }}</span>
                <span class="ml-2 text-warmGray">{{ node.remarks }}</span>
              </div>
            </template>
            <template #extra="{ node }">
              <div v-if="node && node.showTool" @mouseenter="handleOver(node)" @mouseleave="handleLeve(node)">
                <VxeButton mode="text" icon="vxe-icon-edit" title="编辑" @click.stop="handleUpdate(node)"></VxeButton>
                <VxeButton
                  v-if="node.resourceType === ResourceTypeEnum.MENU"
                  mode="text"
                  icon="vxe-icon-add"
                  title="新增子菜单"
                  @click.stop="handleAdd(node)"
                ></VxeButton>
                <VxeButton mode="text" status="error" icon="vxe-icon-delete-fill" title="删除"></VxeButton>
              </div>
            </template>
          </VxeTree>
        </FlexColContent>
      </template>
      <template #collapsePanel>
        <FormWrapper ref="formRef" @success="loadData"></FormWrapper>
      </template>
    </FlexCollapse>
  </div>
</template>
