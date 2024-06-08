import zhCN from './langs/zh_CN';
import enUS from './langs/en';
const locales = {
  'zh-CN': zhCN,
  'en-US': enUS
} as unknown as Record<App.I18n.LangType, App.I18n.Schema>;

export default locales;
