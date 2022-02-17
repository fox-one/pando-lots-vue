import axios from 'axios';
import { getToken, removeAuth } from '@utils/auth';

const API_BASE = process.env.APP_ENV === 'development' ? 'https://dev-courses-api.firesbox.com/v1' : 'https://courses-api.firesbox.com/v1';
const AUTH_FAIL = 100401;

export let groupId;

export function setGroupId(id: string) {
  groupId = id;
}

const request = async function (opts): Promise<any> {
  const token = getToken(groupId);
  let headers = {} as Record<string, any>;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (opts.headers) {
    headers = Object.assign(headers, opts.headers);
  }

  let resp: any = null;
  try {
    resp = await axios({
      method: opts.method || 'get',
      baseURL: API_BASE || '',
      url: opts.url || '',
      data: opts.data || {},
      headers,
    });
  } catch (e) {
    return new Promise(function (resolve, reject) {
      reject(e);
    });
  }
  return new Promise(function (resolve, reject) {
    if (resp.data) {
      return resolve(resp.data);
    }
    return reject(resp);
  });
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