<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue';
import { Dropdown, InputSearch, Menu, MenuDivider, MenuItem } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import type { MenuInfo } from 'ant-design-vue/es/menu/src/interface';
import { Icon } from '@/components/fs/icon';
import { BasicTitle } from '@/components/fs/basic';
import { createBEM } from '@/utils/bem';
import { $t } from '@/locales';
import { ToolbarEnum } from '../types/tree';

const searchValue = ref('');

const [bem] = createBEM('tree-header');

interface Props {
  helpMessage?: string | string[];
  title?: string;
  toolbar?: boolean;
  checkable?: boolean;
  search?: boolean;
  searchText?: string;
  toolbarStrictly?: boolean;
  checkAll?: Function;
  expandAll?: Function;
}

interface Emits {
  (e: 'strictlyChange', flag: boolean): void;
  (e: 'search', value?: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  helpMessage: '',
  title: '',
  toolbar: false,
  checkable: false,
  search: false,
  searchText: '',
  checkAll: undefined,
  expandAll: undefined,
  // 工具栏是否显示 层级关联
  toolbarStrictly: true
});
const emit = defineEmits<Emits>();

const slots = useSlots();

const getInputSearchCls = computed(() => {
  const titleExists = slots.headerTitle || props.title;
  return [
    'mr-1',
    'w-full',
    {
      'ml-5': titleExists
    }
  ];
});

const toolbarList = computed(() => {
  const { checkable, toolbarStrictly } = props;
  const defaultToolbarList = [
    { label: $t('component.tree.expandAll'), value: ToolbarEnum.EXPAND_ALL },
    {
      label: $t('component.tree.unExpandAll'),
      value: ToolbarEnum.UN_EXPAND_ALL,
      divider: checkable
    }
  ];

  const strictlyList = toolbarStrictly
    ? [
        { label: $t('component.tree.checkStrictly'), value: ToolbarEnum.CHECK_STRICTLY },
        { label: $t('component.tree.checkUnStrictly'), value: ToolbarEnum.CHECK_UN_STRICTLY }
      ]
    : [];

  return checkable
    ? [
        { label: $t('component.tree.selectAll'), value: ToolbarEnum.SELECT_ALL },
        {
          label: $t('component.tree.unSelectAll'),
          value: ToolbarEnum.UN_SELECT_ALL,
          divider: checkable
        },
        ...defaultToolbarList,
        ...strictlyList
      ]
    : defaultToolbarList;
});

function handleMenuClick({ key }: MenuInfo) {
  switch (key) {
    case ToolbarEnum.SELECT_ALL:
      props.checkAll?.(true);
      break;
    case ToolbarEnum.UN_SELECT_ALL:
      props.checkAll?.(false);
      break;
    case ToolbarEnum.EXPAND_ALL:
      props.expandAll?.(true);
      break;
    case ToolbarEnum.UN_EXPAND_ALL:
      props.expandAll?.(false);
      break;
    case ToolbarEnum.CHECK_STRICTLY:
      emit('strictlyChange', false);
      break;
    case ToolbarEnum.CHECK_UN_STRICTLY:
      emit('strictlyChange', true);
      break;
    default:
      break;
  }
}

function emitChange(value?: string): void {
  emit('search', value);
}

const debounceEmitChange = useDebounceFn(emitChange, 200);

watch(
  () => searchValue.value,
  v => {
    debounceEmitChange(v);
  }
);

watch(
  () => props.searchText,
  v => {
    if (v !== searchValue.value) {
      searchValue.value = v;
    }
  }
);
</script>

<template>
  <div :class="bem()" class="flex items-center px-2 py-1.5">
    <slot v-if="slots.headerTitle" name="headerTitle"></slot>
    <BasicTitle v-if="!slots.headerTitle && title" :help-message="helpMessage">
      {{ title }}
    </BasicTitle>
    <div v-if="search || toolbar" class="flex flex-1 cursor-pointer items-center justify-self-stretch">
      <div v-if="search" :class="getInputSearchCls">
        <InputSearch v-model:value="searchValue" :placeholder="$t('common.searchText')" size="small" allow-clear />
      </div>
      <Dropdown v-if="toolbar" @click.prevent>
        <Icon icon="ion:ellipsis-vertical" />
        <template #overlay>
          <Menu @click="handleMenuClick">
            <template v-for="item in toolbarList" :key="item.value">
              <MenuItem v-bind="{ key: item.value }">
                {{ item.label }}
              </MenuItem>
              <MenuDivider v-if="item.divider" />
            </template>
          </Menu>
        </template>
      </Dropdown>
    </div>
  </div>
</template>
