<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const src = route.query.href as string;
</script>

<template>
  <iframe class="h-full" :src="src"></iframe>
</template>
