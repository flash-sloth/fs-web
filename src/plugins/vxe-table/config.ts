import { VxeUI } from 'vxe-pc-ui';

// vxe的全局设置

VxeUI.setConfig({
  size: 'medium', // 全局尺寸
  zIndex: 3000, // 全局 zIndex 起始值
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  alert: {},
  anchor: {},
  anchorLink: {},
  breadcrumb: {
    separator: '/'
  },
  breadcrumbItem: {},
  button: {},
  buttonGroup: {},
  checkbox: {},
  checkboxGroup: {},
  col: {},
  colgroup: {},
  collapse: {},
  collapsePane: {},
  column: {},
  drawer: {
    // size: null,
    position: 'left',
    showHeader: true,
    lockView: true,
    mask: true,
    showTitleOverflow: true,
    showClose: true,
    padding: true
  },
  form: {
    // preventSubmit: false,
    // size: null,
    // colon: false,
    validConfig: {
      showMessage: true,
      autoPos: true
    },
    tooltipConfig: {
      enterable: true
    },
    titleAsterisk: true
  },
  formDesign: {
    height: 400,
    showPc: true
  },
  formGather: {},
  formItem: {},
  formView: {},

  icon: {},
  image: {},
  imagePreview: {},
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss',
    // labelFormat: '',
    // valueFormat: '',
    startDate: new Date(1900, 0, 1),
    endDate: new Date(2100, 0, 1),
    startDay: 1,
    selectDay: 1,
    digits: 2,
    controls: true
  },
  layoutAside: {},
  layoutBody: {},
  layoutContainer: {},
  layoutFooter: {},
  layoutHeader: {},
  link: {
    underline: true
  },
  listDesign: {
    height: 400,
    showPc: true
  },
  list: {
    // size: null,
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  loading: {},
  modal: {
    // size: null,
    top: 15,
    showHeader: true,
    minWidth: 340,
    minHeight: 140,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    showClose: true,
    padding: true,
    draggable: true,
    showConfirmButton: null,
    // storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  optgroup: {},
  option: {},
  pager: {
    pageSize: 10,
    pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000]
    // size: null,
    // autoHidden: false,
    // perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  pulldown: {},
  radio: {
    strict: true
  },
  radioButton: {
    strict: true
  },
  radioGroup: {
    strict: true
  },
  row: {},
  select: {
    multiCharOverflow: 8
  },
  switch: {},
  tabPane: {},
  tabs: {},
  textarea: {},
  tip: {},
  tooltip: {
    // size: null,
    trigger: 'hover',
    theme: 'dark',
    enterDelay: 500,
    leaveDelay: 300
  },
  tree: {},
  treeSelect: {},
  upload: {
    mode: 'all',
    imageTypes: ['jpg', 'jpeg', 'png', 'gif']
  },

  table: {
    // 是否显示表头
    showHeader: true,
    // 保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）
    keepSource: true,
    // 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）
    showOverflow: true,
    // 设置表头所有内容过长时显示为省略号 ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）
    showHeaderOverflow: true,
    showFooterOverflow: true,
    size: null,
    // 自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）
    autoResize: false,
    // 斑马条纹
    stripe: true,
    // 	是否带有边框
    border: true,
    // 是否为圆角边框
    round: false,
    // minHeight: 144,
    emptyText: '暂无数据',
    // 响应式布局配置项
    resizeConfig: {
      // 只对 auto-resize 有效，刷新延时，当父容器发生变化时，至少多少毫秒刷新布局
      refreshDelay: 250
    },
    // 	行配置信息
    rowConfig: {
      // 行数据的唯一主键字段名
      keyField: 'id',
      // 当鼠标移到行时，是否要高亮当前行
      isHover: true
    },
    radioConfig: {
      // 触发方式（注：当多种功能重叠时，会同时触发） default（默认）, cell（点击单元格触发）, row（点击行触发）
      trigger: 'cell'
    },
    // 列配置信息
    columnConfig: {
      // 每一列是否启用列宽调整
      resizable: true,
      minWidth: 100
    },
    checkboxConfig: {
      labelField: '序号',
      // 是否保留勾选状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前选中的状态（需要有 row-config.keyField）
      reserve: true,
      // 严格模式，当数据为空或全部禁用时，列头的复选框为禁用状态
      strict: false,
      // 高亮勾选行
      highlight: true,
      // 开启复选框范围选择功能（启用后通过鼠标在复选框的列内滑动选中或取消指定行）
      range: true,
      // 触发方式（注：当多种功能重叠时，会同时触发） default（默认）, cell（点击单元格触发）, row（点击行触发）
      trigger: 'cell'
    },
    sortConfig: {
      remote: true,
      trigger: 'default',
      orders: ['asc', 'desc', null],
      defaultSort: {
        field: 'createdTime',
        order: 'desc'
      },
      // 是否启用多列组合筛选
      // multiple: false,
      // 只对 multiple 有效，是否按照先后触发顺序进行排序
      chronological: false
    },
    filterConfig: {
      remote: true
    },
    expandConfig: {
      trigger: 'default',
      showIcon: true
    },

    treeConfig: {
      rowField: 'id',
      parentField: 'parentId',
      childrenField: 'children',
      hasChildField: 'hasChild',
      mapChildrenField: '_X_ROW_CHILD',
      indent: 20,
      showIcon: true
    },
    tooltipConfig: {
      // 鼠标是否可进入到工具提示中
      enterable: true
    },
    menuConfig: {
      // 该函数的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到）
      // visibleMethod() {
      //   return false;
      // }
    },
    editConfig: {
      mode: 'cell',
      // 是否显示必填字段的红色星号
      showAsterisk: true
    },
    importConfig: {
      // 	导入数据的方式
      modes: ['insert', 'covering']
    },
    exportConfig: {
      // 输出数据的方式
      modes: ['current', 'selected']
    },
    customConfig: {
      // 是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）
      storage: false,
      // 操作模式，simple简化模式；popup 弹窗模式（只对 trigger=click 有效）
      mode: 'simple' // 默认自定义列方式
    },
    scrollX: {
      // 是否默认开启横向虚拟滚动
      enabled: false,
      // 指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用；如果需要关闭，可以设置 enabled 为 false
      gt: 60
    },
    scrollY: {
      // 是否默认开启纵向虚拟滚动
      enabled: false,
      // 当数据大于指定数量时自动触发启用虚拟滚动
      gt: 100
    },
    loadingConfig: {
      icon: 'vxe-icon-spinner roll',
      text: '加载中...'
    }
  },

  grid: {
    size: null,
    editConfig: {
      trigger: 'manual',
      mode: 'row',
      showStatus: true,
      autoClear: false
    },
    toolbarConfig: {
      refresh: true,
      zoom: true,
      custom: true
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      // 所有设置标题内容过长时显示为省略号
      // string | boolean
      // ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）
      titleOverflow: 'tooltip'
    },
    zoomConfig: {
      escRestore: true
    },
    // pagerConfig: {
    //   pageSize: 10,
    //   pageSizes: [5, 10, 20, 50, 100, 200, 500, 1000]
    // },
    proxyConfig: {
      // 是否自动加载查询数据
      autoLoad: true,
      // 启用动态序号代理，每一页的序号会根据当前页数变化
      seq: true,
      // 启用排序代理，当点击排序时会自动触发 query 行为
      sort: true,
      // 启用筛选代理，当点击筛选时会自动触发 query 行为
      filter: true,
      // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
      form: true,
      // 是否显示内置的消息提示（可以设为 false 关闭内置的消息提示）
      message: false,
      // 对应响应结果 { result: [], page: { total: 100 } }
      response: {
        list: 'records', // 响应结果中获取数据列表的属性（不分页场景）
        result: 'records', // 只对 pager-config 配置了有效，响应结果中获取数据列表的属性（分页场景）
        // total: 'total', // 用于分页，读取总条数
        total: ({ data }) => {
          return Number(data.total);
        },
        message: 'msg'
      },
      beforeItem: null,
      beforeColumn: null,
      beforeQuery: null,
      afterQuery: null,
      beforeDelete: null,
      afterDelete: null,
      beforeSave: null,
      afterSave: null
    }
  },

  toolbar: {
    size: null,
    import: {
      // mode: 'covering'
    },
    export: {
      // types: ['csv', 'html', 'xml', 'txt']
    },
    buttons: [],
    tools: []
  }
});

VxeUI.setIcon({
  // table
  TABLE_SORT_ASC: 'vxe-icon-caret-up',
  TABLE_SORT_DESC: 'vxe-icon-caret-down',
  TABLE_FILTER_NONE: 'vxe-icon-funnel',
  TABLE_FILTER_MATCH: 'vxe-icon-funnel',
  TABLE_EDIT: 'vxe-icon-edit',
  // TABLE_HELP: 'vxe-icon-question-circle-fill',
  TABLE_TREE_LOADED: 'vxe-icon-spinner roll',
  TABLE_TREE_OPEN: 'vxe-icon-caret-right rotate90',
  TABLE_TREE_CLOSE: 'vxe-icon-caret-right',
  TABLE_EXPAND_LOADED: 'vxe-icon-spinner roll',
  TABLE_EXPAND_OPEN: 'vxe-icon-arrow-right rotate90',
  TABLE_EXPAND_CLOSE: 'vxe-icon-arrow-right',
  TABLE_CHECKBOX_CHECKED: 'vxe-icon-checkbox-checked',
  TABLE_CHECKBOX_UNCHECKED: 'vxe-icon-checkbox-unchecked',
  TABLE_CHECKBOX_INDETERMINATE: 'vxe-icon-checkbox-indeterminate',
  TABLE_RADIO_CHECKED: 'vxe-icon-radio-checked',
  TABLE_RADIO_UNCHECKED: 'vxe-icon-radio-unchecked',

  // toolbar
  TOOLBAR_TOOLS_REFRESH: 'vxe-icon-repeat',
  TOOLBAR_TOOLS_REFRESH_LOADING: 'vxe-icon-repeat roll',
  TOOLBAR_TOOLS_IMPORT: 'vxe-icon-upload',
  TOOLBAR_TOOLS_EXPORT: 'vxe-icon-download',
  TOOLBAR_TOOLS_PRINT: 'vxe-icon-print',
  TOOLBAR_TOOLS_FULLSCREEN: 'vxe-icon-fullscreen',
  TOOLBAR_TOOLS_MINIMIZE: 'vxe-icon-minimize',
  TOOLBAR_TOOLS_CUSTOM: 'vxe-icon-custom-column',
  TOOLBAR_TOOLS_FIXED_LEFT: 'vxe-icon-fixed-left',
  // TOOLBAR_TOOLS_FIXED_LEFT_ACTIVED: 'vxe-icon-fixed-left-fill',
  TOOLBAR_TOOLS_FIXED_RIGHT: 'vxe-icon-fixed-right'
  // TOOLBAR_TOOLS_FIXED_RIGHT_ACTIVED: 'vxe-icon-fixed-right-fill'
});
