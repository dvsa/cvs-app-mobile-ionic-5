import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import { TestService } from '@providers/test/test.service';
import { VisitService } from '@providers/visit/visit.service';
import { VisitModel } from '@models/visit/visit.model';
import { StateReformingService } from '@providers/global/state-reforming.service';
import {
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_EVENTS,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_VALUE,
  APP_STRINGS,
  STORAGE,
  TEST_REPORT_STATUSES,
  TEST_TYPE_RESULTS,
  AUTH,
  VISIT,
  LOG_TYPES,
  VEHICLE_TYPE,
  PAGE_NAMES
} from '@app/app.enums';
import { StorageService } from '@providers/natives/storage.service';
import { AppService, AnalyticsService } from '@providers/global';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { ActivityModel } from '@models/visit/activity.model';
import { ActivityService } from '@providers/activity/activity.service';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { from, Observable, Subscription } from 'rxjs';
import { LogsProvider } from '@store/logs/logs.service';
import { of } from 'rxjs/observable/of';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-visit-timeline',
  templateUrl: 'visit-timeline.html',
  styleUrls: ['visit-timeline.scss'],
})
export class VisitTimelinePage implements OnInit, OnDestroy {
  visit: VisitModel;
  timeline: any[];
  TEST_REPORT_STATUS = TEST_REPORT_STATUSES;
  TEST_TYPE_RESULT = TEST_TYPE_RESULTS;
  VISIT_TYPE = VISIT;
  changeOpacity = false;
  oid: string;
  timeout;
  isCreateTestEnabled = true;
  platformSubscription: Subscription;

  loading: any;
  confirmVisit$: Observable<any>;
  testStation: any;

  constructor(
    public stateReformingService: StateReformingService,
    public loadingCtrl: LoadingController,
    public appService: AppService,
    private testReportService: TestService,
    public visitService: VisitService,
    public activityService: ActivityService,
    private alertCtrl: AlertController,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private openNativeSettings: OpenNativeSettings,
    private analyticsService: AnalyticsService,
    private modalCtrl: ModalController,
    private formatVrmPipe: FormatVrmPipe,
    private logProvider: LogsProvider,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.timeline = [];
    // this.platform.ready().then(() => {
    //   this.platformSubscription = this.platform.resume.subscribe(() => {
    //     this.waitTimeHandler();
    //   })
    // });
  }

  async ngOnInit() {
    this.route.params.subscribe(async val => {
      this.isCreateTestEnabled = true;
      this.testStation = this.router.getCurrentNavigation().extras.state.testStation;
      this.visit = Object.keys(this.visitService.visit).length
        ? this.visitService.visit
        : await this.visitService.createVisit(this.testStation);
    });
    //@TODO - Ionic 5 - Reinstate this
    // this.stateReformingService.saveNavStack(this.navCtrl);
  }

  ngOnDestroy(): void {
  }

