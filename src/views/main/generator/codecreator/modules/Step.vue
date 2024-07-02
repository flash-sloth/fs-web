<script lang="ts" setup>
import { defineOptions } from 'vue';
defineOptions({
  inheritAttrs: false
});
</script>

<template>
  <div class="b-b b-b-coolgray p-2">
    <ASteps
      v-bind="$attrs"
      size="small"
      :items="[
        {
          title: '基础信息'
        },
        {
          title: '界面设计'
        },
        {
          title: '表单设计',
          disabled: true,
          status: 'wait'
        },
        {
          title: '列表设计',
          disabled: true,
          status: 'wait'
        },
        {
          title: '代码预览/生成'
        }
      ]"
    ></ASteps>
  </div>
</template>

<div>

</div>
