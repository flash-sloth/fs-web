<script lang="ts">
import { defineComponent, nextTick, ref, unref } from 'vue';
import { Card, Col, Row, Spin } from 'ant-design-vue';
import { cloneDeep, uniq } from 'lodash-es';
import type { TreeActionType, TreeItem } from '@/components/fs/tree/index';
import { BasicTree } from '@/components/fs/tree/index';
import { isArray } from '@/utils/is';
import { treeData } from './data';

export default defineComponent({
  components: { BasicTree, Card, Row, Col, Spin },
  setup() {
    const asyncTreeRef = ref<Nullable<TreeActionType>>(null);
    const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
    const loadTreeRef = ref<Nullable<TreeActionType>>(null);
    const tree2 = ref<TreeItem[]>([]);
    const treeLoading = ref(false);

    function handleCheck(checkedKeys, e) {
      console.log('onChecked', checkedKeys, e);
    }

    function loadTreeData() {
      treeLoading.value = true;
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        tree2.value = cloneDeep(treeData);
        treeLoading.value = false;
        // 展开全部
        nextTick().then(() => {
          console.log(unref(asyncExpandTreeRef));
          unref(asyncExpandTreeRef)?.expandAll(true);
        });
      }, 2000);
    }
    function loadTreeData2() {
      treeLoading.value = true;
      // 以下是模拟异步获取数据
      setTimeout(() => {
        // 设置数据源
        tree2.value = cloneDeep(treeData);
        treeLoading.value = false;
      }, 2000);
    }

    const tree = ref([
      {
        title: 'parent ',
        key: '0-0'
      }
    ]);

    function onLoadData(treeNode) {
      return new Promise((resolve: (value?: unknown) => void) => {
        if (isArray(treeNode.children) && treeNode.children.length > 0) {
          resolve();
          return;
        }
        setTimeout(() => {
          const asyncTreeAction: TreeActionType | null = unref(asyncTreeRef);
          if (asyncTreeAction) {
            const nodeChildren = [
              { title: `Child Node ${treeNode.eventKey}-0`, key: `${treeNode.eventKey}-0` },
              { title: `Child Node ${treeNode.eventKey}-1`, key: `${treeNode.eventKey}-1` }
            ];
            asyncTreeAction.updateNodeByKey(treeNode.eventKey, { children: nodeChildren });
            asyncTreeAction.setExpandedKeys(uniq([treeNode.eventKey, ...asyncTreeAction.getExpandedKeys()]));
          }

          resolve();
        }, 300);
      });
    }
    return {
      treeData,
      handleCheck,
      tree,
      onLoadData,
      asyncTreeRef,
      asyncExpandTreeRef,
      loadTreeRef,
      tree2,
      loadTreeData,
      treeLoading,
      loadTreeData2
    };
  }
});
</script>

<template>
  <div title="Tree基础示例">
    <Row :gutter="[16, 16]">
      <Col :span="8">
        <BasicTree title="基础示例，默认展开第一层" :tree-data="treeData" default-expand-level="1">
          <template #title="item">插槽渲染： {{ item.title }}</template>
        </BasicTree>
      </Col>
      <Col :span="8">
        <BasicTree
          title="可勾选，默认全部展开"
          :tree-data="treeData"
          :checkable="true"
          default-expand-all
          @check="handleCheck"
        />
      </Col>

      <Col :span="8">
        <BasicTree
          title="指定默认展开/勾选示例"
          :tree-data="treeData"
          :checkable="true"
          :expanded-keys="['0-0']"
          :checked-keys="['0-0']"
        />
      </Col>
      <Col :span="8">
        <BasicTree ref="asyncTreeRef" title="懒加载异步树" :tree-data="tree" :load-data="onLoadData" />
      </Col>
      <Col :span="8">
        <Card title="异步数据，默认展开">
          <template #extra>
            <AButton :loading="treeLoading" @click="loadTreeData">加载数据</AButton>
          </template>
          <Spin :spinning="treeLoading">
            <BasicTree ref="asyncExpandTreeRef" :tree-data="tree2" />
          </Spin>
        </Card>
      </Col>
      <Col :span="8">
        <Card title="BasicTree内置加载">
          <template #extra>
            <AButton :loading="treeLoading" @click="loadTreeData2">请求数据</AButton>
          </template>
          <BasicTree ref="loadTreeRef" :tree-data="tree2" :loading="treeLoading" />
        </Card>
      </Col>
    </Row>
  </div>
</template>
