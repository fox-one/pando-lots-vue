import { setStore, getStore } from './storage';

export function getGroups(): Record<string, any> {
  return getStore('groups') ?? {};
}

export function setGroup(id: string, data: Record<string, any>) {
  let groups = getStore('groups');
  if (!groups) groups = {};
  groups[id] = data;
  setStore('groups', groups);
}