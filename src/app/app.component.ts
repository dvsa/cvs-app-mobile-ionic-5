import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {NetworkService} from '@providers/global';
import {AuthenticationService} from '@providers/auth';
import {StorageService} from '@providers/natives/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private networkService: NetworkService,
    private authenticationService: AuthenticationService,
    public storageService: StorageService,
  ) {
  }

  async ngOnInit() {
    await this.platform.ready();
    alert('ready');
    await this.initApp();
  }

  async initApp() {

    this.networkService.initialiseNetworkStatus();

    await this.authenticationService.expireTokens();
    //
    // await this.appService.manageAppInit();
    //
    // const netWorkStatus: CONNECTION_STATUS = this.networkService.getNetworkState();
    //
    // if (netWorkStatus === CONNECTION_STATUS.OFFLINE) {
    //   this.manageAppState();
    //   return;
    // }
    //
    const authStatus = await this.authenticationService.checkUserAuthStatus();
    alert(authStatus);
    // authStatus && !this.appService.isSignatureRegistered
    //   ? this.navigateToSignaturePage()
    //   : this.manageAppState();
    //
    // this.setupLogNetworkStatus();
    //
    // if (authStatus && this.appService.isCordova) {
    //   await this.activateNativeFeatures();
    // }
  }

}
