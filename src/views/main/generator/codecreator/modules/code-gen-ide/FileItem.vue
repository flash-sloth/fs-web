<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import XEUtils from 'xe-utils';
import type { RadioChangeEvent } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import FileIcon from './FileIcon.vue';
import type { FsGenFile } from './types';
const { createConfirm } = useMessage();
const props = defineProps<{
  data: FsGenFile;
  treeLevel?: number;
  showSetting: boolean;
  settingMap: Record<string, any>;
  selectedKey: string;
}>();

const expanded = ref(true);
const childrenRef = ref();
const toolLineRef = ref();
const emits = defineEmits(['select', 'settingChange', 'download', 'generate']);

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
  if (!isSelected.value) {
    dispatchClick(props.data);
  } else {
    isSelectedInner.value = !isSelectedInner.value;
  }
}
/** 处理工具标签显示 */
const isHover = ref(false);
let hoverTimer: any = 0;
function toggerHover(flag: boolean) {
  if (props.showSetting) return;
  if (!flag) {
    clearTimeout(hoverTimer);
    isHover.value = false;
  } else {
    hoverTimer = setTimeout(() => {
      isHover.value = true;
    }, 100);
  }
}
/** 点击下载 */
function clickDownload() {
  emits('download', props.data);
}
/** 点击生成 */
function clickGenerate() {
  createConfirm({
    iconType: 'warning',
    title: '是否确定直接生成代码',
    content: '直接生成代码将覆盖本地文件',
    onOk: () => {
      emits('generate', props.data);
    }
  });
}
/** 当设置信息改变时 */
function onConfigChange(value: RadioChangeEvent) {
  const settingMap = {} as any;
  settingMap[props.data.id || ''] = value.target.value;
  if (props.data.children) {
    XEUtils.eachTree(props.data.children, item => {
      settingMap[item.id || ''] = value.target.value;
    });
  }
  dispatchSetting(settingMap);
}
function dispatchSetting(data: any) {
  emits('settingChange', data);
}
function dispatchDownload(data: any) {
  emits('download', data);
}
function dispatchGenerate(data: any) {
  emits('generate', data);
}
</script>

<template>
  <div class="code-gen-ide-file-tree-item">
    <div
      class="title-box"
      :class="{ hover: isHover, setting: showSetting }"
      @mouseleave="toggerHover(false)"
      @mouseenter="toggerHover(true)"
    >
      <div
        class="title"
        @contextmenu.prevent="
          e => {
            console.log(props.data);
          }
        "
      >
        <span :style="{ marginLeft: `${(treeLevel || 0) * 6}px`, display: 'inline-block' }"></span>
        <span @click="togglerChildren()"><FileIcon :expended="expanded" :type="data?.type as any" /></span>
        <span class="title-content ml-1" @click="clickTitle">{{ data?.name }}</span>
        <div ref="toolLineRef" class="tool-line h-0 overflow-hidden">
          <LineButton @click.stop="clickDownload">下载</LineButton>
          <LineButton @click.stop="clickGenerate">生成</LineButton>
        </div>
        <div v-if="showSetting">
          <ARadioGroup :value="settingMap[data?.id || '']" @change="onConfigChange">
            <ARadioButton value="ADD">新增</ARadioButton>
            <ARadioButton value="OVERWRITE">覆盖</ARadioButton>
            <ARadioButton value="IGNORE">忽略</ARadioButton>
            <ARadioButton value="BACKUPS">备份</ARadioButton>
            <ARadioButton value="EXIST_IGNORE">存在时忽略</ARadioButton>
          </ARadioGroup>
        </div>
      </div>
    </div>
    <div v-if="data?.children && data?.children.length" ref="childrenRef" class="children">
      <FileItem
        v-for="(child, index) in data?.children"
        :key="index"
        :show-setting="showSetting"
        :setting-map="settingMap"
        :selected-key="selectedKey"
        :tree-level="(treeLevel || 0) + 1"
        :data="child"
        @setting-change="dispatchSetting"
        @select="dispatchClick"
        @generate="dispatchGenerate"
        @download="dispatchDownload"
      ></FileItem>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dark {
  .code-gen-ide-file-tree-item {
    .title-box {
      &.selected {
        background-color: #ffffff33;
      }
      &:hover {
        background-color: #ffffff33;
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
    overflow: hidden;
    &.setting {
      height: 35px;
    }
    &.selected {
      .tool-line {
        width: 110px;
        padding-right: 5px;
      }
      background-color: rgba(0, 0, 0, 0.22);
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.22);
    }
    &.hover {
      .tool-line {
        width: 70px;
      }
    }
    .tool-line {
      text-align: right;
      width: 0px;
      transition: width 0.1s ease;
      height: 22px;
      overflow: hidden;
      box-shadow: -1px 0px 5px rgba(0, 0, 0, 0.22);
    }
  }
  .children {
    transition: all 0.1s ease;
    overflow: hidden;
  }
}
</style>
