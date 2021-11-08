import { Injectable } from '@angular/core';
import { SecureStorageObject, SecureStorage } from '@ionic-native/secure-storage/ngx';

@Injectable()
export class DataStoreProvider {
  defaultStoreName = 'MES';
  secureContainer: SecureStorageObject = null;

  constructor(private secureStorage: SecureStorage) {}

  setSecureContainer(container: SecureStorageObject): void {
    this.secureContainer = container;
  }

  getSecureContainer(): SecureStorageObject {
    return this.secureContainer;
  }

  /**
   * Get all stored keys
   * NOTE: secureContainer guard clause allows app to run in browser
   *
   * @returns Promise
   */
  getKeys(): Promise<string[]> {
    if (!this.secureContainer) {
      return Promise.resolve(['']);
    }
    return this.secureContainer.keys().then((response: string[]) => response);
  }

  /**
   * Gets the specified item for the given key
   * NOTE: secureContainer guard clause allows app to run in browser
   *
   * @param key
   * @returns Promise
   */
  getItem(key: string): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.get(key).then((response: string) => response);
  }

  /**
   * sets the value for specified key
   * NOTE: secureContainer guard clause allows app to run in browser
   *
   * @param key
   * @param value
   * @returns Promise
   */
  setItem(key: string, value: any): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.set(key, value).then((response: string) => response);
  }

  /**
   * removes the item for a given key
   * NOTE: secureContainer guard clause allows app to run in browser
   *
   * @param key
   * @returns Promise
   */
  removeItem(key: string): Promise<string> {
    if (!this.secureContainer) {
      return Promise.resolve('');
    }
    return this.secureContainer.remove(key);
  }
}
