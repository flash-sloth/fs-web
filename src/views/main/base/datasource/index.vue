<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeGridConstructor, VxeGridDefines, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { VxeGrid } from 'vxe-table';
import { useDmSwitcher } from '@/components/fs/drawer-modal-switcher';
import { defGridConfig } from '@/constants/vxeUiCurdDefConfig';
import { VxeGridProxyEventCode } from '@/enum';
import { useMessage } from '@/hooks/web/useMessage';
import type { DataSource } from '@/service/main/base/datasource/model';
import { deleteBatch, queryPage } from '@/service/main/base/datasource/api';
import { $t } from '@/locales';
import { columns, searchFormConfig } from './data/index';
import FormWraper from './modules/wrapper.vue';
const { createMessage, createConfirm } = useMessage();
// 获取表格实例
const xGrid = ref<VxeGridInstance<DataSource>>();
/** 工具栏操作码 */
const actionCode = {
  add: 'add',
  deleteBatch: 'deleteBatch'
};
const formRef = ref();
const [register, { show: showForm }] = useDmSwitcher<Partial<DataSource>>();
const gridOptions = reactive<VxeGridProps<DataSource>>(
  defGridConfig<DataSource>({
    // 列配置
    columns: columns({
      title: '操作',
      slots: { default: 'operate' }
    }),
    // 搜索表单
    formConfig: searchFormConfig(),

    proxyConfig: {
      ajax: {
        // 接收 Promise
        query: loadData
      }
    },
    toolbarConfig: {
      buttons: [
        { code: actionCode.add, name: $t('common.add'), icon: 'vxe-icon-upload' },
        { code: actionCode.deleteBatch, name: $t('common.batchDelete'), icon: 'vxe-icon-delete' }
      ],
      custom: true
    }
  })
);

/**
 * 加载数据
 *
 * @param params
 */
async function loadData(params: VxeGridPropTypes.ProxyAjaxQueryParams) {
  return await queryPage({
    current: params?.page.currentPage,
    size: params?.page.pageSize,
    model: { ...params.form } as DataSource
  });
}

/**
 * 处理编辑事件
 *
 * @param row
 */
function handleUpdate(row: DataSource) {
  showForm({ action: 'update', data: { ...row } });
}
/** 处理新增事件 */
function handleAdd() {
  showForm({ action: 'add', data: {} });
}
/** 处理复制事件 */
function handleCopy(row: DataSource) {
  showForm({ action: 'copy', data: { ...row } });
}
/** @param row 处理查看事件 */
function handleView(row: DataSource) {
  showForm({ action: 'view', data: { ...row } });
}

function handleRemove($grid: VxeGridConstructor<DataSource>) {
  const checkedRows = $grid.getCheckboxRecords();
  if (!checkedRows || checkedRows.length === 0) {
    createMessage.error('请选择要删除的数据');
  } else {
    createConfirm({
      iconType: 'warning',
      title: '系统提示',
      content: '确定删除选中数据吗？',
      onOk: async () => {
        await deleteBatch(checkedRows.map((x: DataSource) => x.id as number));
        createMessage.success('删除成功');
        await reloadData();
      }
    });
  }
}

/** 重新加载数据 */
async function reloadData() {
  const $grid = xGrid.value;
  if ($grid) {
    $grid.commitProxy(VxeGridProxyEventCode.QUERY);
  }
}

function toolbarButtonClick({ code, $grid }: VxeGridDefines.ToolbarButtonClickEventParams<DataSource>) {
  switch (code) {
    case actionCode.deleteBatch:
      handleRemove($grid);
      break;
    case actionCode.add:
      handleAdd();
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="h-full p-2">
    <VxeGrid ref="xGrid" v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick">
      <template #operate="{ row }">
        <AButton type="link" @click="handleUpdate(row)">编辑</AButton>
        <AButton type="link" @click="handleCopy(row)">复制</AButton>
        <AButton type="link" @click="handleView(row)">查看</AButton>
      </template>
    </VxeGrid>
    <FormWraper ref="formRef" @register="register" @success="reloadData"></FormWraper>
  </div>
</template>
