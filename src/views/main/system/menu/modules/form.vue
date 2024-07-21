<script setup lang="ts">
import { reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { VxeFormInstance, VxeFormPropTypes } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { getById, save, update } from '@/service/main/system/menu/api';
import type { SysMenuDto } from '@/service/main/system/menu/model';
import type { FormInstance } from '@/typings/fs';
import { formItems, formRules } from '../data/form';
/** 定义表单操作数据的类型 */
type FormDataType = SysMenuDto;
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
function initAdd() {}
/**
 * 初始化修改
 *
 * @param data
 */
async function initUpdate(data?: FormDataType) {
  await loadDataAndSetFormData(data);
}
/**
 * 初始化复制
 *
 * @param data
 */
async function initCopy(data?: FormDataType) {
  await loadDataAndSetFormData(data);
  formConfig.formData.id = undefined;
}

async function initView(data?: FormDataType) {
  await loadDataAndSetFormData(data);
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

async function init(action: string, data?: FormDataType) {
  formAction.value = action;
  // 清空数据
  formConfig.formData = {} as FormDataType;
  formConfig.readonly = false;
  switch (action) {
    case 'add':
      await initAdd();
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
  message.success('修改成功');
}
/**
 * 增加时提交
 *
 * @param data
 */
async function submitAdd(params: FormDataType) {
  await save(params);
  message.success('新增成功');
}
/** 复制时提交 */
async function submitCopy(params: FormDataType) {
  await save(params);
  message.success('复制成功');
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

defineExpose<FormInstance<FormDataType>>({ init, handleSubmit });
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
  ></VxeForm>
</template>

<style scoped></style>
