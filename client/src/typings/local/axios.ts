/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosResponse } from 'axios';

export type AxiosResponseSuccessInterceptor<T = any, D = any> =
  | ((value: AxiosResponse<T, D>) => AxiosResponse<T, D> | Promise<AxiosResponse<T, D>>)
  | null
  | undefined;
