<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { cloneDeep } from 'lodash-es';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import { list as listBaseClass } from '@/service/main/generator/codeBaseClass/api';
import { type CodeBaseClass } from '@/service/main/generator/codeBaseClass/model';
import { updateCodeCreatorInfo } from '@/service/main/generator/codeCreator/api';
import { SimpleScrollbar } from '~/packages/materials/src';
import { useMessage } from '@/hooks/web/useMessage';
import BaseConfigInfo from './config-forms/BaseConfigInfo.vue';
import type { ConfigFormInstance } from './config-forms/types';
import PackageConfigInfo from './config-forms/PackageConfigInfo.vue';
import EntityConfigInfo from './config-forms/EntityConfigInfo.vue';
import VoConfigInfo from './config-forms/VoConfigInfo.vue';
import QueryConfigInfo from './config-forms/QueryConfigInfo.vue';
import DtoConfigInfo from './config-forms/DtoConfigInfo.vue';
import MapperConfigInfo from './config-forms/MapperConfigInfo.vue';
import ServiceConfigInfo from './config-forms/ServiceConfigInfo.vue';
import ServiceImplConfigInfo from './config-forms/ServiceImplConfigInfo.vue';
import ControllerConfigInfo from './config-forms/ControllerConfigInfo.vue';
import XmlConfigInfo from './config-forms/XmlConfigInfo.vue';
import FrontConfigInfo from './config-forms/FrontConfigInfo.vue';
/** 基类类型,可用值:ENTITY,VO,MAPPER,SERVICE,CONTROLLER */
enum CodeBaseClassTypeEnum {
  ENTITY = 'ENTITY',
  MAPPER = 'MAPPER',
  SERVICE = 'SERVICE',
  CONTROLLER = 'CONTROLLER',
  VO = 'VO',
  QUERY = 'QUERY',
  SERVICE_IMPL = 'SERVICE_IMPL',
  DTO = 'DTO'
}
const activeKey = ref(['1', '2', '3']);
const formRef = ref<ConfigFormInstance[]>([]);
const emits = defineEmits(['success']);
export interface BaseInfoFormInstance {
  setModles: (data: CodeCreatorEidtDto) => void;
  validate: () => CodeCreatorEidtDto;
  save: () => Promise<any>;
}
const { createMessage } = useMessage();
const formData = ref<CodeCreatorEidtDto>({});
const formLoading = ref(false);

function bindFromRef(refEl: any) {
  formRef.value.push(refEl);
}
const baseClassList = ref<CodeBaseClass[]>([]);
function initBaseClass() {
  listBaseClass({}).then(res => {
    baseClassList.value = res;
  });
}
function setModles(data: CodeCreatorEidtDto) {
  formData.value = cloneDeep(data);
}
/** 验证表单，验证成功返回编辑后的表单数据 验证失败抛出错误 */
async function validate(): Promise<CodeCreatorEidtDto> {
  let flag = false;
  let res: CodeCreatorEidtDto = { id: formData.value.id };
  const promises = formRef.value.map(item => item.validate()); // 生成一个包含所有验证操作的Promise数组
  const results = await Promise.all(promises);
  results.forEach(data => {
    if (data === null) {
      flag = true;
    } else {
      res = { ...res, ...data };
    }
  });
  if (flag) {
    throw new Error('表单验证失败');
  }
  return res;
}
onMounted(() => {
  initBaseClass();
});
async function save() {
  try {
    formLoading.value = true;
    const params = await validate();
    const res = await updateCodeCreatorInfo(params);
    createMessage.success('保存成功');
    emits('success');
    return res;
  } finally {
    formLoading.value = false;
  }
}

function hasChange() {
  let flag = false;
  formRef.value?.forEach(item => {
    if (item.hasChange()) {
      flag = true;
    }
  });
  return flag;
}
function filteBaseClassList(type: CodeBaseClassTypeEnum) {
  return baseClassList.value.filter(item => item.classType === type);
}
defineExpose({
  setModles,
  validate,
  hasChange,
  save
});
</script>

<template>
  <AFlex vertical class="h-full">
    <div class="mb-1 p-1 text-right" style="box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3)">
      <AButton type="primary" :loading="formLoading" @click="save">保存</AButton>
    </div>
    <div class="h1 flex-1">
      <SimpleScrollbar>
        <ACollapse v-model:active-key="activeKey">
          <ACollapsePanel key="1" header="基础信息">
            <BaseConfigInfo :ref="bindFromRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
          <ACollapsePanel key="2" header="后端信息">
            <PackageConfigInfo :ref="bindFromRef" :config-data="formData" :loading="formLoading" />
            <EntityConfigInfo
              :ref="bindFromRef"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.ENTITY)"
              :config-data="formData"
              :loading="formLoading"
            />
            <VoConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.VO)"
            />
            <QueryConfigInfo
              :ref="bindFromRef"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.QUERY)"
              :config-data="formData"
              :loading="formLoading"
            />
            <DtoConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.DTO)"
            />
            <MapperConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.MAPPER)"
            />
            <ServiceConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.SERVICE)"
            />
            <ServiceImplConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.SERVICE_IMPL)"
            />
            <ControllerConfigInfo
              :ref="bindFromRef"
              :config-data="formData"
              :loading="formLoading"
              :base-class-list="filteBaseClassList(CodeBaseClassTypeEnum.CONTROLLER)"
            />
            <XmlConfigInfo :ref="bindFromRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
          <ACollapsePanel key="3" header="前端信息">
            <FrontConfigInfo :ref="bindFromRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
        </ACollapse>
      </SimpleScrollbar>
    </div>
  </AFlex>
</template>
