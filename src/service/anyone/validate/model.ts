import type { RequestEnum } from '@vben/http';

export interface BaseApiConfig {
  url: string;
  method: RequestEnum;
}
