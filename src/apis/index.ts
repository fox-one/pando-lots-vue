import { setToken } from '@utils/auth';
import request from '@utils/request';

export const getMessages = async function (groupId: string) {
  return await request<API.Message[]>({
    method: 'get',
    url: 'lots/latest_messages',
    headers: {
      group_id: groupId
    }
  });
};

export const getGroupInfo = async function (groupId: string) {
  return await request<API.GroupInfo>({
    method: 'get',
    url: `/groups/${groupId}/public`
  });
};

export const sendMessage = async function (data: { category: API.MessageType, data: string }) {
  return await request({
    method: 'post',
    url: '/lots/messages',
    data
  });
};

export const authFennec = async function (groupId: string, token: string) {
  return await request({
    method: 'post',
    url: `/groups/${groupId}/auth/fennec`,
    data: {
      token
    }
  }).then(res => {
    setToken({ token: res.token, groupId });
    return res;
  });
};

export const authMixin = async function (groupId: string, code: string) {
  return await request({
    method: 'post',
    url: `/groups/${groupId}/auth/mixin`,
    data: {
      code
    }
  }).then(res => {
    setToken({ token: res.token, groupId });
    return res;
  });
};

export const getUserInfo = async function () {
  return request<API.User>({
    method: 'get',
    url: '/users/me',
  });
};


export default {
  request,
  getMessages,
  getGroupInfo,
  sendMessage,
  authFennec,
  authMixin,
  getUserInfo
};
