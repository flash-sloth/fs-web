<script setup lang="ts">
import { ref } from 'vue';
import { type VxeFormInstance } from 'vxe-table';
import { VxeForm, VxeFormItem, VxeOption, VxeSelect, VxeSwitch, VxeText, VxeTextarea } from 'vxe-pc-ui';
import { cloneDeep } from 'lodash-es';
import type { CodeCreatorEidtDto } from '@/service/model/main/codeCreator';
const activeKey = ref(['1', '2', '3']);
export interface BaseInfoFormInstance {
  setModles: (data: CodeCreatorEidtDto) => void;
  vilidate: () => CodeCreatorEidtDto;
}

const baseInfoForm = ref<VxeFormInstance>();
const serviceInfoForm = ref<VxeFormInstance>();
const fontInfoForm = ref<VxeFormInstance>();
const formData = ref<CodeCreatorEidtDto>({});

function setModles(data: CodeCreatorEidtDto) {
  formData.value = cloneDeep(data);
}
/** 验证表单，验证成功返回编辑后的表单数据 验证失败抛出错误 */
function vilidate() {
  return formData.value;
}
defineExpose({
  setModles,
  vilidate
});

const baseInfoFormRules = {
  tableName: [{ required: true, message: '请输入表名称' }],
  author: [{ required: true, message: '请输入作者信息' }],
  tableDescription: [{ required: true, message: '请输入表注释信息' }]
};
const serviceInfoFormRules = {
  module: [{ required: true, message: '请输入模块包信息' }],
  basePackage: [{ required: true, message: '请输入基础包信息' }],
  sourceDir: [{ required: true, message: '请输入生成路径' }]
};
</script>

<template>
  <ACollapse v-model:active-key="activeKey">
    <ACollapsePanel key="1" header="基础信息">
      <VxeForm ref="baseInfoForm" :rules="baseInfoFormRules" :data="formData">
        <VxeFormItem field="tableName" title="表名称" title-colon :span="12">
          <template #default>
            <VxeInput v-model="formData.tableName" disabled placeholder="请输入名称" />
          </template>
        </VxeFormItem>
        <VxeFormItem field="author" title="作者" title-colon :span="12">
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
      <VxeForm ref="serviceInfoForm" :rules="serviceInfoFormRules" custom-layout :data="formData">
        <template v-if="formData.packageDesign">
          <VxeFormItem :span="24"><VxeText status="primary" content="包信息"></VxeText></VxeFormItem>
          <VxeFormItem field="sourceDir" title="生成路径" title-colon :span="12">
            <template #default>
              <VxeInput v-model="formData.packageDesign.sourceDir" placeholder="本地代码绝对路径" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="basePackage" title="基础包" title-colon :span="12">
            <template #default>
              <VxeInput v-model="formData.packageDesign.basePackage" placeholder="src/main/java目录下的基础包" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="module" title="模块包" title-colon :span="12">
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
          <VxeFormItem :span="24"><VxeText status="primary" content="实体类信息"></VxeText></VxeFormItem>
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
          <VxeFormItem :span="24"><VxeText status="primary" content="VO信息（controller出参）"></VxeText></VxeFormItem>
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
          <VxeFormItem :span="24">
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
          <VxeFormItem :span="24">
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
          <VxeFormItem :span="24">
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
          <VxeFormItem :span="24">
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
          <VxeFormItem :span="24">
            <VxeText status="primary" content="ServiceImpl信息"></VxeText>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.packageName" title="ServiceImpl包" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.serviceImplDesign.packageName" placeholder="基础包.模块包.ServiceImpl包" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.superClassName" title="父类" title-colon :span="6">
            <template #default>
              <VxeSelect v-model="formData.serviceImplDesign.superClassName" placeholder="选择父类">
                <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
              </VxeSelect>
            </template>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.classPrefix" title="前缀" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.serviceImplDesign.classPrefix" placeholder="前缀" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.classSuffix" title="后缀" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.serviceImplDesign.classSuffix" placeholder="后缀" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.withLombok" title="lombok" title-colon :span="6">
            <template #default>
              <VxeSwitch v-model="formData.serviceImplDesign.withLombok"></VxeSwitch>
            </template>
          </VxeFormItem>
          <VxeFormItem field="serviceImplDesign.withCache" title="缓存" title-colon :span="6">
            <template #default>
              <VxeSwitch v-model="formData.serviceImplDesign.withCache"></VxeSwitch>
            </template>
          </VxeFormItem>
        </template>

        <template v-if="formData.controllerDesign">
          <VxeFormItem :span="24">
            <VxeText status="primary" content="Controller信息"></VxeText>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.packageName" title="Controller包" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.controllerDesign.packageName" placeholder="基础包.模块包.Controller包" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.superClassName" title="父类" title-colon :span="6">
            <template #default>
              <VxeSelect v-model="formData.controllerDesign.superClassName" placeholder="选择父类">
                <VxeOption value="SuperMapper" label="SuperMapper"></VxeOption>
              </VxeSelect>
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.classPrefix" title="前缀" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.controllerDesign.classPrefix" placeholder="前缀" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.classSuffix" title="后缀" title-colon :span="6">
            <template #default>
              <VxeInput v-model="formData.controllerDesign.classSuffix" placeholder="后缀" />
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.requestMappingPrefix" title="请求前缀" title-colon :span="6">
            <template #default>
              <VxeInput
                v-model="formData.controllerDesign.requestMappingPrefix"
                placeholder="@RequestMapping 注解的前缀"
              />
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.withLombok" title="lombok" title-colon :span="6">
            <template #default>
              <VxeSwitch v-model="formData.controllerDesign.withLombok"></VxeSwitch>
            </template>
          </VxeFormItem>
          <VxeFormItem field="controllerDesign.withCrud" title="生成Crud" title-colon :span="6">
            <template #default>
              <VxeSwitch v-model="formData.controllerDesign.withCrud"></VxeSwitch>
            </template>
          </VxeFormItem>
        </template>
        <template v-if="formData.xmlDesign">
          <VxeFormItem :span="24">
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
      <VxeForm ref="fontInfoForm" :data="{}" :rules="{}" :items="[]" />
    </ACollapsePanel>
  </ACollapse>
</template>
