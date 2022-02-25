import axios from 'axios';
import { getToken, removeAuth } from '@utils/auth';
import { API_BASE, AUTH_FAIL } from './constants';

export let isDev = process.env.APP_ENV === 'development';

export function setDev(dev: boolean) {
  isDev = dev;
}

const request = async function <T extends Record<string, any>>(opts): Promise<T> {
  if (process.env.APP_ENV === 'development') isDev = true;

  const token = getToken(opts.group_id) || opts.token;
  let headers = {} as Record<string, any>;
  if (token) headers.Authorization = `Bearer ${token}`;
  if (opts.headers) headers = Object.assign(headers, opts.headers);

  try {
    const res = await axios({
      method: opts.method || 'get',
      baseURL: API_BASE[isDev ? 'dev' : 'prod'] || '',
      url: opts.url || '',
      data: opts.data || {},
      headers,
    });
    return Promise.resolve(res as any);
  } catch (e: any) {
    if (e?.name === AUTH_FAIL) {
      removeAuth(opts.group_id);
    }
    return Promise.reject(e);
  }
};

axios.interceptors.response.use(
  function (res) {
    const code = res?.data?.code;
    if (code === AUTH_FAIL) {
      const err = new Error();
      err.message = res?.data?.message;
      err.name = code;
      throw err;
    }
    return res.data;
  },
  function (err) {
    if (err?.response?.data) {
      const { code, message } = err.response.data;
      return Promise.reject({ code, message });
    }
    return Promise.reject({ code: -1, message: 'No Response Data' });
  }
);

export default request;