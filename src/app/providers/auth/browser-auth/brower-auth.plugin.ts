import { Injectable } from '@angular/core';
import {
  IdentityVault,
  PluginOptions,
  IonicNativeAuthPlugin
} from '@ionic-enterprise/identity-vault';
import { BrowserAuthService } from '@providers/auth';

@Injectable()
export class BrowserAuthPlugin implements IonicNativeAuthPlugin {
  constructor(private browserAuthService: BrowserAuthService) {}

  getVault(config: PluginOptions): IdentityVault {
    config.onReady(this.browserAuthService);
    return this.browserAuthService;
  }
}
