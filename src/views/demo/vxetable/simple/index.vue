<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeGridConstructor, VxeGridDefines, VxeGridInstance, VxeGridPropTypes, VxeGridProps } from 'vxe-table';
import { VxeGrid } from 'vxe-table';
import { VxeGridProxyEventCode } from '@/enum';
import { defGridConfig } from '@/constants/vxeUiCurdDefConfig';
import { useDmSwitcher } from '@/components/fs/drawer-modal-switcher';

import { page, remove } from '@/service/demo/test/codeTestSimple/api';
import type { CodeTestSimpleQuery, CodeTestSimpleVo } from '@/service/demo/test/codeTestSimple/model';
import { useMessage } from '@/hooks/web/useMessage';

import { queryBefore } from '@/plugins/vxe-table/common';
import { columns, searchFormConfig } from './data/index';
import FormWraper from './modules/wrapper.vue';

// 获取表格实例
const xGrid = ref<VxeGridInstance<CodeTestSimpleVo>>();
const [register, { show: showForm }] = useDmSwitcher<Partial<CodeTestSimpleVo>>();
const { createConfirm, createMessage } = useMessage();

const actionCode = {
  add: 'add',
  edit: 'edit',
  view: 'view',
  delete: 'delete',
  deleteBatch: 'deleteBatch'
};

const formRef = ref();
const gridOptions = reactive<VxeGridProps<CodeTestSimpleVo>>(
  defGridConfig<CodeTestSimpleVo>({
    columns: columns({
      title: '操作',
      fixed: 'right',
      width: 180,
      cellRender: {
        name: 'VxeButtonGroup',
        props: {
          mode: 'text'
        },
        options: [
          { content: '查看', name: actionCode.view },
          { content: '编辑', name: actionCode.edit },
          { content: '删除', status: 'error', name: actionCode.delete }
        ],
        events: {
          click({ row }, { name }) {
            switch (name) {
              case actionCode.view:
                showForm({ action: name, data: row });
                break;
              case actionCode.edit:
                showForm({ action: name, data: row });
                break;
              case actionCode.delete:
              default:
                confirnRemove([row.id]);
                break;
            }
          }
        }
      }
    }),
    // 搜索表单
    formConfig: searchFormConfig(),
    pagerConfig: {},
    proxyConfig: { ajax: { query: loadData } },
    toolbarConfig: {
      buttons: [
        { code: actionCode.add, name: '新增', icon: 'vxe-icon-add' },
        { code: actionCode.deleteBatch, name: '删除', icon: 'vxe-icon-delete' }
      ]
    }
  })
);

/**
 * 加载数据
 *
 * @param params
 */
async function loadData(params: VxeGridPropTypes.ProxyAjaxQueryParams) {
  const param: Model.PageParam<CodeTestSimpleQuery> = queryBefore(params);
  return await page(param);
}

/** 重新加载数据 */
async function reloadData() {
  const $grid = xGrid.value;
  if ($grid) {
    $grid.commitProxy(VxeGridProxyEventCode.QUERY);
  }
}

function handleRemove($grid: VxeGridConstructor<CodeTestSimpleVo>) {
  const checkedRows = $grid.getCheckboxRecords();
  if (!checkedRows || checkedRows.length === 0) {
    createMessage.error('请选择要删除的数据');
  } else {
    confirnRemove(checkedRows.map((x: CodeTestSimpleVo) => x.id));
  }
}

function confirnRemove(ids: string[]) {
  createConfirm({
    iconType: 'warning',
    title: '系统提示',
    content: '确定删除选中数据吗？',
    onOk: async () => {
      await remove(ids);
      createMessage.success('删除成功');
      await reloadData();
    }
  });
}

function toolbarButtonClick({ code, $grid }: VxeGridDefines.ToolbarButtonClickEventParams<CodeTestSimpleVo>) {
  switch (code) {
    case actionCode.deleteBatch:
      handleRemove($grid);
      break;
    case actionCode.add:
      showForm({ action: 'add', data: {} });
      break;
    default:
      break;
  }
}
</script>

<template>
  <div>
    <VxeGrid ref="xGrid" v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick"></VxeGrid>
    <FormWraper ref="formRef" @register="register" @success="reloadData"></FormWraper>
  </div>
</template>
