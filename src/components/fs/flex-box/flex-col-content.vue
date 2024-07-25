<script lang="ts" setup>
import { SimpleScrollbar } from '~/packages/materials/src';
</script>

<template>
  <div class="h-full flex-col">
    <slot name="header"></slot>
    <div class="h-1 flex-1">
      <SimpleScrollbar>
        <slot></slot>
      </SimpleScrollbar>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
