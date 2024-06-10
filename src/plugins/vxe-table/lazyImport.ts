import { VxeColgroup, VxeColumn, VxeGrid, VxeTable, VxeToolbar, VxeUI } from 'vxe-table';

import {
  VxeButton,
  VxeButtonGroup,
  VxeCheckbox,
  VxeCheckboxGroup,
  VxeForm,
  VxeFormItem,
  VxeIcon,
  VxeInput,
  VxeModal,
  VxePager,
  VxePulldown,
  VxeRadio,
  VxeRadioButton,
  VxeRadioGroup,
  VxeSelect,
  VxeSwitch,
  VxeTextarea,
  VxeTooltip
} from 'vxe-pc-ui';
// ...

// 导入主题变量，也可以重写主题变量
import 'vxe-table/styles/cssvar.scss';
import 'vxe-pc-ui/styles/cssvar.scss';

// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN';
import type { App } from 'vue';

VxeUI.setI18n('zh-CN', zhCN);
VxeUI.setLanguage('zh-CN');

export function LazyVxeTable(app: App) {
  app.use(VxeTable);
  app.use(VxeColumn);
  app.use(VxeColgroup);
  app.use(VxeGrid);
  app.use(VxeToolbar);
}

export function LazyVxeUI(app: App) {
  app.use(VxeButton);
  app.use(VxeButtonGroup);
  app.use(VxeButton);
  app.use(VxeButtonGroup);
  app.use(VxeCheckbox);
  app.use(VxeCheckboxGroup);
  app.use(VxeFormItem);
  app.use(VxeForm);
  app.use(VxeIcon);
  app.use(VxeInput);
  app.use(VxeModal);
  app.use(VxePager);
  app.use(VxePulldown);
  app.use(VxeRadio);
  app.use(VxeRadioButton);
  app.use(VxeRadioGroup);
  app.use(VxeSelect);
  app.use(VxeSwitch);
  app.use(VxeTextarea);
  app.use(VxeTooltip);
}
