<script lang="ts" setup>
import { computed } from 'vue';
import SvgIcon from './SvgIcon.vue';

defineOptions({
  inheritAttrs: false
});
const props = defineProps<{
  name: string;
}>();

const isSvg = (name: string) => {
  return name.startsWith('svg:');
};
const isSvgIcon = computed(() => {
  return isSvg(props.name);
});
const svgName = computed(() => {
  return props.name.replace('svg:', '');
});
</script>

<template>
  <SvgIcon v-if="isSvgIcon" :name="svgName" v-bind="$attrs"></SvgIcon>
  <Icon v-else :icon="name" v-bind="$attrs"></Icon>
</template>
