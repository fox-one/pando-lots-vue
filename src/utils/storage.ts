import { storage } from 'peeler-js/es/storage';
import getLogger from './logger';
import { STORAGE_KEY } from './constants';

type StorageType = 'cookie' | 'localStorage' | 'sessionStorage';
let storageType: StorageType = 'localStorage';
const logger = getLogger('storage');

export function setStorageType(type: StorageType) {
  if (!type || type === storageType) return;

  storageType = type;
}

export const store = {
  get: (key: string) => storage.get(key, storageType),
  set: (key: string, val: any) => {
    try {
      if (typeof val !== 'string') {
        val = JSON.stringify(val);
      }
      return storage.set(key, val, storageType);
    } catch (err) {
      logger().warn('set storage error', err as any);
      return false;
    }
  },
  clear: (key: string) => storage.clear(key, storageType)
};

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

export default store;