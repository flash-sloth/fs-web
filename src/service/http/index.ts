// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosInstance, AxiosResponse } from 'axios';
import { clone, isString } from 'lodash-es';
import axios from 'axios';
import type { AxiosTransform, CreateAxiosOptions, RequestOptions, Result } from '@vben/http';
import {
  AxiosRetry,
  ContentTypeEnum,
  RequestEnum,
  ResultEnum,
  VAxios,
  deepMerge,
  formatRequestDate,
  joinTimestamp,
  setObjToUrlParams
} from '@vben/http';
import { $t } from '@/locales';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { useMessage } from '@/hooks/web/useMessage';
import { checkStatus } from './checkStatus';

const { createMessage, createErrorModal } = useMessage();
const { VITE_GLOB_API_URL, VITE_GLOB_AXIOS_TIMEOUT, VITE_GLOB_TOKEN_KEY } = import.meta.env;

/** @description: 数据处理，方便区分多种处理方式 */
const transform: AxiosTransform = {
  /** @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误 */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res?.data;
    }
    // 错误的时候返回

    const resData = res?.data;
    if (!resData) {
      // return '[HTTP] Request has no return value';
      throw new Error($t('sys.api.apiRequestFailed'));
    }
    //  这里 code，data，msg为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, msg } = resData;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = resData && Reflect.has(resData, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data;
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = '';
    const authStore = useAuthStoreWithOut();
    switch (code) {
      case ResultEnum.UNAUTHORIZED:
        timeoutMsg = $t('sys.api.timeoutMessage');
        // tangyh
        authStore.resetStore();
        break;
      default:
        if (msg) {
          timeoutMsg = msg;
        }
    }

    // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      createErrorModal({ title: $t('sys.api.errorTip'), content: timeoutMsg });
    } else if (options.errorMessageMode === 'message') {
      createMessage.error(timeoutMsg);
    }

    throw new Error(msg || $t('sys.api.apiRequestFailed'));
  },

  // 请求之前处理config
  // eslint-disable-next-line complexity
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = `${config.url + (params.startsWith('?') ? '' : '?') + params}&${joinTimestamp(joinTime, false)}`;
        config.params = undefined;
      }
    } else if (!isString(params)) {
      formatDate && formatRequestDate(params);
      if (
        Reflect.has(config, 'data') &&
        config.data &&
        (Object.keys(config.data).length > 0 || config.data instanceof FormData)
      ) {
        config.data = data;
        config.params = params;
      } else {
        // 非GET请求如果没有提供data，则将params视为data
        config.data = params;
        config.params = undefined;
      }
      if (joinParamsToUrl) {
        config.url = setObjToUrlParams(config.url as string, { ...config.params, ...config.data });
      }
    } else {
      // 兼容restful风格
      config.url = config.url + (params.startsWith('?') ? '' : '?') + params;
      config.params = undefined;
    }
    return config;
  },

  /** @description: 请求拦截器处理 */
  requestInterceptors: (config, options) => {
    // Token
    if ((config as Record<any, any>)?.requestOptions?.withToken !== false) {
      const token = '';
      config.headers[VITE_GLOB_TOKEN_KEY] = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }

    return config;
  },

  /** @description: 响应拦截器处理 */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /** @description: 响应错误处理 */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    // const errorLogStore = useErrorLogStoreWithOut();
    // errorLogStore.addAjaxErrorInfo(error);
    const { code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        errMessage = $t('sys.api.apiTimeoutMessage');
      }
      if (err?.includes('Network Error')) {
        errMessage = $t('sys.api.networkExceptionMsg');
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          createErrorModal({
            title: $t('sys.api.errorTip'),
            content: errMessage
          });
        } else if (errorMessageMode === 'message') {
          createMessage.error(errMessage);
        }
        return Promise.reject(error);
      }
    } catch (e) {
      throw new Error(e as unknown as string);
    }

    checkStatus(error, errorMessageMode);

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET && isOpenRetry && retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  }
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: VITE_GLOB_AXIOS_TIMEOUT,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 全局接口前缀
          apiUrl: VITE_GLOB_API_URL,
          // 局部接口前缀，如 需要创建多个不同的 axios 请求时，可以使用
          urlPrefix: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          // 是否携带tenant
          withTenant: true,
          retryRequest: {
            isOpenRetry: false,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  );
}

export const defHttp = createAxios();
