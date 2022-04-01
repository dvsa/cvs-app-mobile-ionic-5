import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import {
  APP_STRINGS,
  AUTH,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE, PAGE_NAMES
} from '@app/app.enums';
import { VisitService } from '@providers/visit/visit.service';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '@providers/auth';
import { AppService, AnalyticsService } from '@providers/global';
import { LogsProvider } from '@store/logs/logs.service';
import {Router} from '@angular/router';

@Component({
  selector: 'page-test-station-details',
  templateUrl: 'test-station-details.html',
  styleUrls: ['test-station-details.scss']
})
export class TestStationDetailsPage {
  testStation: TestStationReferenceDataModel;
  changeOpacity = false;
  nextAlert = false;
  isNextPageLoading = false;
  startVisitSubscription: Subscription;
  backButtonText = APP_STRINGS.SEARCH_TEST_STATION;

  constructor(
    // public navCtrl: NavController,
    private router: Router,
    public alertCtrl: AlertController,
    private callNumber: CallNumber,
    private visitService: VisitService,
    private openNativeSettings: OpenNativeSettings,
    private loadingCtrl: LoadingController,
    private authenticationService: AuthenticationService,
    private analyticsService: AnalyticsService,
    public appService: AppService,
    private logProvider: LogsProvider
  ) {
  }

  ionViewWillEnter(){
    this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_STATION_DETAILS);
  }

  async confirmStartVisit() {
    const LOADING = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    this.isNextPageLoading = true;

    const { oid } = this.authenticationService.tokenInfo;
    await LOADING.present();
    this.startVisitSubscription = this.visitService.startVisit(this.testStation).subscribe(
      async (data) => {
        this.logProvider.dispatchLog({
          type: 'info',
          message: `${oid} - ${data.status} ${data.statusText} for API call to ${data.url}`,
          timestamp: Date.now()
        });

        this.isNextPageLoading = false;
        await LOADING.dismiss();
        this.startVisitSubscription.unsubscribe();
        this.visitService.createVisit(this.testStation, data.body.id);
        await this.router.navigate([PAGE_NAMES.VISIT_TIMELINE_PAGE], {state: {testStation: this.testStation}});
      },
      async (error) => {
        this.logProvider.dispatchLog({
          type: 'error-visitService.startVisit-confirmStartVisit in test-station-details.ts',
          message: `${oid} - failed making a call to start a visit - ${JSON.stringify(error)}`,
          timestamp: Date.now()
        });

        this.isNextPageLoading = false;
        await LOADING.dismiss();

        await this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.START_ACTIVITY_FAILED
        });

        if (error && error.error === AUTH.INTERNET_REQUIRED) {
          const TRY_AGAIN_ALERT = await this.alertCtrl.create({
            header: APP_STRINGS.UNABLE_TO_START_VISIT,
            message: APP_STRINGS.NO_INTERNET_CONNECTION,
            buttons: [
              {
                text: APP_STRINGS.SETTINGS_BTN,
                handler: () => {
                  this.openNativeSettings.open('settings');
                }
              },
              {
                text: APP_STRINGS.TRY_AGAIN_BTN,
                handler: () => {
                  this.confirmStartVisit();
                }
              }
            ]
          });
          await TRY_AGAIN_ALERT.present();
        }
      }
    );
  }

  async reportIssueHandler() {
    this.nextAlert = true;
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.REPORT_TITLE,
      message: APP_STRINGS.SPEAK_TO_TTL,
      buttons: [APP_STRINGS.OK]
    });
    await alert.present();
    const didDismiss = await alert.onDidDismiss();
    if (didDismiss) {
      this.nextAlert = false;
      this.changeOpacity = false;
    }

  }

  async startVisit(): Promise<void> {
    this.changeOpacity = true;
    const confirm = await this.alertCtrl.create({
      header: APP_STRINGS.TEST_STATION_SAFETY,
      // eslint-disable-next-line max-len
      message: `Confirm that you are at ${this.testStation.testStationName} (${this.testStation.testStationPNumber}) and that it is suitable to begin testing before continuing.`,
      cssClass: this.appService.isAccessibilityTextZoomEnabled()
        ? 'accessibility-limit-message-height'
        : '',
      buttons: [
        {
          text: APP_STRINGS.CONFIRM,
          cssClass: 'bold-action-button',
          handler: () => {
            this.confirmStartVisit();
          }
        },
        {
          text: APP_STRINGS.REPORT_ISSUE,
          cssClass: 'danger-action-button',
          handler: () => {
            this.reportIssueHandler();
          }
        },
        {
          text: APP_STRINGS.CANCEL,
          cssClass: 'not-bold-action-button'
        }
      ]
    });
    await confirm.present();
    const didDismiss = await confirm.onDidDismiss();
    if (didDismiss) {
      if (!this.nextAlert) {
        this.changeOpacity = false;
      }
    }

  }

  async callPhoneNumber(): Promise<void> {
    const confirm = await this.alertCtrl.create({
      header: `${this.testStation.testStationContactNumber}`,
      buttons: [
        {
          text: APP_STRINGS.CANCEL
        },
        {
          text: APP_STRINGS.CALL,
          handler: () => {
            this.callNumber.callNumber(this.testStation.testStationContactNumber, true);
          }
        }
      ]
    });
    await confirm.present();
  }
}
