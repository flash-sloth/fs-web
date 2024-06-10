<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeGridDefines, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { VxeGrid } from 'vxe-table';
import { Modal, message } from 'ant-design-vue';
import { myBatisFlexGridProxyConfigProps } from '@/plugins/vxe-table/config';
import type { RowVO } from './config/model';
import { columns } from './config/curdConfig';
import { deleteBatch, page as queryPage } from './config/api';
import FormWraper from './config/formWraper.vue';
// 获取表格实例
const xGrid = ref<VxeGridInstance<RowVO>>();
const actionCode = {
  add: 'add',
  deleteBatch: 'deleteBatch'
};
const gridOptions = reactive<VxeGridProps<RowVO>>({
  columns,
  // 全局配置无效，需单独配置
  pagerConfig: {
    enabled: true,
    pageSize: 20
  },
  // 搜索表单
  formConfig: {
    data: {
      name: ''
    },
    items: [
      { field: 'name', title: '名称', itemRender: { name: 'VxeInput' } },
      {
        itemRender: {
          name: 'VxeButtonGroup',
          options: [
            {
              type: 'submit',
              content: '搜索',
              status: 'primary',
              onclick: () => {
                xGrid.value?.reloadData(gridOptions?.formConfig?.data || {});
              }
            },
            { type: 'reset', content: '重置' }
          ]
        }
      }
    ]
  },
  // 行内编辑
  // editConfig: {
  //   trigger: 'click',
  //   mode: 'row',
  //   showStatus: true
  // },
  toolbarConfig: {
    buttons: [
      { code: actionCode.add, name: '新增', icon: 'vxe-icon-add' },
      { code: actionCode.deleteBatch, name: '删除', icon: 'vxe-icon-delete' }
    ],
    custom: true
  },
  proxyConfig: {
    // 启用表单
    form: true,
    props: {
      ...myBatisFlexGridProxyConfigProps
    },
    ajax: {
      // 接收 Promise
      query: async (params: VxeGridPropTypes.ProxyAjaxQueryParams) => {
        return await queryPage({
          current: params?.page.currentPage,
          size: params?.page.pageSize,
          model: { ...params.form }
        });
      }
    }
  }
});

function onEdit(row) {
  xGrid.value?.setEditRow(row);
}

const insertEvent = async () => {
  const $table = xGrid.value;
  if ($table) {
    const { row: newRow } = await $table.insert({});
    // 插入一条数据并触发校验
    const errMap = await $table.validate(newRow);
    if (errMap) {
      // 校验失败
    }
  }
};

function toolbarButtonClick({ $grid, code }: VxeGridDefines.ToolbarButtonClickEventParams<RowVO>) {
  if (code === actionCode.deleteBatch) {
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
          await $grid.reloadData(gridOptions?.formConfig?.data || {});
        }
      });
    }
  }
}
</script>

<template>
  <div>
    <VxeGrid v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick"></VxeGrid>
    <FormWraper></FormWraper>
  </div>
</template>
