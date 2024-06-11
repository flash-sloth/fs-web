<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { VxeTableInstance } from 'vxe-table';
import VXETable from 'vxe-table';
import XEUtils from 'xe-utils';

interface RowVO {
  id: number;
  parentId: number | null;
  name: string;
  type: string;
  size: number;
  date: string;
}

const xTreeRef = ref<VxeTableInstance<RowVO>>();

const tableData = ref<RowVO[]>([
  { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
  { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
  { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
  { id: 20045, parentId: 24300, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
  { id: 10053, parentId: 24300, name: 'test abc96', type: 'avi', size: 0, date: '2021-04-01' },
  { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
  { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
  { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
  { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' },
  { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
  { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
  { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
  { id: 20045, parentId: 24300, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
  { id: 100531, parentId: 24300, name: 'test abc96', type: 'avi', size: 0, date: '2021-04-01' },
  { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
  { id: 210111, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
  { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 236661, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
  { id: 236177, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 223671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 236721, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 236811, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 232682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 245551, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' },
  { id: 245266, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
  { id: 100510, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
  { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
  { id: 200145, parentId: 24300, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
  { id: 101053, parentId: 24300, name: 'test abc96', type: 'avi', size: 0, date: '2021-04-01' },
  { id: 243230, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
  { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
  { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 236166, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
  { id: 236177, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 236171, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 245155, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' },
  { id: 245166, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
  { id: 245717, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
]);

const hasRowExpand = (row: RowVO) => {
  const $table = xTreeRef.value;
  if ($table) {
    return $table.isTreeExpandByRow(row);
  }
  return false;
};

const removeRowEvent = async (row: RowVO) => {
  const type = await VXETable.modal.confirm('您确定要删除吗？');
  if (type === 'confirm') {
    const matchObj = XEUtils.findTree(tableData.value, item => item.id === row.id);
    if (matchObj) {
      // 从树节点中移除
      matchObj.items.splice(matchObj.index, 1);
    }
  }
};
function addRooNodeEvent() {
  alert('添加根节点');
}
/** 展开所有 */
function expandAllEvent() {}
/** 关闭所有 */
function claseExpandEvent() {}

const formProps = reactive({
  title: '新增',
  visible: true,
  data: {
    id: null,
    name: '',
    type3: '',
    type2: '0'
  },
  rules: {
    name: [
      { required: true, message: '请输入名称' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
    ],
    type3: [{ required: true, message: '请填写test1' }],
    type2: [
      { required: true, message: '请填写test2' },
      {
        validator: async ({ itemValue, data }: { itemValue: string; data: any }) => {
          // 自定义校验
          if (data.type3 && itemValue === data.type3) {
            throw new Error('test1 不能与 test2 一致');
          }
          return true;
        }
      }
    ]
  },
  items: [
    { field: 'name', title: '名称', span: 24, itemRender: { name: 'VxeInput' } },
    { field: 'type2', title: 'type2', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'type3', title: 'type3', span: 12, itemRender: { name: 'VxeInput' } }
  ]
});
</script>

<template>
  <AFlex class="h-full">
    <AFlex vertical class="w-120">
      <VxeToolbar class="sticky">
        <template #buttons>
          <VxeInput size="small" placeholder="搜索"></VxeInput>
        </template>
        <template #tools>
          <VxeButton status="primary">操作1</VxeButton>
          <VxeButton status="primary">操作2</VxeButton>
          <VxeButton status="primary">操作3</VxeButton>
        </template>
      </VxeToolbar>
      <div class="h-2xl flex-1 overflow-auto">
        <VxeTable
          ref="xTreeRef"
          show-overflow
          border="outer"
          height="auto"
          :row-config="{ isHover: true, useKey: true }"
          :data="tableData"
          :show-header="false"
          :checkbox-config="{ labelField: 'name' }"
          :tree-config="{
            transform: true,
            accordion: true,
            showLine: true,
            iconOpen: 'vxe-icon-square-minus-fill',
            iconClose: 'vxe-icon-square-plus-fill'
          }"
        >
          <template #header>
            <VxeButton @click="addRooNodeEvent">添加根节点</VxeButton>
            <VxeButton @click="expandAllEvent">展开所有</VxeButton>
            <VxeButton @click="claseExpandEvent">关闭所有</VxeButton>
          </template>
          <VxeColumn type="checkbox" tree-node>
            <template #default="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon" :class="hasRowExpand(row) ? 'vxe-icon-folder-open' : 'vxe-icon-folder'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon vxe-icon-file-txt"></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
            </template>
          </VxeColumn>
          <VxeColumn title="操作" width="140">
            <template #default="{ row }">
              <VxeButton mode="text" icon="vxe-icon-setting-fill"></VxeButton>
              <VxeButton mode="text" icon="vxe-icon-edit"></VxeButton>
              <VxeButton mode="text" icon="vxe-icon-delete" @click="removeRowEvent(row)"></VxeButton>
              <VxeButton mode="text" icon="vxe-icon-home-fill"></VxeButton>
            </template>
          </VxeColumn>
        </VxeTable>
      </div>
    </AFlex>
    <div class="w-1 flex-1 p-2">
      <VxeForm v-bind="formProps" class="p-2"></VxeForm>
    </div>
  </AFlex>
</template>
