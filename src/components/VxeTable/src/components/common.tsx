import type { ComponentOptions } from 'vue';
import { h } from 'vue';
import type { FormItemContentRenderParams, FormItemRenderOptions, VxeGlobalRendererHandles } from 'vxe-table';
import XEUtils from 'xe-utils';
import { componentMap } from '../componentMap';
import type { ComponentType } from '../componentType';
import { createPlaceholderMessage, sanitizeInputWhitespace } from '../helper';

/** @description: 获取组件 */
export function getComponent(componentName: string | undefined) {
  const Component = componentMap.get(componentName as ComponentType);
  if (!Component) throw new Error(`您还没注册此组件 ${componentName}`);
  return Component as ComponentOptions;
}

export function isEmptyValue(cellValue: any) {
  return cellValue === null || cellValue === undefined || cellValue === '';
}

export function formatText(cellValue: any) {
  return `${isEmptyValue(cellValue) ? '' : cellValue}`;
}

export function cellText(cellValue: any): string[] {
  return [formatText(cellValue)];
}

/** @description: 方法名转换 */
export function getOnName(type: string) {
  return `on${type.substring(0, 1).toLocaleUpperCase()}${type.substring(1)}`;
}

/** @description: 获取组件传值所接受的属性 */
function getModelKey(renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  let prop = 'value';
  switch (renderOpts.name) {
    case 'ASwitch':
      prop = 'checked';
      break;
    default:
      // 处理未知的renderOpts.name情况
      // 可以是抛出错误、记录日志或其他逻辑
      break;
  }
  return prop;
}

/** @description: 回去双向更新的方法 */
function getModelEvent(renderOpts: VxeGlobalRendererHandles.RenderOptions) {
  let type = 'update:value';
  switch (renderOpts.name) {
    case 'ASwitch':
      type = 'update:checked';
      break;
    default:
      // 处理未知的renderOpts.name情况
      // 可以是抛出错误、记录日志或者赋予type一个默认值
      break;
  }
  return type;
}

/**
 * @param
 * @returns {any}
 * @description: chang值改变方法
 * @author: *
 */
function getChangeEvent() {
  return 'change';
}

function getClickEvent() {
  return 'click';
}
/**
 * @param
 * @returns {any}
 * @description: 获取方法
 * @author: *
 */
export function createEvents(_options: {
  renderOpts: VxeGlobalRendererHandles.RenderOptions;
  params: VxeGlobalRendererHandles.RenderParams;
  inputFunc?: Function;
  changeFunc?: Function;
  clickFunc?: Function;
}) {
  const { renderOpts, params, inputFunc, changeFunc, clickFunc } = _options;
  const { events } = renderOpts;
  const modelEvent = getModelEvent(renderOpts);
  const changeEvent = getChangeEvent();
  const clickEvent = getClickEvent();
  const isSameEvent = changeEvent === modelEvent;
  const ons: { [type: string]: Function } = {};

  XEUtils.objectEach(events, (func: Function, key: string) => {
    ons[getOnName(key)] = (...args: any[]) => {
      func(params, ...args);
    };
  });
  if (inputFunc) {
    ons[getOnName(modelEvent)] = (targetEvent: any) => {
      inputFunc(targetEvent);
      if (events && events[modelEvent]) {
        events[modelEvent](params, targetEvent);
      }
      if (isSameEvent && changeFunc) {
        changeFunc(targetEvent);
      }
    };
  }
  if (!isSameEvent && changeFunc) {
    ons[getOnName(changeEvent)] = (...args: any[]) => {
      changeFunc(...args);
      if (events && events[changeEvent]) {
        events[changeEvent](params, ...args);
      }
    };
  }
  if (clickFunc) {
    ons[getOnName(clickEvent)] = (...args: any[]) => {
      clickFunc(...args);
      if (events && events[clickEvent]) {
        events[clickEvent](params, ...args);
      }
    };
  }
  return ons;
}

