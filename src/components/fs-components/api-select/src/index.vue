<script setup lang="ts">
import { isFunction } from 'xe-utils';
import { omit } from 'lodash';
import { onMounted, ref } from 'vue';
import type { ApiTreeSelectInstance, ApiTreeSelectProps } from './types';
defineOptions({
  name: 'ApiTreeSelect',
  inheritAttrs: true
});
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
async function loadData() {
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
}
onMounted(() => {
  props.immediately && loadData();
});

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
  <ATreeSelect ref="aTreeSelectRef" v-bind="$props" :tree-data="treeData" @focus="onFocus">
    <slot></slot>
    <template v-for="item in Object.keys(omit($slots, 'default'))" :key="item" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </ATreeSelect>
</template>
