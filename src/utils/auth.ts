import { setStore, getStore } from './storage';

export function setToken(data: { token: string, groupId: string }) {
  const tokens = getStore('tokens') ?? {};
  setStore('tokens', { ...tokens, [data.groupId]: data.token });
}

export function getToken(groupId: string) {
  const tokens = getStore('tokens');
  return tokens?.[groupId];
}

export function removeToken(groupId: string) {
  const tokens = getStore('tokens');
  delete tokens?.[groupId];
  setStore('tokens', tokens);
}

export function setUser(data: { groupId: string, user: API.User }) {
  const user = getStore('user') ?? {};
  setStore('user', { ...user, [data.groupId]: data.user });
}

export function getUser(groupId: string) {
  const user = getStore('user');
  return user?.[groupId];
}

export function removeUser(groupId: string) {
  const user = getStore('user');
  delete user?.[groupId];
  setStore('user', user);
}

export function removeAuth(groupId: string) {
  removeToken(groupId);
  removeUser(groupId);
}

export function isLogin(groupId: string) {
  const tokens = getToken(groupId);
  const user = getUser(groupId);
  return !!tokens && !!user;
}