  ionViewWillEnter() {
    this.createTimeline();
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VISIT_TIMELINE);
  }

  async endVisit(): Promise<void> {
   await this.showConfirm(this.visit);
  }

  async createNewTestReport(): Promise<void> {
    const testData = this.testReportService.createTest();
    await this.router.navigate([PAGE_NAMES.VEHICLE_LOOKUP_PAGE], {
      state: {
        testData,
        previousPageName: PAGE_NAMES.VISIT_TIMELINE_PAGE,
        testStation: this.testStation
      }
    });
  }

  createTimeline(): void {
    this.timeline = [];
    const tempTimeline = [];
    const activities = this.activityService.getActivities();
    activities.forEach((activity) => {
      tempTimeline.push(activity);
    });

    const testReports = this.visitService.getTests();
    testReports.forEach((testReport) => {
      tempTimeline.push(testReport);
    });

    this.timeline = [...tempTimeline].sort((a, b) => Date.parse(a.startTime) - Date.parse(b.startTime));
  }

  async showConfirm(visit: VisitModel): Promise<void> {
    this.changeOpacity = true;
    let alert: any = null;

    if (this.activityService.checkWaitTimeReasons(this.activityService.activities)) {
      alert = await this.alertCtrl.create({
        header: APP_STRINGS.END_VISIT_WAITING_TITLE,
        message: APP_STRINGS.END_VISIT_WAITING_MSG,
        buttons: [APP_STRINGS.OK]
      });
    } else {
      alert = await this.alertCtrl.create({
        header: APP_STRINGS.END_VISIT_TITLE,
        message: `${APP_STRINGS.END_VISIT_MSG}${visit.testStationName}.`,
        buttons: [
          {
            text: APP_STRINGS.CANCEL,
            cssClass: 'cancel-end-visit-btn',
            role: APP_STRINGS.CANCEL.toLowerCase()
          },
          {
            text: APP_STRINGS.END_VISIT_TITLE,
            cssClass: 'confirm-end-visit-btn',
            handler: () => {
              this.confirmVisit$ = this.confirmEndVisit$();
            }
          }
        ]
      });
    }
    await alert.present();
    const didDismiss = await alert.onDidDismiss();
    if (didDismiss) {
      this.changeOpacity = false;
    }
  }

  async showLoading(loadingText: string) {
    if (loadingText) {
      this.loading = await this.loadingCtrl.create({
        message: loadingText
      });

      await this.loading.present();
    } else {
      await this.loading.dismiss();
    }
  }

  getVehicleIdentifier(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType === VEHICLE_TYPE.TRL
      ? vehicle.trailerId
      : this.formatVrmPipe.transform(vehicle.vrm);
  }

  confirmEndVisit$(): Observable<any> {
    this.isCreateTestEnabled = false;

    this.oid = this.authenticationService.tokenInfo.oid;

    return this.visitService.endVisit(this.visit.id).pipe(
      tap(async () => { await this.showLoading(APP_STRINGS.END_VISIT_LOADING); }),
      mergeMap( (endVisitResp) => {
        const {wasVisitAlreadyClosed} = endVisitResp.body;

        this.logProvider.dispatchLog({
          type: LOG_TYPES.INFO,
          message: `${this.oid} - ${endVisitResp.status} ${endVisitResp.statusText}
          for API call to ${endVisitResp.url}. Visit closed automatically ${wasVisitAlreadyClosed}`,
          timestamp: Date.now()
        });

        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.VISIT,
          event: ANALYTICS_EVENTS.SUBMIT_VISIT
        });

        clearTimeout(this.activityService.waitTimer);

        return wasVisitAlreadyClosed
          ? this.siteAlreadyClosedAlert(wasVisitAlreadyClosed)
          : of(wasVisitAlreadyClosed); /** false - manual intervention*/
      }),
      filter((closedState) => !closedState),
      mergeMap(() => this.activityService.createActivityToPost$(
        this.timeline, this.visit, this.oid,
      )),
      mergeMap((activities: ActivityModel[]) => this.createActivityReasonsToPost$(activities)),
      catchError(async (error) => {
        await this.showLoading('');

        this.logProvider.dispatchLog({
          type: 'error-visitService.endVisit-confirmEndVisit in visit-timeline.ts',
          message: `${this.oid} - ${JSON.stringify(error)}`,
          timestamp: Date.now()
        });

        await this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.ENDING_ACTIVITY_FAILED
        });

        return this.endVisitError$(error);
      })
    );
  }

  siteAlreadyClosedAlert(status: boolean): Observable<boolean> {
    const NOTIFICATION_ALERT = this.alertCtrl.create({
      header: APP_STRINGS.SITE_VISIT_CLOSED_TITLE,
      message: APP_STRINGS.SITE_VISIT_CLOSED_MESSAGE,
      buttons: [
        {
          text: APP_STRINGS.OK,
          handler: async () => {
            await this.onUpdateActivityReasonsSuccess();
          }
        }
      ]
    });
    NOTIFICATION_ALERT.then(async (alert) => {
      await this.showLoading('');
      await alert.present();
    });
    return of(status);
  }

  private endVisitError$(receivedErr: any): Observable<any> {
    if (receivedErr) {
      if (receivedErr.error === AUTH.INTERNET_REQUIRED) {
        const TRY_AGAIN_ALERT = this.alertCtrl.create({
          header: APP_STRINGS.UNABLE_TO_END_VISIT,
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
                this.confirmVisit$ = this.confirmEndVisit$();
              }
            }
          ]
        });
        return of(TRY_AGAIN_ALERT);
      } else {
        return of(this.onUpdateActivityReasonsSuccess());
      }
    }
  }

  /**
   * Begins the counter for the wait time handling service
   */
  waitTimeHandler(): void {
    if (this.activityService.canAddOtherWaitingTime(this.timeline)) {
      if (this.activityService.have5MinutesPassedSinceVisitOrLastTest(this.visit)) {
        this.activityService.createWaitTime(this.timeline, this.visit);
      }
      else if (!this.activityService.waitTimeStarted) {
        const counterTime: number = this.activityService.counterTime -
          this.activityService.minutesPassedSinceVisitOrLastTest(this.visit);
        clearTimeout(this.activityService.waitTimer);
        this.activityService.waitTimer = window.setTimeout(
          () => {
            this.activityService.createWaitTime(this.timeline, this.visit);
          },
          counterTime * 1000 * 60,
          []
        );
      }
    }
  }

  /**
   * displays a modal to allow the editing of a wait time
   *
   * @param activity the wait time being clicked
   */
  //@TODO - Ionic 5 - reinstate this
  async editWaitTime(activity: ActivityModel) {
    // const MODAL = this.modalCtrl.create(PAGE_NAMES.WAIT_TIME_REASONS_PAGE, {
    //   waitActivity: activity
    // });
    // MODAL.onDidDismiss((data) => {
    //   activity.waitReason = data.waitActivity.waitReason;
    //   activity.notes = data.waitActivity.notes;
    //   this.activityService.updateActivities();
    // });
    // if (activity.activityType === VISIT.ACTIVITY_TYPE_WAIT) {
    //   await MODAL.present();
    // }
  }

  /**
   * removes items from local storage and navigates to the confirmation page
   *
   * @return true when function has finished
   */
  async onUpdateActivityReasonsSuccess(): Promise<boolean> {
    await this.storageService.delete(STORAGE.VISIT);
    await this.storageService.delete(STORAGE.STATE);
    await this.storageService.delete(STORAGE.ACTIVITIES);
    this.activityService.waitTimeStarted = false;
    this.visitService.visit = {} as VisitModel;
    this.activityService.activities = [];
    await this.showLoading('');

    await this.router.navigate([PAGE_NAMES.CONFIRMATION_PAGE], {
      state: {
        testStation: this.testStation,
        isEndVisit: true
      }
    });
    return true;
  }

  /**
   * updates each wait time with the wait reason that was selected by the user
   *
   * @param activities
   * @return
   */
  createActivityReasonsToPost$(activities: ActivityModel[]): Observable<any> {
    const activityWithReasons = this.activityService.createActivitiesForUpdateCall(activities);
    if (activityWithReasons.length > 0) {
      return this.activityService.updateActivityReasons(activityWithReasons).pipe(
        map(async (activityReasonResp) => {
          this.logProvider.dispatchLog({
            type: LOG_TYPES.INFO,
            message: `${this.oid} - ${activityReasonResp.status} ${activityReasonResp.statusText}
            for API call to ${activityReasonResp.url}`,
            timestamp: Date.now()
          });
          return await this.onUpdateActivityReasonsSuccess();
        }),
        catchError(async (error) => {
          await this.showLoading('');

          this.logProvider.dispatchLog({
            type: `${LOG_TYPES.ERROR}-activityService.updateActivityReasons in visit-timeline.ts`,
            message: `${this.oid} - ${JSON.stringify(error)}`,
            timestamp: Date.now()
          });

          return of(null);
        })
      );
    } else {
      return from(this.onUpdateActivityReasonsSuccess());
    }
  }
}
