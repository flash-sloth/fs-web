import './config';
import VxeTable from 'vxe-table';
import VxeUI from 'vxe-pc-ui';
import 'vxe-table/lib/style.css';
import 'vxe-pc-ui/lib/style.css';
// 导入默认的语言
import zhCN from 'vxe-pc-ui/lib/language/zh-CN';
import enUS from 'vxe-pc-ui/lib/language/en-US';
import type { App } from 'vue';
import { LazyVxeTable, LazyVxeUI } from './lazyImport';
// zhCN.vxe.table.customCancel = '取消';
VxeUI.setI18n('zh-CN', zhCN);
VxeUI.setI18n('en-US', enUS);

export function setupVxe(app: App, lazyImport = false) {
  if (lazyImport) {
    LazyVxeTable(app);
    LazyVxeUI(app);
  } else {
    app.use(VxeTable).use(VxeUI);
  }
}
