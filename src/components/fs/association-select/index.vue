<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { isString } from 'xe-utils';
import { VxeInput } from 'vxe-pc-ui';
import { FsAModal, useDmSwitcher } from '@/components/fs/drawer-modal-switcher';
import type { AssociationSelectCloumns, AssociationSelectProps } from './src/typing';
import Modal from './src/modal.vue';
const emits = defineEmits(['update:value']);
const props = withDefaults(defineProps<AssociationSelectProps>(), {
  placeholder: '请选择',
  valueType: 'string',
  modalWidth: 900,
  valueFiled: 'id',
  labelFiled: 'name',
  pageConfig: () => {
    return {
      enabled: true,
      getData: 'records',
      getTotal: 'totalRow'
    };
  },
  columns: () => {
    return [];
  },
  searchFormConfig: () => {
    return [];
  },
  loader: () => {
    return Promise.resolve([]);
  }
});
const selectKey = ref<string[]>([]);
const valueMap = reactive<{ [key: string]: any }>({});
const valueEchoStr = ref('');
const [register, { show: showModal }] = useDmSwitcher();
function setSelectFromValue() {
  if (props.value) {
    if (isString(props.value)) {
      selectKey.value = props.value.split(',');
    } else {
      selectKey.value = props.value;
    }
  } else {
    selectKey.value = [];
  }
}

watch(() => props.value, setSelectFromValue);
async function loadEchoData() {
  if (selectKey.value && selectKey.value.length > 0) {
    const echoloader = props.echoLoader || (keys => keys);
    const loadKeys = selectKey.value.filter(key => !valueMap[key]);
    if (loadKeys.length !== 0) {
      const loaderRes = await echoloader(loadKeys);
      if (loaderRes) {
        loaderRes.forEach(item => {
          if (isString(item)) {
            valueMap[item] = item;
          } else {
            valueMap[item[props.valueFiled]] = item;
          }
        });
      }
    }
  }
  resValueValueEchoStr();
}
function resValueValueEchoStr() {
  const str = selectKey.value
    .map(key => {
      if (valueMap[key]) {
        if (isString(valueMap[key])) {
          return valueMap[key];
        }
        return valueMap[key][props.labelFiled];
      }
      return key;
    })
    .join(',');
  valueEchoStr.value = str;
}

/** @param newSelecteKey 最新的选择的数据 */
function onSelectKeyChange(selectRocord: any[]) {
  const newSelecteKey = selectRocord.map(item => {
    if (isString(item)) {
      valueMap[item] = item;
      return item;
    }
    valueMap[item[props.valueFiled]] = item;
    return item[props.valueFiled];
  });
  if (props.valueType === 'string') {
    emits('update:value', newSelecteKey.join(','));
  } else {
    emits('update:value', newSelecteKey);
  }
}
watch(() => selectKey.value, loadEchoData);
loadEchoData();
</script>

<template>
  <div>
    <VxeInput :model-value="valueEchoStr" type="text" :placeholder="placeholder" @click="() => showModal()"></VxeInput>
    <Modal
      :columns="columns"
      :loader="loader"
      :search-form-config="searchFormConfig"
      :params="params"
      :select-key="selectKey"
      :page-config="pageConfig"
      :value-map="valueMap"
      :modal-width="modalWidth"
      @on-ok="onSelectKeyChange"
      @register="register"
    ></Modal>
  </div>
</template>
