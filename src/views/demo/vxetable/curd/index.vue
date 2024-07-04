<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeGridConstructor, VxeGridDefines, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { VxeGrid } from 'vxe-table';
import { Modal, message } from 'ant-design-vue';
import { VxeGridProxyEventCode } from '@/enum';
import { defGridConfig } from '@/constants/vxeUiCurdDefConfig';
import { useDmSwitcher } from '@/components/fs/drawer-modal-switcher';
import { deleteBatch, page as queryPage } from '@/api/demo/curd-api';
import type { CurdPageDto } from '@/models/demo/curd-models';
import type { RowVO } from './config/model';
import { columns, searchFormConfig } from './config/curdConfig';
import FormWraper from './config/formWraper.vue';
// 获取表格实例
const xGrid = ref<VxeGridInstance<RowVO>>();
const actionCode = {
  add: 'add',
  deleteBatch: 'deleteBatch'
};
const formRef = ref();
const gridOptions = reactive<VxeGridProps<RowVO>>(
  defGridConfig<RowVO>({
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
        { code: actionCode.add, name: '新增', icon: 'vxe-icon-add' },
        { code: actionCode.deleteBatch, name: '删除', icon: 'vxe-icon-delete' }
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
    model: { ...params.form } as CurdPageDto
  });
}

function onEdit(row: RowVO) {
  formRef.value?.openModal(row);
}

function delRows($grid: VxeGridConstructor<RowVO>) {
  const checkedRows = $grid.getCheckboxRecords();
  if (!checkedRows || checkedRows.length === 0) {
    message.error('请选择要删除的数据');
  } else {
    Modal.confirm({
      title: '系统提示',
      content: '确定删除选中数据吗？',
      onOk: async () => {
        await deleteBatch(checkedRows.map((x: RowVO) => x.id));
        message.success('删除成功');
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
const [dmSwitcherRegister, { show: showForm }] = useDmSwitcher<Partial<RowVO>>();
function toolbarButtonClick({ code, $grid }: VxeGridDefines.ToolbarButtonClickEventParams<RowVO>) {
  if (code === actionCode.deleteBatch) {
    // 删除
    delRows($grid);
  } else if (code === actionCode.add) {
    // 新增
    showForm({ action: 'add', data: {} });
  }
}
</script>

<template>
  <div>
    <VxeGrid ref="xGrid" v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick">
      <template #operate="{ row }">
        <AButton type="primary" @click="onEdit(row)">编辑</AButton>
      </template>
    </VxeGrid>
    <FormWraper ref="formRef" @register="dmSwitcherRegister" @success="reloadData"></FormWraper>
  </div>
</template>
