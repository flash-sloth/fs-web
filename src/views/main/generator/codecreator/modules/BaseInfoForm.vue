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
import { getVisileResource } from '@/service/api/auth';
import { getLocalIcons } from '@/utils/icon';
import { updateCodeCreatorInfo } from '@/service/main/generator/codeCreator/api';
import { SimpleScrollbar } from '~/packages/materials/src';
import { useMessage } from '@/hooks/web/useMessage';
async function loadMenu() {
  const res = await getVisileResource();
  const treeData = mapTree(res.routerList, item => {
    return {
      value: item.id,
      label: item.name,
      children: item.children
    };
  });
  return treeData;
}
const activeKey = ref(['1', '2', '3']);
export interface BaseInfoFormInstance {
  setModles: (data: CodeCreatorEidtDto) => void;
  validate: () => CodeCreatorEidtDto;
  save: () => Promise<any>;
}
const { createMessage } = useMessage();
const baseInfoForm = ref<VxeFormInstance>();
const serviceInfoForm = ref<VxeFormInstance>();
const frontInfoForm = ref<VxeFormInstance>();
const formData = ref<CodeCreatorEidtDto>({});
const formLoading = ref(false);

const localIcons = getLocalIcons();
function setModles(data: CodeCreatorEidtDto) {
  formData.value = cloneDeep(data);
}
/** 验证表单，验证成功返回编辑后的表单数据 验证失败抛出错误 */
async function validate() {
  const err1 = await baseInfoForm.value?.validate();
  const err2 = await serviceInfoForm.value?.validate();
  const err3 = await frontInfoForm.value?.validate();
  if (err1 || err2 || err3) {
    createMessage.warning('表单验证失败不能切换');
    throw new Error('表单验证失败');
  }
  return formData.value;
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
defineExpose({
  setModles,
  validate,
  save
});

const baseInfoFormRules = {
  tableName: [{ required: true, message: '请输入表名称' }],
  'packageDesign.author': [{ required: true, message: '请输入作者信息' }],
  tableDescription: [{ required: true, message: '请输入表注释信息' }]
};
const serviceInfoFormRules = {
  'packageDesign.module': [{ required: true, message: '请输入模块包信息' }],
  'packageDesign.basePackage': [{ required: true, message: '请输入基础包信息' }],
  'packageDesign.sourceDir': [{ required: true, message: '请输入生成路径' }]
};
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
            <VxeForm ref="baseInfoForm" :rules="baseInfoFormRules" :data="formData" :loading="formLoading">
              <VxeFormItem field="tableName" title="表名称" title-colon :span="12">
                <template #default>
                  <VxeInput v-model="formData.tableName" disabled placeholder="请输入名称" />
                </template>
              </VxeFormItem>
              <VxeFormItem field="packageDesign.author" title="作者" title-colon :span="12">
                <template v-if="formData.packageDesign" #default>
                  <VxeInput v-model="formData.packageDesign.author" placeholder="请输入作者" />
                </template>
              </VxeFormItem>
              <VxeFormItem field="tableDescription" title="表注释" title-colon :span="24">
                <template #default>
                  <VxeInput v-model="formData.tableDescription" placeholder="请输入表注释信息" />
                </template>
              </VxeFormItem>
            </VxeForm>
          </ACollapsePanel>
          <ACollapsePanel key="2" header="后端信息">
            <VxeForm
              ref="serviceInfoForm"
              :loading="formLoading"
              :rules="serviceInfoFormRules"
              custom-layout
              :data="formData"
            >
              <template v-if="formData.packageDesign">
                <VxeFormItem :span="24"><VxeText status="primary" content="包信息"></VxeText></VxeFormItem>
                <VxeFormItem field="packageDesign.sourceDir" title="生成路径" title-colon :span="12">
                  <template #default>
                    <VxeInput v-model="formData.packageDesign.sourceDir" placeholder="本地代码绝对路径" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="packageDesign.basePackage" title="基础包" title-colon :span="12">
                  <template #default>
                    <VxeInput v-model="formData.packageDesign.basePackage" placeholder="src/main/java目录下的基础包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="packageDesign.module" title="模块包" title-colon :span="12">
                  <template #default>
                    <VxeInput v-model="formData.packageDesign.module" placeholder="基础包.模块包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="subSystemId" title="模块包" title-colon :span="12">
                  <template #default>
                    <VxeSelect v-model="formData.packageDesign.subSystemId" placeholder="选择子系统">
                      <VxeOption :value="1" label="主系统"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="moduleDescription" title="模块描述" title-colon :span="24">
                  <template #default>
                    <VxeTextarea v-model="formData.packageDesign.moduleDescription" placeholder="模块描述" />
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.entityDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="实体类信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.packageName" title="实体类包名" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.entityDesign.packageName" placeholder="基础包.模块包.实体包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.name" title="实体类名" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.entityDesign.name" placeholder="实体类名" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.superClassName" title="父类" title-colon :span="8">
                  <template #default>
                    <VxeSelect v-model="formData.entityDesign.superClassName" placeholder="选择父类">
                      <VxeOption value="SuperEntity" label="SuperEntity"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.withLombok" title="lombok" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.entityDesign.withLombok"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.withChain" title="链式" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.entityDesign.withChain"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.withSwagger" title="Swagger" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.entityDesign.withSwagger"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.withBaseClassEnable" title="Base类" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.entityDesign.withBaseClassEnable"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.alwaysGenColumnAnnotation" title="@Column" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.entityDesign.alwaysGenColumnAnnotation"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.voDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="VO信息（controller出参）"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="entityDesign.packageName" title="VO包" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.voDesign.packageName" placeholder="基础包.模块包.VO包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.classPrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.voDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.classSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.voDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.withLombok" title="lombok" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.voDesign.withLombok"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.withChain" title="链式" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.voDesign.withChain"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.withSwagger" title="Swagger" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.voDesign.withSwagger"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="voDesign.withExcel" title="Excel" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.voDesign.withExcel"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.queryDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="Query信息  （查询类接口入参）"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.packageName" title="Query包" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.queryDesign.packageName" placeholder="基础包.模块包.Query包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.classPrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.queryDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.classSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.queryDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.withLombok" title="lombok" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.queryDesign.withLombok"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.withChain" title="链式" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.queryDesign.withChain"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.withSwagger" title="Swagger" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.queryDesign.withSwagger"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="queryDesign.withExcel" title="Excel" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.queryDesign.withExcel"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.dtoDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="Dto信息   （Controller save和update方法入参）"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.packageName" title="Dto包" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.dtoDesign.packageName" placeholder="基础包.模块包.Dto包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.classPrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.dtoDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.classSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.dtoDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.withLombok" title="lombok" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.dtoDesign.withLombok"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.withChain" title="链式" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.dtoDesign.withChain"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.withSwagger" title="Swagger" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.dtoDesign.withSwagger"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="dtoDesign.withValidator" title="校验" title-colon :span="4">
                  <template #default>
                    <VxeSwitch v-model="formData.dtoDesign.withValidator"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.mapperDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="mapper信息 "></VxeText>
                </VxeFormItem>
                <VxeFormItem field="mapperDesign.packageName" title="mapper包" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.mapperDesign.packageName" placeholder="基础包.模块包.mapper包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="mapperDesign.superClassName" title="父类" title-colon :span="6">
                  <template #default>
                    <VxeSelect v-model="formData.mapperDesign.superClassName" placeholder="选择父类">
                      <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="mapperDesign.classPrefix" title="前缀" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.mapperDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="mapperDesign.classSuffix" title="后缀" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.mapperDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.serviceDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="Service信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="serviceDesign.packageName" title="ServiceImpl包" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.serviceDesign.packageName" placeholder="基础包.模块包.Service包" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceDesign.superClassName" title="父类" title-colon :span="6">
                  <template #default>
                    <VxeSelect v-model="formData.serviceDesign.superClassName" placeholder="选择父类">
                      <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceDesign.classPrefix" title="前缀" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.serviceDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceDesign.classSuffix" title="后缀" title-colon :span="6">
                  <template #default>
                    <VxeInput v-model="formData.serviceDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.serviceImplDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="ServiceImpl信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="serviceImplDesign.packageName" title="ServiceImpl包" title-colon :span="8">
                  <template #default>
                    <VxeInput
                      v-model="formData.serviceImplDesign.packageName"
                      placeholder="基础包.模块包.ServiceImpl包"
                    />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceImplDesign.superClassName" title="父类" title-colon :span="8">
                  <template #default>
                    <VxeSelect v-model="formData.serviceImplDesign.superClassName" placeholder="选择父类">
                      <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceImplDesign.classPrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.serviceImplDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceImplDesign.classSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.serviceImplDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="serviceImplDesign.withCache" title="缓存" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.serviceImplDesign.withCache"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.controllerDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="Controller信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.packageName" title="Controller包" title-colon :span="8">
                  <template #default>
                    <VxeInput
                      v-model="formData.controllerDesign.packageName"
                      placeholder="基础包.模块包.Controller包"
                    />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.superClassName" title="父类" title-colon :span="8">
                  <template #default>
                    <VxeSelect v-model="formData.controllerDesign.superClassName" placeholder="选择父类">
                      <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.classPrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.controllerDesign.classPrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.classSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.controllerDesign.classSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.requestMappingPrefix" title="请求前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput
                      v-model="formData.controllerDesign.requestMappingPrefix"
                      placeholder="@RequestMapping 注解的前缀"
                    />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="controllerDesign.withCrud" title="生成Crud" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.controllerDesign.withCrud"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>
              <template v-if="formData.xmlDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="Xml信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="xmlDesign.path" title="Controller包" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.xmlDesign.path" placeholder="src/main/resources/mapper" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="xmlDesign.filePrefix" title="前缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.xmlDesign.filePrefix" placeholder="前缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="xmlDesign.fileSuffix" title="后缀" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.xmlDesign.fileSuffix" placeholder="后缀" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="xmlDesign.withResultMap" title="ResultMap" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.xmlDesign.withResultMap"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="xmlDesign.withSql" title="字段SQL" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.xmlDesign.withSql"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>
            </VxeForm>
          </ACollapsePanel>
          <ACollapsePanel key="3" header="前端信息">
            <VxeForm
              ref="frontInfoForm"
              :loading="formLoading"
              :rules="serviceInfoFormRules"
              custom-layout
              :data="formData"
            >
              <template v-if="formData.frontDesign">
                <VxeFormItem field="frontDesign.sourceDir" title="生成路径" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.frontDesign.sourceDir" placeholder="代码绝对位置" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="frontDesign.superClassName" title="表单打开方式" title-colon :span="8">
                  <template #default>
                    <VxeSelect v-model="formData.frontDesign.openMode" placeholder="选择表单打开方式">
                      <VxeOption value="modal" label="弹窗"></VxeOption>
                      <VxeOption value="drwaer" label="抽屉"></VxeOption>
                      <VxeOption value="route" label="新页面"></VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="frontDesign.superClassName" title="布局方式" title-colon :span="8">
                  <template #default>
                    <VxeRadioGroup v-model="formData.frontDesign.layout" size="mini" :strict="false">
                      <VxeRadioButton label="1" content="单表"></VxeRadioButton>
                      <VxeRadioButton label="2" content="主从"></VxeRadioButton>
                      <VxeRadioButton label="3" content="树"></VxeRadioButton>
                    </VxeRadioGroup>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="frontDesign.i18n" title="i18n" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.frontDesign.i18n"></VxeSwitch>
                  </template>
                </VxeFormItem>
                <VxeFormItem field="frontDesign.keepAlive" title="keepAlive" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.frontDesign.keepAlive"></VxeSwitch>
                  </template>
                </VxeFormItem>
              </template>

              <template v-if="formData.menuDesign">
                <VxeFormItem :span="24" class="b-t b-t-info-200">
                  <VxeText status="primary" content="菜单信息"></VxeText>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.path" title="自动执行" title-colon :span="8">
                  <template #default>
                    <VxeSwitch v-model="formData.menuDesign.execute"></VxeSwitch>
                    （执行时校验编码是否重复）
                  </template>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.code" title="菜单编码" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.menuDesign.code" readonly placeholder="按照编码自动生成" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.name" title="菜单名称" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.menuDesign.name" readonly placeholder="请输入菜单名称" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.parentId" title="上级菜单" title-colon :span="8">
                  <template #default>
                    <ApiTreeSelect
                      v-model="formData.menuDesign.parentId"
                      style="width: 100%"
                      :api="loadMenu"
                      placeholder="请选择上级菜单"
                      @change="handleChnage"
                    />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.sort" title="排序" title-colon :span="8">
                  <template #default>
                    <VxeInput v-model="formData.menuDesign.sort" placeholder="请输入排序号" />
                  </template>
                </VxeFormItem>
                <VxeFormItem field="menuDesign.sort" title="图标" title-colon :span="8">
                  <template #default>
                    <VxeSelect v-model="formData.menuDesign.icon" placeholder="选择表单打开方式">
                      <VxeOption v-for="item in localIcons" :key="item" :label="item" :value="item">
                        <div class="flex flex-center gap-2">
                          <SvgIcon :local-icon="item" class="text-20px" />
                          {{ item }}
                        </div>
                      </VxeOption>
                    </VxeSelect>
                  </template>
                </VxeFormItem>
              </template>
            </VxeForm>
          </ACollapsePanel>
        </ACollapse>
      </SimpleScrollbar>
    </div>
  </AFlex>
</template>
