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
import { $t } from '@/locales';
import { actionCode } from '@/utils/common';
import { columns, searchFormConfig } from './data/index';
import FormWrapper from './modules/wrapper.vue';

// 获取表格实例
const xGrid = ref<VxeGridInstance<CodeTestSimpleVo>>();
const [register, { show: showForm }] = useDmSwitcher<Partial<CodeTestSimpleVo>>();
const { createConfirm, createMessage } = useMessage();

const formRef = ref();
const gridOptions = reactive<VxeGridProps<CodeTestSimpleVo>>(
  defGridConfig<CodeTestSimpleVo>({
    columns: columns({
      title: $t('common.action'),
      fixed: 'right',
      width: 200,
      cellRender: {
        name: 'VxeButtonGroup',
        props: {
          mode: 'text'
        },
        options: [
          { content: $t('common.view'), name: actionCode.view },
          { content: $t('common.copy'), name: actionCode.copy },
          { content: $t('common.edit'), name: actionCode.edit },
          { content: $t('common.delete'), status: 'error', name: actionCode.delete }
        ],
        events: {
          click({ row }, { name }) {
            switch (name) {
              case actionCode.view:
                handleView(row);
                break;
              case actionCode.copy:
                handleCopy(row);
                break;
              case actionCode.edit:
                handleEdit(row);
                break;
              case actionCode.delete:
              default:
                confirmRemove([row.id]);
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
        { code: actionCode.add, name: $t('common.add'), icon: 'vxe-icon-add' },
        { code: actionCode.deleteBatch, name: $t('common.batchDelete'), icon: 'vxe-icon-delete' }
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

/** 处理新增事件 */
function handleAdd() {
  showForm({ action: actionCode.add, data: {} });
}

/**
 * 处理复制事件
 *
 * @param row 参数
 */
function handleCopy(row: CodeTestSimpleVo) {
  showForm({ action: actionCode.copy, data: { ...row } });
}

/**
 * 处理编辑事件
 *
 * @param row 参数
 */
function handleEdit(row: CodeTestSimpleVo) {
  showForm({ action: actionCode.edit, data: { ...row } });
}

/**
 * 处理查看事件
 *
 * @param row 参数
 */
function handleView(row: CodeTestSimpleVo) {
  showForm({ action: actionCode.view, data: { ...row } });
}

function handleRemove($grid: VxeGridConstructor<CodeTestSimpleVo>) {
  const checkedRows = $grid.getCheckboxRecords();
  if (!checkedRows || checkedRows.length === 0) {
    createMessage.error('请选择要删除的数据');
  } else {
    confirmRemove(checkedRows.map((x: CodeTestSimpleVo) => x.id));
  }
}

function confirmRemove(ids: string[]) {
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
      handleAdd();
      break;
    default:
      break;
  }
}
</script>

<template>
  <div>
    <VxeGrid ref="xGrid" v-bind="gridOptions" @toolbar-button-click="toolbarButtonClick"></VxeGrid>
    <FormWrapper ref="formRef" @register="register" @success="reloadData"></FormWrapper>
  </div>
</template>
