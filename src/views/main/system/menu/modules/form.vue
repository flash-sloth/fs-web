<script setup lang="ts">
import { reactive, ref } from 'vue';
import { type VxeFormInstance, type VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { mapTree } from 'xe-utils';
import { VxeTreeSelect } from 'vxe-pc-ui';
import { getById, save, update } from '@/service/main/system/menu/api';
import type { SysMenuDto } from '@/service/main/system/menu/model';
import type { FormInstance } from '@/typings/fs';
import { useMessage } from '@/hooks/web/useMessage';
import { MenuTypeEnum } from '@/service/main/system/menu/enum';
import { filter } from '@/utils/helper/treeHelper';
import { formItems, formRules } from '../data/form';
const { createMessage } = useMessage();

/** 定义表单操作数据的类型 */
type FormDataType = Partial<SysMenuDto>;
/** 表单实体 */
const formRef = ref<VxeFormInstance>();
/** 表单loading状态 */
const formLoading = useLoading(false);
/** 表单操作编码：add update copy view */
const formAction = ref<string>('add');
/** 表单配置信息 */
const formConfig = reactive<{
  /** 表单数据 */
  formData: FormDataType;
  /** 表单项 */
  formItems: VxeFormPropTypes.Items;
  /** 表单校验规则 */
  formRules: VxeFormPropTypes.Rules;
  /** 表单只读状态 */
  readonly: boolean;
}>({
  formData: {} as FormDataType,
  formRules: formRules(),
  formItems: formItems(),
  readonly: false
});

/** 初始化新增 */
function initAdd(data?: { data?: FormDataType; treeData: FormDataType[] }) {
  formConfig.formData = {
    parentId: `${data?.data?.id || ''}`,
    menuType: MenuTypeEnum.MENU
  };
}
/**
 * 初始化修改
 *
 * @param data
 */
async function initUpdate(data?: { data?: FormDataType; treeData: FormDataType[] }) {
  await loadDataAndSetFormData(data?.data);
}
/**
 * 初始化复制
 *
 * @param data
 */
async function initCopy(data?: { data?: FormDataType; treeData: FormDataType[] }) {
  await loadDataAndSetFormData(data?.data);
  formConfig.formData.id = undefined;
}

async function initView(data?: { data?: FormDataType; treeData: FormDataType[] }) {
  await loadDataAndSetFormData(data?.data);
  formConfig.readonly = true;
}

/** 加载数据，并将数据设置到表单中 */
async function loadDataAndSetFormData(data?: FormDataType) {
  if (data && data.id) {
    try {
      formLoading.startLoading();
      formConfig.formData = await getById(data.id);
    } finally {
      formLoading.endLoading();
    }
  }
}
const parantOptions = ref<any[]>([]);
function initParentOptions(treeData?: FormDataType[], data?: FormDataType) {
  const temp: any = {};
  if (data && data.id) {
    temp[data.id] = true;
  }
  const parentsTree = filter(
    treeData || [],
    item => {
      if (formAction.value === 'add') {
        return item.menuType === MenuTypeEnum.DIR || item.menuType === MenuTypeEnum.MENU;
      } else if (temp[item.id || ''] || temp[item.parentId || '']) {
        temp[item.id || ''] = true;
        return false;
      }
      return item.menuType === MenuTypeEnum.DIR || item.menuType === MenuTypeEnum.MENU;
    },
    {}
  );
  parantOptions.value = mapTree(parentsTree, item => {
    return {
      label: item.name,
      value: item.id
    };
  });
}
async function init(
  action: string,
  data?: {
    data?: FormDataType;
    treeData: FormDataType[];
  }
) {
  formAction.value = action;
  // 清空数据
  formConfig.formData = {} as FormDataType;
  formConfig.readonly = false;
  // 筛选父级菜单
  initParentOptions(data?.treeData, data?.data);
  switch (action) {
    case 'add':
      await initAdd(data);
      break;
    case 'update':
      await initUpdate(data);
      break;
    case 'copy':
      await initCopy(data);
      break;
    case 'view':
    default:
      await initView(data);
  }
}
/**
 * 修改时提交
 *
 * @param data
 */
async function submitUpdate(params: FormDataType) {
  await update(params);
  createMessage.success('修改成功');
}
/**
 * 增加时提交
 *
 * @param data
 */
async function submitAdd(params: FormDataType) {
  await save(params);
  createMessage.success('新增成功');
}
/** 复制时提交 */
async function submitCopy(params: FormDataType) {
  await save(params);
  createMessage.success('复制成功');
}

async function handleSubmit() {
  try {
    const err = await formRef.value?.validate();
    if (err) {
      return false;
    }
    const params = { ...formConfig.formData };
    formLoading.startLoading();
    switch (formAction.value) {
      case 'add':
        await submitAdd(params);
        break;
      case 'update':
        await submitUpdate(params);
        break;
      case 'copy':
        await submitCopy(params);
        break;
      case 'view':
      default:
        break;
    }
    formLoading.endLoading();
    return true;
  } catch (_e) {
    formLoading.endLoading();
    throw _e;
  }
}

function handleGenerateCode() {
  createMessage.error('生成编码');
}
function handleGeneratePath() {
  createMessage.error('生成路径');
}
defineExpose<
  FormInstance<{
    data?: FormDataType;
    treeData: FormDataType[];
  }>
>({ init, handleSubmit });
</script>

<template>
  <VxeForm
    ref="formRef"
    :loading="formLoading.loading.value"
    :readonly="formConfig.readonly"
    :rules="formConfig.formRules"
    :data="formConfig.formData"
    :items="formConfig.formItems"
    title-colon
  >
    <template #code="{ data }">
      <VxeInput v-model="data.code" :readonly="formConfig.readonly" placeholder="请输入编码">
        <template #suffix>
          <VxeButton v-if="!formConfig.readonly" @click="handleGenerateCode">生成</VxeButton>
        </template>
      </VxeInput>
    </template>
    <template #path="{ data }">
      <VxeInput v-model="data.path" :readonly="formConfig.readonly" placeholder="请输入路径">
        <template #suffix>
          <VxeButton v-if="!formConfig.readonly" @click="handleGeneratePath">生成</VxeButton>
        </template>
      </VxeInput>
    </template>
    <template #icon="{ data }">
      <IconPicker v-model:value="data.icon" :disabled="formConfig.readonly" />
    </template>
    <template #parentId="{ data }">
      <AFlex :gap="0">
        <ATreeSelect
          v-model:value="data.parentId"
          style="width: 100%"
          :disabled="formConfig.readonly || formAction === 'add'"
          :readonly="formConfig.readonly || formAction === 'add'"
          placeholder="请选择父级"
          :tree-data="parantOptions"
        ></ATreeSelect>
      </AFlex>
    </template>
  </VxeForm>
</template>

<style scoped></style>
