<script lang="ts" setup>
import {
  CodeSandboxOutlined,
  DropboxOutlined,
  FileTextOutlined,
  FolderOpenOutlined,
  FolderOutlined
} from '@ant-design/icons-vue';
import { FsGenFileType } from './types';
defineProps<{
  expended: Boolean;
  type: FsGenFileType;
}>();
const Project = FsGenFileType.Project;
const Dir = FsGenFileType.Dir;
const File = FsGenFileType.File;
</script>

<template>
  <DropboxOutlined v-if="type === FsGenFileType.Project && expended"></DropboxOutlined>
  <CodeSandboxOutlined v-if="type === Project && !expended"></CodeSandboxOutlined>
  <FolderOpenOutlined v-if="type === Dir && expended"></FolderOpenOutlined>
  <FolderOutlined v-if="type === Dir && !expended"></FolderOutlined>
  <FileTextOutlined v-if="type === File"></FileTextOutlined>
</template>
