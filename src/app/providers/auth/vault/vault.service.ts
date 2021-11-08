import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  AuthMode,
  DefaultSession,
  IdentityVault,
  IonicIdentityVaultUser,
  IonicNativeAuthPlugin
} from '@ionic-enterprise/identity-vault';
import { Subject, Observable } from 'rxjs';

import { BrowserAuthPlugin } from '@providers/auth';
import { LOCAL_STORAGE } from '@app/app.enums';

@Injectable()
export class VaultService extends IonicIdentityVaultUser<DefaultSession> {
  private _lockChanged: Subject<boolean>;

  get lockChanged(): Observable<boolean> {
    return this._lockChanged.asObservable();
  }

  constructor(private browserAuthPlugin: BrowserAuthPlugin, private plt: Platform) {
    super(plt, {
      restoreSessionOnReady: false,
      unlockOnReady: false,
      unlockOnAccess: true,
      lockAfter: 5000,
      hideScreenOnBackground: true,
      shouldClearVaultAfterTooManyFailedAttempts: false
    });

    this._lockChanged = new Subject();
  }

  async setDesiredAuthMode(): Promise<void> {
    const mode = AuthMode.SecureStorage;
    return await this.setAuthMode(mode);
  }

  async isLocked(): Promise<boolean> {
    const vault = await this.getVault();
    return vault.isLocked();
  }

  async storeTesterObfuscatedId(obsTesterId: string) {
    const vault: IdentityVault = await this.getVault();
    await vault.storeValue(LOCAL_STORAGE.OBSFUCATED_TESTER, obsTesterId);
  }

  async getTesterObsfuscatedId(): Promise<string> {
    const vault: IdentityVault = await this.getVault();
    return vault.getValue(LOCAL_STORAGE.OBSFUCATED_TESTER);
  }

  onVaultUnlocked() {
    this._lockChanged.next(false);
  }

  onVaultLocked() {
    this._lockChanged.next(true);
  }

  getPlugin(): IonicNativeAuthPlugin {
    if (this.plt.is('cordova')) {
      return super.getPlugin();
    }
    return this.browserAuthPlugin;
  }
}