/** @description: 获取属性 */
export function createProps(
  renderOpts: VxeGlobalRendererHandles.RenderOptions,
  value: any,
  defaultProps?: { [prop: string]: any }
) {
  const name = renderOpts.name as ComponentType;
  return XEUtils.assign(
    {
      placeholder: createPlaceholderMessage(name),
      allowClear: true
    },
    defaultProps,
    renderOpts.props,
    {
      [getModelKey(renderOpts)]: value
    }
  );
}

/** @description: 创建单元格默认显示内容 */
export function createDefaultRender(
  defaultProps?: { [key: string]: any },
  callBack?: (
    renderOpts: VxeGlobalRendererHandles.RenderDefaultOptions,
    params: VxeGlobalRendererHandles.RenderDefaultParams
  ) => Record<string, any>
) {
  return (
    renderOpts: VxeGlobalRendererHandles.RenderDefaultOptions,
    params: VxeGlobalRendererHandles.RenderDefaultParams
  ) => {
    const { row, column, $table } = params;
    const { name, attrs } = renderOpts;
    const cellValue = XEUtils.get(row, column.field as string);
    const args = (callBack && callBack(renderOpts, params)) ?? {};

    const Component = getComponent(name);
    return [
      h(Component, {
        ...attrs,
        ...createProps(renderOpts, cellValue, defaultProps),
        ...args,
        ...createEvents({
          renderOpts,
          params,
          inputFunc: (value: any) => XEUtils.set(row, column.field as string, value),
          changeFunc: () => $table.updateStatus(params)
        })
      })
    ];
  };
}

/** @description: 创建编辑单元格 */
export function createEditRender(
  defaultProps?: { [key: string]: any },
  callBack?: (
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions,
    params: VxeGlobalRendererHandles.RenderEditParams
  ) => Record<string, any>
) {
  return (
    renderOpts: VxeGlobalRendererHandles.RenderEditOptions,
    params: VxeGlobalRendererHandles.RenderEditParams
  ) => {
    const { row, column, $table } = params;
    const { name, attrs } = renderOpts;
    const cellValue = XEUtils.get(row, column.field as string);
    const args = (callBack && callBack(renderOpts, params)) ?? {};

    const Component = getComponent(name);
    return [
      h(Component, {
        ...attrs,
        ...createProps(renderOpts, cellValue, defaultProps),
        ...args,
        ...createEvents({
          renderOpts,
          params,
          inputFunc: (value: any) => XEUtils.set(row, column.field as string, value),
          changeFunc: () => $table.updateStatus(params)
        })
      })
    ];
  };
}

/** @description: 创建筛选渲染内容 */
export function createFilterRender(
  defaultProps?: { [key: string]: any },
  callBack?: (
    renderOpts: VxeGlobalRendererHandles.RenderFilterOptions,
    params: VxeGlobalRendererHandles.RenderFilterParams
  ) => Record<string, any>
) {
  return (
    renderOpts: VxeGlobalRendererHandles.RenderFilterOptions,
    params: VxeGlobalRendererHandles.RenderFilterParams
  ) => {
    const { column } = params;
    const { name, attrs } = renderOpts;
    const args = (callBack && callBack(renderOpts, params)) ?? {};

    const Component = getComponent(name);
    return [
      h(
        'div',
        {
          class: 'vxe-table--filter-antd-wrapper'
        },
        column.filters.map((option, oIndex) => {
          const optionValue = option.data;
          const checked = Boolean(option.data);

          return h(Component, {
            key: oIndex,
            ...attrs,
            ...createProps(renderOpts, optionValue, defaultProps),
            ...args,
            ...createEvents({
              renderOpts,
              params,
              inputFunc: (value: any) => {
                // 处理 model 值双向绑定
                option.data = value;
              },
              changeFunc: () => {
                // 处理 change 事件相关逻辑
                const { $panel } = params;
                $panel.changeOption(null, checked, option);
              }
            })
          });
        })
      )
    ];
  };
}

