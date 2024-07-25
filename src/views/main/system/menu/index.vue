<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue';
import type { VxeTreeInstance } from 'vxe-pc-ui';
import { VxeButton, VxeIcon, VxeTree } from 'vxe-pc-ui';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons-vue';
import { menuTree } from '@/service/main/system/menu/api';
import ContainerLeft from '@/components/fs/container-left/index.vue';
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
const { loading, startLoading, endLoading } = useLoading(false);
const formSizeConfig = {
  max: '900px',
  min: '0'
};
const formSize = ref(formSizeConfig.min);
/** 加载数据 */
async function loadData() {
  startLoading();
  try {
    const res = await menuTree(searchFormModel);
    treeData.value = res;
    nextTick(async () => {
      treeRef.value?.setAllExpandNode(true);
    });
    hideForm();
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
  formSize.value = formSizeConfig.max;
}
function hideForm() {
  formSize.value = formSizeConfig.min;
}
function toggleForm() {
  if (formSize.value === formSizeConfig.min) {
    showForm();
  } else {
    hideForm();
  }
}

function handleRemove() {}

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="h-full p-2">
    <AFlex class="h-full">
      <FlexColContent class="w-1 flex-1">
        <template #header>查询条件...</template>
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
      <AFlex vertical>
        <div class="flex-1"></div>
        <DoubleLeftOutlined
          :rotate="formSize === formSizeConfig.min ? 0 : 180"
          class="cursor-pointer text-6 text-warmGray hover:text-8"
          :title="formSize === formSizeConfig.min ? '展开表单' : '收起表单'"
          @click="toggleForm"
        />
        <div class="flex-1"></div>
      </AFlex>
      <div
        class="trans transition-all duration-300"
        :style="{
          width: formSize,
          overflow: 'hidden'
        }"
      >
        <div
          class="h-full"
          :style="{
            width: formSizeConfig.max
          }"
        >
          <FormWrapper ref="formRef" class="min-w-10" @success="loadData"></FormWrapper>
        </div>
      </div>
    </AFlex>
  </div>
</template>
