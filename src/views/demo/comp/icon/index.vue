<script lang="ts" setup>
import {
  AlipayCircleFilled,
  CodepenCircleFilled,
  GithubFilled,
  IeCircleFilled,
  QqCircleFilled,
  TaobaoCircleFilled,
  WechatFilled
} from '@ant-design/icons-vue';

import { Icon, IconPicker, SvgIcon } from '@/components/fs/icon';

import { openWindow } from '@/utils';

const toIconify = () => {
  openWindow('https://iconify.design/');
};
</script>

<template>
  <div title="Icon组件示例">
    <div class="flex justify-around">
      <GithubFilled :style="{ fontSize: '30px' }" />
      <QqCircleFilled :style="{ fontSize: '30px' }" />
      <WechatFilled :style="{ fontSize: '30px' }" />
      <AlipayCircleFilled :style="{ fontSize: '30px' }" />
      <IeCircleFilled :style="{ fontSize: '30px' }" />
      <TaobaoCircleFilled :style="{ fontSize: '30px' }" />
      <CodepenCircleFilled :style="{ fontSize: '30px' }" />
    </div>
    <hr />
    <br />

    <div class="flex flex-wrap justify-around">
      <Icon icon="ion:layers-outline" :size="30" />
      <Icon icon="ion:bar-chart-outline" :size="30" spin />
      <Icon icon="ion:tv-outline" :size="30" />
      <Icon icon="ion:settings-outline" :size="30" />
      <Icon icon="ant-design:copy-outlined" :size="30" />
      <Icon icon="avatar|svg" :size="30" />
      <Icon icon="svg:cast" :size="30" />
    </div>

    <hr />
    <br />
    <div class="flex flex-wrap justify-around">
      <SvgIcon name="activity" size="32" />
      <SvgIcon name="at-sign" size="32" />
      <SvgIcon name="banner" size="32" />
      <SvgIcon name="chrome" size="32" />
      <SvgIcon name="copy" size="32" />
      <SvgIcon name="cast" size="32" />
    </div>
    <hr />
    <br />
    <div class="flex flex-wrap justify-around">
      <IconPicker copy />
    </div>
    <hr />
    <br />
    <div class="flex flex-wrap justify-around">
      <IconPicker mode="svg" />
    </div>
    <hr />
    <br />
    <AButton class="mt-4" @click="toIconify">Iconify 图标大全</AButton>
  </div>
</template>
