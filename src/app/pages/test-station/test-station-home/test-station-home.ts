import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Store } from '@ngrx/store';

import {
  ANALYTICS_SCREEN_NAMES,
  APP_STRINGS,
  LOG_TYPES,
  PAGE_NAMES,
  TESTER_ROLES
} from '@app/app.enums';
import {
  AppService,
  AnalyticsService,
  SyncService,
  AppAlertService
} from '../../../providers/global';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { LogsModel } from '@store/logs/logs.model';
import { startSendingLogs } from '@store/logs/logs.actions';
import { LogsProvider } from '@store/logs/logs.service';
import { Router } from '@angular/router';
import { NavParamService } from '@app/nav-param.service';

@Component({
  selector: 'page-test-station-home',
  templateUrl: 'test-station-home.html',
  styleUrls: ['test-station-home.scss'],
})
export class TestStationHomePage implements OnInit {
  appStrings: typeof APP_STRINGS = APP_STRINGS;

  constructor(
    public appService: AppService,
    private screenOrientation: ScreenOrientation,
    private authenticationService: AuthenticationService,
    private syncService: SyncService,
    private alertService: AppAlertService,
    private store$: Store<LogsModel>,
    private analyticsService: AnalyticsService,
    private logProvider: LogsProvider,
    private router: Router,
    private navParamService: NavParamService
  ) {}

  neededRoles: string[] = [
    TESTER_ROLES.FULL_ACCESS,
    TESTER_ROLES.PSV,
    TESTER_ROLES.HGV,
    TESTER_ROLES.ADR,
    TESTER_ROLES.TIR
  ];

  ngOnInit() {
    this.store$.dispatch(startSendingLogs());

    if (this.appService.isCordova) {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

      this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.GET_STARTED);
    }
  }

  async ionViewDidEnter() {
    // if (!(await this.authenticationService.hasUserRights(this.neededRoles))) {
    //   await this.alertService.alertUnAuthorise();
    // }
  }

  async getStarted() {
    let err: Error; let IsDataSynced: boolean;
    // eslint-disable-next-line prefer-const
    [err, IsDataSynced] = await this.syncService.startSync();

    if (IsDataSynced) {
      await this.setPage();
    } else {
      this.logProvider.dispatchLog({
        type: LOG_TYPES.ERROR,
        message: `User ${
          this.authenticationService.tokenInfo.oid
        } having issue(s) with syncing data: Error ${JSON.stringify(err)}`,
        timestamp: Date.now()
      });
    }
  }

  // Test function to navigate to new page
  async testNav() {
    this.navParamService.updateNavData({
      page: 'Test Page'
    });
    await this.router.navigate(['test']);
  }

  async setPage(): Promise<void> {
    if (this.appService.isCordova) {
      if (this.appService.isSignatureRegistered) {
        await this.router.navigate([PAGE_NAMES.TEST_STATION_SEARCH_PAGE]);
      } else {
        // await this.router.navigate([PAGE_NAMES.SIGNATURE_PAD_PAGE]);
      }
    } else {
      await this.router.navigate([PAGE_NAMES.TEST_STATION_SEARCH_PAGE]);
    }
  }

  enableCache() {
    this.appService.enableCache();
  }
}
