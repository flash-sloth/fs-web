<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import type { VxeFormPropTypes, VxeGrid, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { useLoading } from '@sa/hooks';
import { isString } from 'xe-utils';
import { FsAModal, useDmSwitcherInner } from '@/components/fs/drawer-modal-switcher';
import { defGridConfig } from '@/constants/vxeUiCurdDefConfig';
import { VxeGridProxyEventCode } from '@/enum';
import type { LoaderFunction, pageConfig as pageConfigType } from './typing';

const [register, { close }] = useDmSwitcherInner(() => {
  reloadData();
});
const xGrid = ref<VxeGridInstance>();
const props = defineProps<{
  params?: { [key: string]: any };
  pageConfig: pageConfigType;
  loader: LoaderFunction;
  columns: VxeGridPropTypes.Columns;
  /** 搜索表单配置 */
  searchFormConfig?: VxeFormPropTypes.Items;
  /** 弹窗宽度 */
  modalWidth: number;
}>();
const searchForm = reactive<{
  data: VxeFormPropTypes.Data;
  items: VxeFormPropTypes.Items;
}>({
  data: {},
  items: props.searchFormConfig || []
});
/** 重新加载数据 */
async function reloadData() {
  const $grid = xGrid.value;
  if ($grid) {
    $grid.commitProxy(VxeGridProxyEventCode.QUERY);
  }
}
const gridOptions = reactive<VxeGridProps>(
  defGridConfig({
    // 列配置
    columns: [{ type: 'checkbox', width: 50 }, { type: 'seq', width: 60 }, ...props.columns],
    formConfig: searchForm,
    pagerConfig: {
      enabled: props.pageConfig.enabled
    },
    proxyConfig: {
      ajax: {
        // 接收 Promise
        query: async ({ form }) => {
          const params = { ...(props.params || {}), ...form };
          if (props.loader) {
            const res = await props.loader(params);
            if (props.pageConfig.enabled) {
              return {
                records: isString(props.pageConfig.getData)
                  ? res[props.pageConfig.getData]
                  : props.pageConfig.getData(res),
                totalRow: isString(props.pageConfig.getTotal)
                  ? res[props.pageConfig.getTotal]
                  : props.pageConfig.getTotal(res)
              };
            }
            return res;
          }
          if (props.pageConfig.enabled) {
            return {
              records: [],
              totalRow: 0
            };
          }
          return [];
        }
      }
    }
  })
);
// watch(
//   () => props.params,
//   () => {
//     reloadData();
//   }
// );
</script>

<template>
  <FsAModal
    is="VxeModal"
    show-footer
    position="top"
    ok-text="确定"
    show-zoom
    title="选择"
    :width="modalWidth"
    @register="register"
  >
    <VxeGrid v-bind="gridOptions" ref="xGrid"></VxeGrid>
  </FsAModal>
</template>

<style scoped></style>
