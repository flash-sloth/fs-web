<script lang="ts" setup>
import { computed, defineEmits, defineProps, nextTick, ref, watch } from 'vue';
import FileIcon from './FileIcon.vue';
import type { FsGenFile } from './types';
const props = defineProps<{
  data: FsGenFile;
  hasLine?: Boolean;
  treeLevel?: number;
  selectedKey: string;
}>();

const expanded = ref(true);
const childrenRef = ref();
const toolLineRef = ref();
const emits = defineEmits(['select']);

function dispatchClick(data: FsGenFile) {
  emits('select', data);
}

const isSelected = computed(() => {
  return props.selectedKey === props.data.id;
});
const isSelectedInner = ref(false);
watch(
  () => isSelected.value,
  val => {
    isSelectedInner.value = val;
  }
);

/** 切换children显示 */
function togglerChildren() {
  expanded.value = !expanded.value;
  if (childrenRef.value) {
    if (expanded.value) {
      childrenRef.value.style.height = 'auto';
      const clientHeight = childrenRef.value.clientHeight;
      childrenRef.value.style.height = `${clientHeight}px`;
      nextTick(() => {
        childrenRef.value.style.height = `auto`;
      });
    } else {
      const clientHeight = childrenRef.value.clientHeight;
      childrenRef.value.style.height = `${clientHeight}px`;
      nextTick(() => {
        childrenRef.value.style.height = '0px';
      });
    }
  }
}
/** 点击标题 */
function clickTitle() {
  debugger;
  if (!isSelected.value) {
    dispatchClick(props.data);
  } else {
    console.log('内部切换');
    isSelectedInner.value = !isSelectedInner.value;
  }
}
</script>

<template>
  <div class="code-gen-ide-file-tree-item">
    <div class="title-box" :class="{ selected: isSelectedInner }">
      <div class="title">
        <span :style="{ marginLeft: `${(treeLevel || 0) * 6}px`, display: 'inline-block' }"></span>
        <span v-if="hasLine">|--</span>
        <span @click="togglerChildren()"><FileIcon :expended="expanded" :type="data?.type as any" /></span>
        <span class="title-content ml-1" @click="clickTitle">{{ data?.name }}</span>
      </div>
      <div ref="toolLineRef" class="tool-line h-0 overflow-hidden" @click="clickTitle">
        <span
          @click.stop="
            () => {
              console.log('行内工具');
            }
          "
        >
          行内工具
        </span>
      </div>
    </div>
    <div v-if="data?.children && data?.children.length" ref="childrenRef" class="children">
      <FileItem
        v-for="(child, index) in data?.children"
        :key="index"
        :selected-key="selectedKey"
        :tree-level="(treeLevel || 0) + 1"
        :data="child"
        :has-line
        @select="dispatchClick"
      ></FileItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark {
  .code-gen-ide-file-tree-item {
    .title-box {
      &.selected {
        .tool-line {
          width: 100%;
          background-color: #ffffff33;
        }
      }
    }
  }
}
.code-gen-ide-file-tree-item {
  .title {
    cursor: pointer;
    display: flex;
    user-select: none;
    &:hover {
      text-decoration: underline;
    }
    .title-content {
      flex: 1;
      width: 1px;
      white-space: nowrap; /* 确保文本在一行中显示 */
      overflow: hidden; /* 隐藏超出容器的部分文本 */
      text-overflow: ellipsis; /* 使用省略号显示被截断的文本 */
    }
  }
  .title-box {
    position: relative;
    height: 22px;
    &.selected {
      .tool-line {
        width: 100%;
        padding-right: 5px;
        background-color: rgba(0, 0, 0, 0.22);
      }
    }
    .tool-line {
      color: #c678dd;
      position: absolute;
      text-align: right;
      bottom: 0;
      border-radius: 3px;

      height: 100%;
      top: 0;
      overflow: hidden;
      right: 0;
      width: 0px;
      transition: width 0.2s ease;
    }
  }
  .children {
    transition: all 0.1s ease;
    overflow: hidden;
  }
}
</style>
