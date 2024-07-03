<script setup lang="ts">
import { ref } from 'vue';
import { type VxeFormInstance } from 'vxe-table';
import {
  VxeForm,
  VxeFormItem,
  VxeOption,
  VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  VxeSwitch,
  VxeText,
  VxeTextarea
} from 'vxe-pc-ui';
import { cloneDeep } from 'lodash-es';
import { mapTree } from 'xe-utils';
import type { CodeCreatorEidtDto } from '@/service/main/generator/codeCreator/model';
import ApiTreeSelect from '@/components/fs-components/api-tree-select/index.vue';

import { getLocalIcons } from '@/utils/icon';
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
const activeKey = ref(['1', '2', '3']);
const formRef = ref<ConfigFormInstance[]>();
export interface BaseInfoFormInstance {
  setModles: (data: CodeCreatorEidtDto) => void;
  validate: () => CodeCreatorEidtDto;
  save: () => Promise<any>;
}
const { createMessage } = useMessage();
const formData = ref<CodeCreatorEidtDto>({});
const formLoading = ref(false);

function setModles(data: CodeCreatorEidtDto) {
  formData.value = cloneDeep(data);
}
/** 验证表单，验证成功返回编辑后的表单数据 验证失败抛出错误 */
async function validate(): Promise<CodeCreatorEidtDto> {
  let flag = false;
  const res: CodeCreatorEidtDto = {};
  formRef.value?.forEach(async item => {
    const data = await item.validate();
    if (data === null) {
      flag = true;
    } else {
      Object.assign(res, data);
    }
  });
  if (flag) {
    throw new Error('表单验证失败');
  }
  return res;
}

async function save() {
  try {
    formLoading.value = true;
    const res = await updateCodeCreatorInfo(await validate());
    createMessage.success('保存成功');
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
            <BaseConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
          <ACollapsePanel key="2" header="后端信息">
            <PackageConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <EntityConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <VoConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <QueryConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <DtoConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <MapperConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <ServiceConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <ServiceImplConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <ControllerConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
            <XmlConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
          <ACollapsePanel key="3" header="前端信息">
            <FrontConfigInfo ref="formRef" :config-data="formData" :loading="formLoading" />
          </ACollapsePanel>
        </ACollapse>
      </SimpleScrollbar>
    </div>
  </AFlex>
</template>
