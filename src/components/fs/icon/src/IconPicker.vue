<script lang="ts" setup>
import { ref, unref, watch, watchEffect } from 'vue';
import { Empty, Input, Pagination, Popover } from 'ant-design-vue';
import { useDebounceFn } from '@vueuse/core';
import svgIcons from 'virtual:svg-icons-names';
import { ScrollContainer } from '@/components/fs/container';
import { useDesign } from '@/hooks/web/useDesign';

import { usePagination } from '@/hooks/web/usePagination';
import { useCopyToClipboard } from '@/hooks/web/useCopyToClipboard';
import { useMessage } from '@/hooks/web/useMessage';
import { $t } from '@/locales';
import iconsData from '../data/icons.data';
import SvgIcon from './SvgIcon.vue';
import Icon from './Icon.vue';

interface Props {
  /** 图标值 */
  value?: string;
  /** 宽度 */
  width?: string;
  /** 每页显示数量 */
  pageSize?: number;
  /** 点击时是否自动复制 */
  copy?: boolean;
  /** 图标模式 */
  mode?: 'svg' | 'iconify' | undefined;
  /** 禁用 */
  disabled?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  value: '',
  width: '100%',
  pageSize: 40,
  copy: false,
  spin: false,
  mode: undefined
});

export interface Emits {
  (e: 'change', ev: string): void;
  (e: 'update:value', value: string): void;
}

const emit = defineEmits<Emits>();

// 没有使用别名引入，是因为WebStorm当前版本还不能正确识别，会报unused警告
const AInput = Input;
const APagination = Pagination;
const AEmpty = Empty;

function getIcons() {
  const data = iconsData as any;
  const prefix: string = data?.prefix ?? '';
  let result: string[] = [];
  if (prefix) {
    result = (data?.icons ?? []).map((item: string) => `${prefix}:${item}`);
  } else if (Array.isArray(iconsData)) {
    result = iconsData as string[];
  }
  return result;
}

function getSvgIcons() {
  return svgIcons.map((icon: string) => icon.replace('icon-', ''));
}

function getAllIcons() {
  const localIconList = getIcons();
  const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env;
  const svgIconList = svgIcons.map((icon: string) => icon.replace(`${prefix}-`, 'svg:'));
  return [...localIconList, ...svgIconList];
}

const isSvgMode = props.mode === 'svg';
// const icons = isSvgMode ? getSvgIcons() : getIcons();
// eslint-disable-next-line no-nested-ternary
const icons = props.mode === undefined ? getAllIcons() : isSvgMode ? getSvgIcons() : getIcons();

const currentSelect = ref('');
const visible = ref(false);
const currentList = ref(icons);

const { prefixCls } = useDesign('icon-picker');

const debounceHandleSearchChange = useDebounceFn(handleSearchChange, 100);

let clipboardRef: any = null;
let isSuccessRef: any = null;

if (props.copy) {
  const clipboard = useCopyToClipboard(props.value);
  clipboardRef = clipboard?.clipboardRef;
  isSuccessRef = clipboard?.isSuccessRef;
}

const { createMessage } = useMessage();

const { getPaginationList, getTotal, setCurrentPage } = usePagination(currentList, props.pageSize);

watchEffect(() => {
  currentSelect.value = props.value;
});

watch(
  () => currentSelect.value,
  v => {
    emit('update:value', v);
    return emit('change', v);
  }
);

function handlePageChange(page: number) {
  setCurrentPage(page);
}

function handleClick(icon: string) {
  currentSelect.value = icon;
  if (props.copy) {
    clipboardRef.value = icon;
    if (unref(isSuccessRef)) {
      createMessage.success($t('component.icon.copy'));
    }
  }
  visible.value = false;
}

function handleSearchChange(e: ChangeEvent) {
  const value = e.target.value;
  if (!value) {
    setCurrentPage(1);
    currentList.value = icons;
    return;
  }
  currentList.value = icons.filter((item: string) => item.includes(value));
}

function tirggerHandler() {
  if (props.disabled) {
    visible.value = false;
  } else {
    visible.value = !visible.value;
  }
}
</script>

<template>
  <AInput
    v-model:value="currentSelect"
    disabled
    :style="{ width }"
    :placeholder="$t('component.icon.placeholder')"
    :class="prefixCls"
  >
    <template #addonAfter>
      <Popover :open="visible" placement="bottomLeft" :arrow="false" :overlay-class-name="`${prefixCls}-popover`">
        <template #title>
          <div class="flex justify-between">
            <AInput :placeholder="$t('component.icon.search')" allow-clear @change="debounceHandleSearchChange" />
          </div>
        </template>
        <template #content>
          <div v-if="getPaginationList.length" class="w-120">
            <ScrollContainer class="border border-t-0 border-solid">
              <ul class="flex flex-wrap px-2">
                <li
                  v-for="icon in getPaginationList"
                  :key="icon"
                  :class="currentSelect === icon ? 'border border-primary' : ''"
                  class="w-1/8 flex cursor-pointer items-center justify-center gap-1 border border-solid p-2 hover:border-primary"
                  :title="icon"
                  @click="handleClick(icon)"
                >
                  <!-- <Icon :icon="icon" :prefix="prefix" /> -->
                  <SvgIcon v-if="isSvgMode" :name="icon" />
                  <Icon v-else :icon="icon" />
                </li>
              </ul>
            </ScrollContainer>
            <div v-if="getTotal >= pageSize" class="flex items-center justify-center py-2">
              <APagination
                show-less-items
                size="small"
                :show-size-changer="false"
                :page-size="pageSize"
                :total="getTotal"
                @change="handlePageChange"
              />
            </div>
          </div>
          <template v-else>
            <div class="p-5"><AEmpty /></div>
          </template>
        </template>

        <span
          v-if="isSvgMode && currentSelect"
          class="flex cursor-pointer items-center px-2 py-1"
          @click="tirggerHandler"
        >
          <SvgIcon :name="currentSelect" />
        </span>
        <span v-else class="cursor-pointer px-2 py-1" @click="tirggerHandler">
          <Icon :icon="currentSelect || 'ion:apps-outline'" />
        </span>
      </Popover>
    </template>
  </AInput>
</template>

<style lang="scss">
$prefix-cls: $namespace + '-icon-picker';

.#{$prefix-cls} {
  .ant-input-group-addon {
    padding: 0;
  }

  &-popover {
    width: 300px;

    .ant-popover-inner-content {
      padding: 0;
    }

    .scrollbar {
      height: 220px;
    }
  }
}
</style>
