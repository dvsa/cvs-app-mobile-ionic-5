import { Injectable } from '@angular/core';
import {Platform} from '@ionic/angular';
import { IonicAuth } from '@ionic-enterprise/auth';
import { Observable, Subject } from 'rxjs';
import to from 'await-to-js';
import { Storage } from '@ionic/storage';

import { AUTH, CONNECTION_STATUS, LOG_TYPES, STORAGE } from '@app/app.enums';
import { default as AppConfig } from '@config/application.hybrid';
import { VaultService } from '@providers/auth';
import { CommonFunctionsService } from '../../utils/common-functions';
import { AzureIDToken, TokenInfo, TokenStatus } from './auth-model';
import { cordovaAzureConfig, webAzureConfig } from './auth-options';
import { Log } from '@store/logs/logs.model';
import { LogsProvider } from '@store/logs/logs.service';
import { NetworkService } from '@providers/global';

@Injectable()
export class AuthenticationService {
  private _tokenInfo: TokenInfo;
  private _auth: IonicAuth;

  private _loginStatusChanged: Subject<boolean>;
  get loginStatusChanged(): Observable<boolean> {
    return this._loginStatusChanged.asObservable();
  }

  get tokenInfo(): TokenInfo {
    return this._tokenInfo || ({} as TokenInfo);
  }

  get auth(): IonicAuth {
    return this._auth;
  }

  constructor(
    private platform: Platform,
    private vaultService: VaultService,
    private commonFunc: CommonFunctionsService,
    private logProvider: LogsProvider,
    private networkService: NetworkService,
    private storage: Storage,
  ) {}

  async initialiseAuth() {
    const isCordovaApp = this.platform.is('cordova');
    const config = isCordovaApp ? cordovaAzureConfig : webAzureConfig;
    config.tokenStorageProvider = this.vaultService;

    this._loginStatusChanged = new Subject();
    this.vaultService.lockChanged.subscribe((locked) => this._loginStatusChanged.next(!locked));

    this._auth = new IonicAuth(config);
  }

  async expireTokens(): Promise<void> {
    await this._auth.expire();
  }

  async login(): Promise<void> {
    await this.vaultService.logout();
    await this.vaultService.setDesiredAuthMode();

    try {
      await this._auth.login();

      const tkInfo: TokenInfo = await this.updateTokenInfo();
      const testerOid = tkInfo && tkInfo.oid ? tkInfo.oid : this.commonFunc.randomString(9);

      await this.vaultService.storeTesterObfuscatedId(
        this.commonFunc.getObfuscatedTesterOid(testerOid)
      );
    } catch (error) {
      console.log(error || error.message);
      throw error;
    }
  }

  async updateTokenInfo(): Promise<TokenInfo> {
    const tokenInfo: TokenInfo = await this.getTokenDetails();
    if (tokenInfo) {
      this._tokenInfo = tokenInfo;
    }
    return this._tokenInfo;
  }

  async hasUserRights(checkRoles: string[]): Promise<boolean> {
    await this.updateTokenInfo();
    const { testerRoles: roles } = this.tokenInfo;
    return roles && roles.some((role) => checkRoles.indexOf(role) >= 0);
  }

  async getTokenDetails(): Promise<TokenInfo> {
    const authResponse = await this._auth.getAuthResponse();
    const idToken = await this._auth.getIdToken();
    if (!idToken) {
      return;
    }

    const { id_token: token } = authResponse;
    // set the stored value for employee id only if the idToken is valid (has one or more props)
    if(typeof idToken === 'object' && Object.keys(idToken).length) {
      await this.storage.set(STORAGE.EMPLOYEE_ID, idToken.employeeid || null);
    }

    return {
      id: idToken.sub,
      testerName: idToken.name,
      testerEmail: idToken.email || idToken.preferred_username,
      testerRoles: idToken.roles,
      oid: idToken.oid || '',
      employeeId: idToken.employeeid,
      testerId: idToken.employeeid || idToken.oid,
      token
    };
  }

  async isUserAuthenticated(): Promise<TokenStatus> {
    // when offline dont attempt to refreshSession or updateTokenInfo;
    if (this.networkService.getNetworkState() === CONNECTION_STATUS.OFFLINE) {
      return { active: true, action: AUTH.CONTINUE };
    }

    if (!(await this._auth.isAccessTokenAvailable())) {
      return { active: false, action: AUTH.RE_LOGIN };
    }

    // need to manually check token validity and expiry here to workaround issues
    // with ionic auth isTokenExpired method
    if (await this.isTokenExpired()) {
      try {
        await this._auth.refreshSession();
      } catch (error) {
        return { active: false, action: AUTH.RE_LOGIN };
      }
    }

    await this.updateTokenInfo();

    return { active: true, action: AUTH.CONTINUE };
  }

  async checkUserAuthStatus(): Promise<boolean> {
    const { action } = await this.isUserAuthenticated();

    if (action === AUTH.RE_LOGIN) {
      const [error] = await to(this.login());

      if (error) {
        this.logLoginUnsuccessful(error.message);
        return Promise.resolve(false);
      } else {
        this._loginStatusChanged.next(true);
      }
    }

    return Promise.resolve(true);
  }

  logLoginUnsuccessful(errorMessage: string) {
    const log: Log = {
      type: LOG_TYPES.ERROR,
      message: `Login unsuccessful for client_id=${AppConfig.app.CLIENT_ID} with the error message ${errorMessage}`,
      timestamp: Date.now(),
      unauthenticated: true
    };

    this.logProvider.dispatchLog(log);
  }

  async isTokenExpired(): Promise<boolean> {
    await this._auth.isAuthenticated();
    const token: AzureIDToken = await this._auth.getIdToken();
    // token expiry is in seconds so convert to milliseconds
    const tokenExpiry: Date = (token && token.exp) ? new Date(token.exp *1000) : new Date(0);
    const now = new Date();
    return tokenExpiry < now;
  }

  async getTesterID(): Promise<string> {
    // prioritise value in storage for employee id, fall back to ionic auth token values
    const employeeId = await this.storage.get(STORAGE.EMPLOYEE_ID);
    const idToken = await this._auth.getIdToken();
    return employeeId || idToken.employeeId || idToken.oid || null;
  }

}
