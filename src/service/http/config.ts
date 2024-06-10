import { getServiceBaseURL } from '@/utils/service';

const isHttpProxy = import.meta.env.DEV && import.meta.env.VITE_HTTP_PROXY === 'Y';
// 支持多服务源，baseURL 对应 VITE_SERVICE_BASE_URL otherBaseURL对应 VITE_OTHER_SERVICE_BASE_URL， other可配置多个
// defHttp使用的是baseURL，其他服务暗血配置一个http对象
const { baseURL, otherBaseURL } = getServiceBaseURL(import.meta.env, isHttpProxy);
export const BASE_URL = baseURL;
export const OTHER_BASE_URL = otherBaseURL;
