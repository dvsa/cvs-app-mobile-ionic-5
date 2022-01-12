import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { catchError, map } from 'rxjs/operators';
import { AlertController, LoadingController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Observable, forkJoin } from 'rxjs';
import { AppVersion } from '@ionic-native/app-version/ngx';

import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  APP_STRINGS,
  APP_UPDATE,
  STORAGE
} from '@app/app.enums';
import { StorageService } from '../natives/storage.service';
import { default as AppConfig } from '@config/application.hybrid';
import { AppService } from './app.service';
import { AuthenticationService } from '@providers/auth';
import { AppVersionModel } from '@models/latest-version.model';
import { LogsProvider } from '@store/logs/logs.service';
import { VERSION_POPUP_MSG } from '@app/app.constants';
import { AnalyticsService } from './analytics.service';

declare let cordova: any;

@Injectable()
export class SyncService {
  loading: any;
  loadOrder: Observable<any>[] = [];
  oid: string;

  currentAppVersion: string;
  latestAppVersion: string;
  isVersionCheckedError: boolean;

  constructor(
    public loadingCtrl: LoadingController,
    public appService: AppService,
    private httpService: HTTPService,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private openNativeSettings: OpenNativeSettings,
    private callNumber: CallNumber,
    private analyticsService: AnalyticsService,
    private authenticationService: AuthenticationService,
    private appVersion: AppVersion,
    private logProvider: LogsProvider
  ) {}

  public async startSync(): Promise<any[]> {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await this.loading.present();

    if (this.appService.isCordova) {
      await this.checkForUpdate();
      await this.trackUpdatedApp(this.currentAppVersion, this.latestAppVersion);
    }

    if (!this.appService.getRefDataSync()) {
      ['Atfs', 'Defects', 'TestTypes', 'Preparers'].forEach((elem) =>
        this.loadOrder.push(this.getDataFromMicroservice(elem))
      );

      return await this.getAllData(this.loadOrder);
    }

    await this.loading.dismiss();
    return Promise.resolve([null, true]);
  }

  public async checkForUpdate() {
    this.isVersionCheckedError = false;

    const promises = [];
    promises.push(this.appVersion.getVersionNumber());
    promises.push(this.httpService.getApplicationVersion());
    promises.push(this.storageService.read(STORAGE.VISIT));

    try {
      const results = await Promise.all(promises);
      this.currentAppVersion = results[0];
      const latestAppVersionModel: AppVersionModel = results[1].body['mobile-app'];
      const version_checking = latestAppVersionModel.version_checking;
      this.latestAppVersion = latestAppVersionModel.version;
      const visit = results[2];

      await this.storageService.update(STORAGE.LATEST_VERSION, latestAppVersionModel.version);
      await this.storageService.update(STORAGE.APP_VERSION, results[0]);

      if (
        version_checking === 'true' &&
        this.currentAppVersion !== this.latestAppVersion &&
        !visit
      ) {
        const alert = await this.createUpdatePopup(this.currentAppVersion, this.latestAppVersion);
        return alert.present();
      }
    } catch (error) {
      this.isVersionCheckedError = true;
      console.log('Cannot perform check if app update is required');

      this.logProvider.dispatchLog({
        type: `error - checkForUpdate in sync.service.ts`,
        message: `User ${
          this.authenticationService.tokenInfo.oid
        } - Cannot perform check if app update is required - ${JSON.stringify(error)}`,
        timestamp: Date.now()
      });
    }
  }

  private createUpdatePopup(...params: string[]): Promise<HTMLIonAlertElement> {
    const [currentAppVersion, latestVersion] = params;

    return this.alertCtrl.create({
      header: APP_UPDATE.TITLE,
      message: VERSION_POPUP_MSG(currentAppVersion, latestVersion),
      buttons: [
        {
          text: APP_UPDATE.BUTTON,
          handler: () => {
            cordova.plugins.exit();
          }
        }
      ],
      backdropDismiss: false
    });
  }

  private async getAllData(loadOrder: Observable<any>[]): Promise<any[]> {
    return forkJoin(loadOrder)
      .toPromise()
      .then((result: any[]) => {
        this.appService.setRefDataSync(true);
        this.loading.dismiss();
        return [null, result.length === 4]; // ensure we have the exact and successful 4 apis call
      })
      .catch(() => [this.handleError()]);
  }

  async trackUpdatedApp(...params: string[]) {
    const [currentAppVersion, latestAppVersion] = params;

    if (!this.isVersionCheckedError && currentAppVersion === latestAppVersion) {
      await this.analyticsService.logEvent({
        category: ANALYTICS_EVENT_CATEGORIES.APP_UPDATE,
        event: ANALYTICS_EVENTS.APP_UPDATE
      });
    }
  }

  getDataFromMicroservice(microservice): Observable<TestStationReferenceDataModel[]> {
    this.oid = this.authenticationService.tokenInfo.oid;

    return this.httpService['get' + microservice]().pipe(
      map((data: any) => {
        this.storageService.update(STORAGE[microservice.toUpperCase()], data.body);
        return data.body;
      }),
      catchError((error) => {
        this.logProvider.dispatchLog({
          type: `error-${microservice}-getDataFromMicroservice in sync.service.ts`,
          message: `${this.oid} - ${error.status} ${error.message} for API call to ${error.url ||
            microservice + 'microservice'}`,
          timestamp: Date.now()
        });

        return throwError(error);
      })
    );
  }

  async handleError() {
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.UNABLE_LOAD_DATA,
      backdropDismiss: false,
      message: APP_STRINGS.NO_INTERNET_CONNECTION,
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: () => {
            this.openNativeSettings.open('settings');
            this.handleError();
          }
        },
        {
          text: APP_STRINGS.CALL_SUPP_BTN,
          handler: () => {
            this.callNumber.callNumber(AppConfig.app.KEY_PHONE_NUMBER, true).then(
              (data) => console.log(data),
              (err) => console.log(err)
            );
            return false;
          }
        },
        {
          text: APP_STRINGS.TRY_AGAIN_BTN,
          handler: () => {
            this.getAllData(this.loadOrder);
          }
        }
      ]
    });

    await alert.present();
    return throwError('Something bad happened; please try again later.');
  }
}
