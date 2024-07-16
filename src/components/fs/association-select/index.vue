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
    const echoloader = props.echoLoader || (keys => keys.join(','));
    const loadKeys = selectKey.value.filter(key => !valueMap[key]);
    if (loadKeys.length === 0) {
      return;
    }
    const loaderRes = await echoloader(loadKeys);
    if (loaderRes) {
      Object.assign(valueMap, loaderRes);
    }
  }
  valueEchoStr.value = selectKey.value.map(key => valueMap[key]).join(',');
}
/** @param newSelecteKey 最新的选择的数据 */
function onSelectKeyChange(newSelecteKey: string[]) {
  selectKey.value = newSelecteKey;
  if (props.valueType === 'string') {
    emits('update:value', newSelecteKey.join(','));
  } else {
    emits('update:value', newSelecteKey);
  }
}
watch(() => selectKey.value, loadEchoData);
</script>

<template>
  <div>
    <VxeInput :value="valueEchoStr" :placeholder="placeholder" @click="() => showModal()"></VxeInput>
    <Modal
      :columns="columns"
      :loader="loader"
      :search-form-config="searchFormConfig"
      :params="params"
      :select-key="selectKey"
      :page-config="pageConfig"
      :value-map="valueMap"
      :modal-width="modalWidth"
      @update:select-key="onSelectKeyChange"
      @register="register"
    ></Modal>
  </div>
</template>