/**
 * @param
 * @returns {any}
 * @description: 默认过滤
 * @author: *
 */

export function createDefaultFilterRender() {
  return (params: VxeGlobalRendererHandles.FilterMethodParams) => {
    const { option, row, column } = params;
    const { data } = option;
    const cellValue = XEUtils.get(row, column.field as string);
    return cellValue === data;
  };
}

/** @description: 创建 form表单渲染 */
export function createFormItemRender(
  defaultProps?: { [key: string]: any },
  callBack?: (renderOpts: FormItemRenderOptions, params: FormItemContentRenderParams) => Record<string, any>
) {
  return (renderOpts: FormItemRenderOptions, params: FormItemContentRenderParams) => {
    const args = (callBack && callBack(renderOpts, params)) ?? {};
    const { data, property, $form } = params;
    const { name } = renderOpts;
    const { attrs } = renderOpts;
    const itemValue = XEUtils.get(data, property);

    const Component = getComponent(name);
    return [
      h(Component, {
        ...attrs,
        ...createProps(renderOpts, itemValue, defaultProps),
        ...args,
        ...createEvents({
          renderOpts,
          params,
          inputFunc: (value: any) => {
            // 处理 model 值双向绑定
            XEUtils.set(data, property, sanitizeInputWhitespace(name as ComponentType, value));
          },
          changeFunc: () => {
            // 处理 change 事件相关逻辑
            $form.updateStatus({
              ...params,
              field: property
            });
          }
        })
      })
    ];
  };
}

/** @description: cell渲染 */
export function createCellRender(
  getSelectCellValue: Function,
  callBack?: (
    renderOpts: VxeGlobalRendererHandles.RenderCellOptions,
    params: VxeGlobalRendererHandles.RenderCellParams
  ) => Array<any>
) {
  return (
    renderOpts: VxeGlobalRendererHandles.RenderCellOptions,
    params: VxeGlobalRendererHandles.RenderCellParams
  ) => {
    const args = (callBack && callBack(renderOpts, params)) ?? [];
    const cellLabel = getSelectCellValue && getSelectCellValue(renderOpts, params, ...args);
    const { placeholder } = renderOpts;

    return [
      h(
        'span',
        {
          class: 'vxe-cell--label'
        },
        placeholder && isEmptyValue(cellLabel)
          ? [
              h(
                'span',
                {
                  class: 'vxe-cell--placeholder'
                },
                formatText(placeholder)
              )
            ]
          : formatText(cellLabel)
      )
    ];
  };
}

/**
 * @param
 * @returns {any}
 * @description: 创建 导出渲染
 * @author: *
 */
export function createExportMethod(
  getExportCellValue: Function,
  callBack?: (params: VxeGlobalRendererHandles.ExportMethodParams) => Array<any>
) {
  return (params: VxeGlobalRendererHandles.ExportMethodParams) => {
    const { row, column, options } = params;
    const args = (callBack && callBack(params)) ?? [];
    return options && options.original
      ? XEUtils.get(row, column.field as string)
      : getExportCellValue(column.editRender || column.cellRender, params, ...args);
  };
}

/** @description: 创建单元格默认显示内容 */
export function createToolbarToolRender(
  defaultProps?: { [key: string]: any },
  callBack?: (
    renderOpts: VxeGlobalRendererHandles.RenderToolOptions,
    params: VxeGlobalRendererHandles.RenderToolParams
  ) => Record<string, any>
) {
  return (
    renderOpts: VxeGlobalRendererHandles.RenderToolOptions,
    params: VxeGlobalRendererHandles.RenderToolParams
  ) => {
    const { name, attrs } = renderOpts;
    const args = (callBack && callBack(renderOpts, params)) ?? {};

    const Component = getComponent(name);
    return [
      h(Component, {
        ...attrs,
        ...createProps(renderOpts, null, defaultProps),
        ...args,
        ...createEvents({ renderOpts, params })
      })
    ];
  };
}
