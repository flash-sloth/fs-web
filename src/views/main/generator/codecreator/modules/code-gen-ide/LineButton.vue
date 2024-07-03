<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
withDefaults(
  defineProps<{
    padding?: boolean;
  }>(),
  {
    padding: false
  }
);
</script>

<template>
  <span class="code-gen-ide-line-button" :class="{ 'code-gen-ide-line-button-padding': padding }"><slot></slot></span>
</template>

<style lang="scss">
.dark {
  .code-gen-ide-line-button {
    color: #cdcdcd;
    &:hover {
      color: #ddd;
      background-color: #ffffff11;
    }
  }
}
.code-gen-ide-line-button {
  color: blueviolet;
  display: inline-block;
  margin-right: 5px;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: blue;
    background-color: #43434343;
    border-radius: 3px;
  }
  &:active {
    background-color: #43434333;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  }
  &.code-gen-ide-line-button-padding {
    padding: 0 5px;
  }
}
</style>
