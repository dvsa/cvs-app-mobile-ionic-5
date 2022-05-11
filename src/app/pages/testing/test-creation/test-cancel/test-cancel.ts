import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE
} from '@app/app.enums';
import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { TestModel } from '@models/tests/test.model';
import { TestService } from '@providers/test/test.service';
import {
  ANALYTICS_SCREEN_NAMES,
  APP_STRINGS,
  LOG_TYPES,
  PAGE_NAMES,
  TEST_REPORT_STATUSES
} from '@app/app.enums';
import { TestResultService } from '@providers/test-result/test-result.service';
import { VisitService } from '@providers/visit/visit.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { catchError } from 'rxjs/operators';
import { ActivityService } from '@providers/activity/activity.service';
import { TestResultModel } from '@models/tests/test-result.model';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService } from '@providers/global';
import { Router } from '@angular/router';

@Component({
  selector: 'page-test-cancel',
  templateUrl: 'test-cancel.html',
  styleUrls: ['test-cancel.scss']
})
export class TestCancelPage implements OnInit {
  testData: TestModel;
  cancellationReason = '';
  changeOpacity;
  nextAlert;
  tryAgain = false;

  constructor(
    public navCtrl: NavController,
    private testReportService: TestService,
    private alertCtrl: AlertController,
    private testResultService: TestResultService,
    private openNativeSettings: OpenNativeSettings,
    private visitService: VisitService,
    private loadingCtrl: LoadingController,
    private authenticationService: AuthenticationService,
    private analyticsService: AnalyticsService,
    private activityService: ActivityService,
    private logProvider: LogsProvider,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.testData = this.router.getCurrentNavigation().extras.state.test;
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_CANCEL);
  }

  async submitHandler() {
    this.testData.status = TEST_REPORT_STATUSES.CANCELLED;
    this.testData.reasonForCancellation = this.cancellationReason;
    this.testReportService.endTestReport(this.testData);
    this.nextAlert = true;
    await this.submit(this.testData);
  }

  async onSubmit() {
    this.changeOpacity = true;
    let alert;
    if (this.isValidReason()) {
      alert = await this.alertCtrl.create({
        header: 'Cancel test',
        message: 'You will not be able to make changes to this test after it has been cancelled.',
        buttons: [
          {
            text: 'Back'
          },
          {
            text: 'Submit',
            cssClass: 'danger-action-button',
            handler: () => {
              this.submitHandler();
            }
          }
        ]
      });
    } else {
      this.cancellationReason = '';
      alert = await this.alertCtrl.create({
        header: 'Reason not entered',
        message: 'You must add a reason for cancelling this test to submit the cancellation.',
        buttons: ['Ok']
      });
    }
    await alert.present();
    const didDismiss = await alert.onDidDismiss();
    if (didDismiss) {
      this.changeOpacity = this.nextAlert;
    }
  }

  async submit(test) {
    const stack: Observable<any>[] = [];
    const { oid } = this.authenticationService.tokenInfo;
    let activitiesSubmitted = true;

    const TRY_AGAIN_ALERT = await this.alertCtrl.create({
      header: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
      message: APP_STRINGS.NO_INTERNET_CONNECTION,
      buttons: [
        {
          text: APP_STRINGS.SETTINGS_BTN,
          handler: async () => {
            await this.openNativeSettings.open('settings');
          }
        },
        {
          text: APP_STRINGS.TRY_AGAIN_BTN,
          handler: async () => {
            this.tryAgain = true;
            await this.submit(this.testData);
          }
        }
      ]
    });

    const LOADING = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await LOADING.present();

    const testResultsArr: TestResultModel[] = [];

    for (const vehicle of test.vehicles) {
      const testResult = this.testResultService.createTestResult(
        this.visitService.visit,
        test,
        vehicle
      );

      testResultsArr.push(testResult);

      stack.push(
        this.testResultService.submitTestResult(testResult).pipe(
          catchError((error: any) => {
            this.logProvider.dispatchLog({
              type: LOG_TYPES.ERROR,
              message: `${oid} - ${JSON.stringify(
                error
              )} for API call to with the body message ${JSON.stringify(testResult)}`,
              timestamp: Date.now()
            });

            return throwError(error);
          })
        )
      );
    }

    forkJoin(stack).subscribe(
      async (response: any) => {
        this.logProvider.dispatchLog({
          type: 'info',
          message: `${oid} - ${response[0].status} ${response[0].body} for API call to ${response[0].url}`,
          timestamp: Date.now()
        });

        await this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
          event: ANALYTICS_EVENTS.CANCEL_TEST
        });

        for (const testResult of testResultsArr) {
          const activity = this.activityService.createActivityBodyForCall(
            this.visitService.visit,
            testResult,
            false
          );
          this.activityService.submitActivity(activity).subscribe(
            async (resp) => {
              this.logProvider.dispatchLog({
                type: LOG_TYPES.INFO,
                message: `${oid} - ${resp.status} ${resp.statusText} for API call to ${resp.url}`,
                timestamp: Date.now()
              });

              const activityIndex = this.activityService.activities
                .map((currentActivity) => currentActivity.endTime)
                .indexOf(testResult.testStartTimestamp);
              if (activityIndex > -1) {
                this.activityService.activities[activityIndex].id = resp.body.id;
              }

              await this.activityService.updateActivities();
              await this.visitService.updateVisit();
            },
            async (error) => {
              this.logProvider.dispatchLog({
                type: `${LOG_TYPES.ERROR}-activityService.submitActivity in submit-test-cancel.ts`,
                message: `${oid} - ${JSON.stringify(error)}`,
                timestamp: Date.now()
              });

              await this.analyticsService.logEvent({
                category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
                event: ANALYTICS_EVENTS.TEST_ERROR,
                label: ANALYTICS_VALUE.WAIT_ACTIVITY_SUBMISSION_FAILED
              });
              activitiesSubmitted = false;

            }
          );
        }
        await LOADING.dismiss();
        if (activitiesSubmitted) {
          await this.router.navigate([PAGE_NAMES.VISIT_TIMELINE_PAGE]);
          // TODO - might need to change this
          // const views = this.navCtrl.getViews();
          // for (let i = views.length - 1; i >= 0; i--) {
          //   if (views[i].component.name === PAGE_NAMES.VISIT_TIMELINE_PAGE) {
          //     this.navCtrl.popTo(views[i]);
          //   }
          // }
        } else {
          await TRY_AGAIN_ALERT.present();
        }
      },
      async (error) => {
        await LOADING.dismiss();
        await TRY_AGAIN_ALERT.present();

        await this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.TEST_SUBMISSION_FAILED
        });

        const didDismiss = await TRY_AGAIN_ALERT.onDidDismiss();
        if (didDismiss) {
          if (!this.tryAgain) {
            this.nextAlert = this.changeOpacity = false;
          } else {
            this.tryAgain = false;
          }
        }
      }
    );
  }

  isValidReason() {
    return this.cancellationReason.trim().length > 0;
  }
}
