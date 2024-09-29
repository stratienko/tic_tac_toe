import { AxiosResponseSuccessInterceptor } from '@/typings/local/axios';
import { parseJson } from '@/utils/parse-json';

export const axiosResponseParser: AxiosResponseSuccessInterceptor = ({ data, ...rest }) => ({
  ...rest,
  data: parseJson(data),
});
