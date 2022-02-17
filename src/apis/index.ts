import { setToken } from '@utils/auth';
import request from '@utils/request';

const getMessages = async function (groupId: string) {
  return await request({
    method: 'get',
    url: 'lots/latest_messages',
    header: {
      group_id: groupId
    }
  });
};

const getGroupInfo = async function (groupId: string) {
  return await request({
    method: 'get',
    url: `/groups/${groupId}/public`
  });
};

const sendMessage = async function (data: { category: API.MessageType, data: string }) {
  return await request({
    method: 'post',
    url: '/lots/messages',
    data
  });
};

const authFennec = async function (groupId: string, token: string) {
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

const authMixin = async function (groupId: string, code: string) {
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

const getUserInfo = async function () {
  return request({
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
