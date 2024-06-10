/** 针对后台返回对象为mybatis-flex封装对象 */
// import { VxeUI } from 'vxe-table';
export const myBatisFlexGridProxyConfigProps = {
  list: null, // 用于列表，读取响应数据
  result: 'records', // 用于分页，读取响应数据
  total: 'totalRow' // 用于分页，读取总条数
};

// VxeUI.setConfig({
//   // size: null, // 全局尺寸
//   // zIndex: 999, // 全局 zIndex 起始值
//   // version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
//   table: {
//     //   showHeader: true,
//     //   keepSource: false,
//     //   showOverflow: null,
//     //   showHeaderOverflow: null,
//     //   showFooterOverflow: null,
//     //   size: null,
//     autoResize: true
//     //   stripe: false,
//     //   border: false,
//     //   round: false,
//     //   minHeight: 144,
//     //   emptyText: '暂无数据',
//     //   resizeConfig: {
//     //     refreshDelay: 250
//     //   },
//     //   rowConfig: {
//     //     keyField: '_X_ROW_KEY' // 行数据的唯一主键字段名
//     //   },
//     //   radioConfig: {
//     //     trigger: 'default'
//     //   },
//     //   checkboxConfig: {
//     //     strict: false,
//     //     highlight: false,
//     //     range: false,
//     //     trigger: 'default'
//     //   },
//     //   sortConfig: {
//     //     remote: false,
//     //     trigger: 'default',
//     //     orders: ['asc', 'desc', null],
//     //     sortMethod: null
//     //   },
//     //   filterConfig: {
//     //     remote: false,
//     //     filterMethod: null
//     //   },
//     //   expandConfig: {
//     //     trigger: 'default',
//     //     showIcon: true
//     //   },
//     //   treeConfig: {
//     //     rowField: 'id',
//     //     parentField: 'parentId',
//     //     children: 'children',
//     //     hasChild: 'hasChild',
//     //     mapChildren: '_X_ROW_CHILD',
//     //     indent: 20,
//     //     showIcon: true
//     //   },
//     //   tooltipConfig: {
//     //     enterable: true
//     //   },
//     //   menuConfig: {
//     //     visibleMethod () {}
//     //   },
//     //   editConfig: {
//     //     mode: 'cell',
//     //     showAsterisk: true
//     //   },
//     //   importConfig: {
//     //     modes: ['insert', 'covering']
//     //   },
//     //   exportConfig: {
//     //     modes: ['current', 'selected']
//     //   },
//     //   customConfig: {
//     //    storage: false,
//     //    mode: 'simple' // 默认自定义列方式
//     //   },
//     //   area-config: {
//     //     multiple: false
//     //   },
//     //   scrollX: {
//     //     enabled: false, // 是否默认开启横向虚拟滚动
//     //     gt: 60 // 当列大于指定数量时自动触发启用虚拟滚动
//     //   },
//     //   scrollY: {
//     //     enabled: false, // 是否默认开启纵向虚拟滚动
//     //     gt: 100 // 当数据大于指定数量时自动触发启用虚拟滚动
//     //   },
//     //   loading: {
//     //     icon: 'vxe-icon-spinner roll',
//     //     text: '加载中...'
//     //   }
//   },
//   grid: {
//     size: null,
//     border: true,

//     autoResize: true,
//     height: 'auto',
//     zoomConfig: {
//       escRestore: true
//     },
//     rowConfig: {
//       keyField: 'id'
//     },
//     columnConfig: {
//       resizable: true
//     },
//     checkboxConfig: {
//       reserve: true
//     },
//     toolbarConfig: {},
//     proxyConfig: {
//       autoLoad: true,
//       message: true,
//       seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
//       props: {
//         // list: null, // 用于列表，读取响应数据
//         // result: 'result', // 用于分页，读取响应数据
//         // total: 'page.total' // 用于分页，读取总条数
//         ...myBatisFlexGridProxyConfigProps
//       },
//       beforeItem: null,
//       beforeColumn: null,
//       beforeQuery: null,
//       afterQuery: null,
//       beforeDelete: null,
//       afterDelete: null,
//       beforeSave: null,
//       afterSave: null
//     }
//   }
// });
