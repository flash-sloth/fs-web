<script setup lang="ts">
import { isFunction } from 'xe-utils';
import { isArray, omit } from 'lodash-es';
import { onMounted, ref, watch } from 'vue';
import type { ApiTreeSelectInstance, ApiTreeSelectProps } from './src/types';
defineOptions({
  name: 'ApiTreeSelect',
  inheritAttrs: false
});
const emit = defineEmits(['update:value', 'change']);

const treeData = ref([]);
const aTreeSelectRef = ref();
let isLoadFrist = false;
const props = withDefaults(defineProps<ApiTreeSelectProps>(), {
  immediately: false,
  api: async () => {
    return [];
  },
  params: () => {}
});
const valueInner = ref(props.value);
const loading = ref(false);
async function loadData() {
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    let params = isFunction(props.params) ? props.params() : props.params;
    if (props.beforeload && isFunction(props.beforeload)) {
      params = props.beforeload(params);
    }
    let res = await props.api(params);
    if (props.afterload && isFunction(props.afterload)) {
      res = props.afterload(res);
    }
    isLoadFrist = true;
    treeData.value = res;
  } finally {
    loading.value = false;
  }
}
onMounted(() => {
  const { value, immediately } = props;
  if ((!isArray(value) && value) || (isArray(value) && value.length) || immediately) {
    loadData();
  }
});
watch(
  () => (isFunction(props.params) ? props.params() : props.params),
  () => {
    // 参数变更强制加载
    loading.value = false;
    loadData();
  }
);
watch(
  () => props.value,
  val => {
    valueInner.value = val;
    loadData();
  }
);
watch(
  () => valueInner.value,
  val => {
    emit('update:value', val);
  }
);

// watchEffect(() => {
//   const { value: _v, params: _p } = props;
//   loadData();
//   console.log('watchEffect');
// });

function onFocus() {
  if (!isLoadFrist) {
    loadData();
  }
}
function focus() {
  aTreeSelectRef.value?.focus();
  onFocus();
}
function blur() {
  aTreeSelectRef.value?.blur();
}
defineExpose<ApiTreeSelectInstance>({
  reload: loadData,
  focus,
  blur
});
</script>

<template>
  <ATreeSelect ref="aTreeSelectRef" v-bind="$attrs" v-model="valueInner" :tree-data="treeData" @focus="onFocus">
    <slot></slot>
    <template v-for="item in Object.keys(omit($slots, 'default'))" :key="item" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </ATreeSelect>
</template>
