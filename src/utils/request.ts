import axios from 'axios';
import { getToken, removeAuth } from '@utils/auth';
import { API_BASE, AUTH_FAIL } from './constants';

export let groupId;

export let isDev = process.env.APP_ENV === 'development';

export function setGroupId(id: string) {
  groupId = id;
}

export function setDev(dev: boolean) {
  isDev = dev;
}

const request = async function <T extends Record<string, any>>(opts): Promise<T> {
  if (process.env.APP_ENV === 'development') isDev = true;

  const token = getToken(groupId);
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
  } catch (e) {
    return Promise.reject(e);
  }
};

axios.interceptors.response.use(
  function (res) {
    const code = res?.data?.code;
    if (code === AUTH_FAIL) removeAuth(groupId);
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