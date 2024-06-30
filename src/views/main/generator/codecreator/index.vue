<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeGridConstructor, VxeGridDefines, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { VxeGrid } from 'vxe-table';
import { Modal, message } from 'ant-design-vue';
import { useRouter } from 'vue-router';
import { VxeGridProxyEventCode } from '@/enum';
import { defGridConfig } from '@/constants/vxeUiCurdDefConfig';
import { useDmSwitcher } from '@/components/fs-components/drawer-modal-switcher';
import type { CodeCreator, CodeCreatorPageDto } from '@/service/main/generator/codeCreator/model';
import { deleteBatch, queryPage } from '@/service/main/generator/codeCreator/api';
import ImportModal from './moudules/ImportModal.vue';
import { columns, searchFormConfig } from './data/index';
// 获取表格实例
const xGrid = ref<VxeGridInstance<CodeCreator>>();
const actionCode = {
  add: 'add',
  deleteBatch: 'deleteBatch'
};
const gridOptions = reactive<VxeGridProps<CodeCreator>>(
  defGridConfig<CodeCreator>({
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
        { code: actionCode.add, name: '导入', icon: 'vxe-icon-upload' },
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
    model: { ...params.form } as CodeCreatorPageDto
  });
}
const router = useRouter();
function onEdit(row: CodeCreator) {
  router.push({
    path: `./codecreator/edit/${row.id}`
  });
}

function delRows($grid: VxeGridConstructor<CodeCreator>) {
  const checkedRows = $grid.getCheckboxRecords();
  if (!checkedRows || checkedRows.length === 0) {
    message.error('请选择要删除的数据');
  } else {
    Modal.confirm({
      title: '系统提示',
      content: '确定删除选中数据吗？',
      onOk: async () => {
        await deleteBatch(checkedRows.map((x: CodeCreator) => x.id));
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
const [importModalRegister, { show: showImportModal }] = useDmSwitcher<Partial<CodeCreator>>();
function toolbarButtonClick({ code, $grid }: VxeGridDefines.ToolbarButtonClickEventParams<CodeCreator>) {
  if (code === actionCode.deleteBatch) {
    // 删除
    delRows($grid);
  } else if (code === actionCode.add) {
    // 导入
    showImportModal();
  }
}
</script>

<template>
  <div class="h-full p-2">
    <VxeGrid ref="xGrid" v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick">
      <template #operate="{ row }">
        <AButton type="link" @click="onEdit(row)">编辑</AButton>
      </template>
    </VxeGrid>
    <ImportModal @register="importModalRegister" @success="reloadData"></ImportModal>
  </div>
</template>
