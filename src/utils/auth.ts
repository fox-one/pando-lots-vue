import storage from './storage';

export const STORAGE_KEY = '$__PANDO_LOTS__';

export function setStore(key: string, value: any) {
  try {
    const store = JSON.parse(storage.get(STORAGE_KEY) ?? '{}');
    store[key] = value;
    return storage.set(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    return false;
  }
}

export function getStore(key: string) {
  try {
    const store = JSON.parse(storage.get(STORAGE_KEY) ?? '{}');
    return store[key];
  } catch (e) {
    return null;
  }
}

export function removeStore(key: string) {
  try {
    const store = JSON.parse(storage.get(STORAGE_KEY) ?? '{}');
    delete store?.[key];
    return storage.set(STORAGE_KEY, JSON.stringify(store));
  } catch (e) {
    return null;
  }
}

export function setToken(data: { token: string, groupId: string }) {
  const tokens = getStore('tokens');
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
  const user = getStore('user');
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