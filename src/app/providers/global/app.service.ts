import { Injectable } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

import { default as AppConfig } from '@config/application.hybrid';
import { LOCAL_STORAGE, STORAGE } from '@app/app.enums';
import { StorageService } from '../natives/storage.service';

@Injectable()
export class AppService {
  public readonly isProduction: boolean;
  public readonly isCordova: boolean;
  public readonly isInitRunDone: boolean;
  public isSignatureRegistered: boolean;
  public easterEgg: boolean;
  public caching: boolean;
  count = 0;

  private accessibilityTextZoomEnabled: boolean;
  private isInitSyncDone: boolean;

  constructor(
    private platform: Platform,
    private toastController: ToastController,
    private storageService: StorageService
  ) {
    this.isCordova = this.platform.is('cordova');
    this.isProduction = AppConfig.IS_PRODUCTION === 'true';
    this.isInitRunDone = !!localStorage.getItem(LOCAL_STORAGE.FIRST_INIT);
  }

  getRefDataSync(): boolean {
    return this.isInitSyncDone;
  }

  setRefDataSync(syncData: boolean): void {
    this.isInitSyncDone = syncData;
  }

  setFlags() {
    this.isSignatureRegistered = !!localStorage.getItem(LOCAL_STORAGE.SIGNATURE);
    this.caching = !!localStorage.getItem(LOCAL_STORAGE.CACHING);
    this.easterEgg = !!localStorage.getItem(LOCAL_STORAGE.EASTER_EGG);
  }

  manageAppInit(): Promise<any> {
    if (this.isCordova) {
      if (this.isInitRunDone) {
        this.setEasterEgg();
        this.setFlags();
        return Promise.resolve();
      } else {
        const arr = [this.storageService.clearStorage(), this.clearLocalStorage()];

        return Promise.all(arr).then(() => {
          localStorage.setItem(LOCAL_STORAGE.FIRST_INIT, 'done');
          this.setEasterEgg();
          this.setFlags();
          return Promise.resolve(true);
        });
      }
    } else {
      this.setEasterEgg();
      this.setFlags();
      return Promise.resolve(true);
    }
  }

  clearLocalStorage(): Promise<any> {
    localStorage.clear();
    return Promise.resolve(true);
  }

  async enableCache() {
    this.count++;
    if (this.easterEgg && this.count === 3) {
      if (this.caching) {
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'false');
        this.caching = false;
        await this.storageService.delete(STORAGE.STATE);
        await this.storageService.delete(STORAGE.VISIT);
        this.count = 0;
        await this.presentToast('Storage was cleared and caching was disabled. Ride on');
      } else {
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
        this.caching = true;
        this.count = 0;
        await this.presentToast('Caching was enabled');
      }
    }
  }

  setEasterEgg(): void {
    if (this.isProduction) {
      localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'false');
      localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
    } else {
      localStorage.setItem(LOCAL_STORAGE.EASTER_EGG, 'true');
      const cache = localStorage.getItem(LOCAL_STORAGE.CACHING);
      if(cache) {
        localStorage.setItem(LOCAL_STORAGE.CACHING, cache);
      } else {
        localStorage.setItem(LOCAL_STORAGE.CACHING, 'true');
      }
    }
  }

  private async presentToast(message: string): Promise<void> {
    const TOAST = await this.toastController.create({
      message,
      position: 'top',
      duration: 2000
    });
    await TOAST.present();
  }

  public setAccessibilityTextZoom(zoom: number): void {
    this.accessibilityTextZoomEnabled = zoom > 106;
  }

  /**
   * Function used to add accessibility css classes to html templates.
   * This value is set by setAccessibilityTextZoom on app initialisation/resume.
   */
  public isAccessibilityTextZoomEnabled(): boolean {
    return this.accessibilityTextZoomEnabled;
  }
}
