/* eslint-disable no-underscore-dangle */
import type { AxiosError, AxiosInstance } from 'axios';
/** 请求重试机制 */

export class AxiosRetry {
  /** 重试 */
  retry(axiosInstance: AxiosInstance, error: AxiosError) {
    // @ts-expect-error tangyh 后续解决
    const { config } = error.response;
    // eslint-disable-next-line no-unsafe-optional-chaining
    const { waitTime, count } = config?.requestOptions?.retryRequest;
    config.__retryCount ||= 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    // 请求返回后config的header不正确造成重试请求失败,删除返回headers采用默认headers
    delete config.headers;
    return this.delay(waitTime).then(() => axiosInstance(config));
  }

  /** 延迟 */
  // eslint-disable-next-line class-methods-use-this
  private delay(waitTime: number) {
    return new Promise(resolve => {
      setTimeout(resolve, waitTime);
    });
  }
}
