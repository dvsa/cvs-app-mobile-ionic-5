import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { VisitModel } from '@models/visit/visit.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_EVENTS,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_VALUE,
  APP_STRINGS,
  DATE_FORMAT,
  DEFICIENCY_CATEGORY,
  LOCAL_STORAGE,
  LOG_TYPES,
  ODOMETER_METRIC,
  PAGE_NAMES,
  TEST_REPORT_STATUSES,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS,
  TIR_CERTIFICATE_NUMBER_PREFIXES,
  VEHICLE_TYPE
} from '@app/app.enums';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { TestTypesFieldsMetadata } from '@assets/app-data/test-types-data/test-types-fields.metadata';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestModel } from '@models/tests/test.model';
import { TestResultService } from '@providers/test-result/test-result.service';
import { TestService } from '@providers/test/test.service';
import { forkJoin, Observable, throwError } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { VisitService } from '@providers/visit/visit.service';
import { catchError } from 'rxjs/operators';
import { StorageService } from '@providers/natives/storage.service';
import { DefectsService } from '@providers/defects/defects.service';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { ActivityService } from '@providers/activity/activity.service';
import { TestResultModel } from '@models/tests/test-result.model';
import { RoadworthinessTestTypesData } from '@assets/app-data/test-types-data/roadworthiness-test-types.data';
import { AdrTestTypesData } from '@assets/app-data/test-types-data/adr-test-types.data';
import { AppService, AnalyticsService } from '@providers/global';
import { TirTestTypesData } from '@assets/app-data/test-types-data/tir-test-types.data';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { LogsProvider } from '@store/logs/logs.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NativePageTransitions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

@Component({
  selector: 'page-test-review',
  templateUrl: 'test-review.html',
  styleUrls: ['test-review.scss']
})
export class TestReviewPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  visit: VisitModel;
  latestTest: TestModel;
  completedFields = {};
  appStrings;
  dateFormat;
  testTypeResults: typeof TEST_TYPE_RESULTS = TEST_TYPE_RESULTS;
  deficiencyCategory;
  submitInProgress = false;
  isTestSubmitted: string;
  vehicleBeingReviewed: number;
  vehicle: VehicleModel;
  roadworthinessTestTypesIds: string[] = RoadworthinessTestTypesData.RoadworthinessTestTypesIds;
  adrTestTypesIds: string[] = AdrTestTypesData.AdrTestTypesDataIds;
  tirTestTypesIds: string[] = TirTestTypesData.TirTestTypesDataIds;
  TIR_CERTIFICATE_NUMBER_PREFIXES: typeof TIR_CERTIFICATE_NUMBER_PREFIXES = TIR_CERTIFICATE_NUMBER_PREFIXES;
  backButtonText: string;
  extras: NavigationExtras;
  previousExtras: NavigationExtras;

  constructor(
    public navCtrl: NavController,
    public visitService: VisitService,
    public commonFunctions: CommonFunctionsService,
    public defectsService: DefectsService,
    private vehicleService: VehicleService,
    private alertCtrl: AlertController,
    private testResultService: TestResultService,
    private openNativeSettings: OpenNativeSettings,
    private testService: TestService,
    public loadingCtrl: LoadingController,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private analyticsService: AnalyticsService,
    private activityService: ActivityService,
    public appService: AppService,
    private testTypeService: TestTypeService,
    private logProvider: LogsProvider,
    private router: Router,
    private nativePageTransitions: NativePageTransitions,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.appStrings = APP_STRINGS;
      this.dateFormat = DATE_FORMAT;
      this.testTypeResults = TEST_TYPE_RESULTS;
      this.deficiencyCategory = DEFICIENCY_CATEGORY;
      this.visit = this.visitService.visit;
      this.latestTest = this.visitService.getLatestTest();

      this.extras = this.router.getCurrentNavigation().extras;
      if (this.extras.state) {
        this.vehicleBeingReviewed = this.extras.state.vehicleBeingReviewed || 0;
        this.backButtonText = this.extras.state.backButtonText;
        this.vehicle = this.latestTest.vehicles[this.vehicleBeingReviewed];
        if (this.latestTest.vehicles[0] !== this.vehicle) {
          this.previousExtras = this.extras.state.previousExtras;
        }
      }
    });
    this.storageService.watchStorage().subscribe(() => {
      this.isTestSubmitted = localStorage.getItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
    });
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_REVIEW);
    for (const testType of this.vehicle.testTypes) {
      this.testTypeService.fixDateFormatting(testType);
      await this.checkMissingTestTypeMandatoryFields(testType);
    }

  }

  async goBack() {
    if (this.latestTest.vehicles[0] === this.vehicle) {
      await this.goBackToTestCreatePage();
    } else {
      //non-async so animation is correct
      this.nativePageTransitions.slide({
        direction: 'right',
        duration: 200,
      });
      await this.navCtrl.navigateBack([PAGE_NAMES.TEST_REVIEW_PAGE] , this.previousExtras);
    }
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType.toLowerCase();
  }

  getOdometerStringToBeDisplayed(vehicle) {
    const unit = vehicle.odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
    return vehicle.odometerReading
      ? this.vehicleService.formatOdometerReadingValue(vehicle.odometerReading) + ' ' + unit
      : '';
  }

  completeFields(testType) {
    if (testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] =
        testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] =
        testType[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];
    }
    if (testType[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
      this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] =
        testType[TEST_TYPE_INPUTS.SIC_LAST_DATE];
    }
  }

  getTestTypeOptionalFieldsToDisplay(testType: TestTypeModel, field) {
    const testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (const testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (testType.testTypeId === testTypeFieldMetadata.testTypeId) {
        return field === 'defects'
          ? testTypeFieldMetadata.hasDefects
          : field === 'specialistDefects'
          ? testTypeFieldMetadata.hasSpecialistDefects
          : testTypeFieldMetadata.hasNotes;
      }
    }
  }

  async openTestDetailsPage(vehicle, testType) {
    this.completeFields(testType);
    await this.router.navigate([PAGE_NAMES.TEST_COMPLETE_PAGE], {
      state: {
        vehicle,
        vehicleTest: testType,
        completedFields: this.completedFields,
        errorIncomplete: false,
        previousPageName: PAGE_NAMES.TEST_REVIEW_PAGE,
        fromTestReview: true,
      }
    });
  }

  async goBackToTestCreatePage() {
    await this.navCtrl.navigateBack([PAGE_NAMES.TEST_CREATE_PAGE]);
  }

  isSpecialistTestTypeCompleted(testType: TestTypeModel): boolean {
    // specialist test-types WITHOUT certificate number with custom defects incomplete
    if (
      this.testTypeService.isSpecialistTestType(testType.testTypeId) &&
      !(
        this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
          testType.testTypeId
        ) || this.testTypeService.isSpecialistPartOfCoifTestTypes(testType.testTypeId)
      ) &&
      !this.testTypeService.areSpecialistCustomDefectsCompleted(testType)
    ) {
      return false;
    }
    // specialist test-types WITH certificate number with certificate number missing or custom defects incomplete
    if (
      (this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
          testType.testTypeId
      ) ||
        this.testTypeService.isSpecialistPartOfCoifTestTypes(testType.testTypeId)) &&
      (!testType.certificateNumber ||
        !this.testTypeService.areSpecialistCustomDefectsCompleted(testType))
    ) {
      return false;
    }
    return true;
  }

  async checkMissingTestTypeMandatoryFields(testType: TestTypeModel): Promise<void> {
    if (this.adrTestTypesIds.indexOf(testType.testTypeId) !== -1) {
      if (
        testType.testResult === TEST_TYPE_RESULTS.PASS &&
        (!testType.certificateNumber ||
          (testType.certificateNumber && testType.certificateNumber.length < 6) ||
          !testType.testExpiryDate)
      ) {
        await this.goBackToTestCreatePage();
      }
    } else if (this.testTypeService.isTirTestType(testType.testTypeId)) {
      if (
        testType.testResult === TEST_TYPE_RESULTS.PASS &&
        (!testType.certificateNumber ||
          (testType.certificateNumber && testType.certificateNumber.length < 5))
      ) {
        await this.goBackToTestCreatePage();
      }
    } else if (!this.isSpecialistTestTypeCompleted(testType)) {
      await this.goBackToTestCreatePage();
    }
  }

  /**
   * Handler for the next button
   * Go to next vehicle if there are vehicles left, otherwise submit test
   */
  async goToNextPage() {
    if (this.vehicleBeingReviewed < this.latestTest.vehicles.length - 1) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      //non-async so animation is correct
      this.nativePageTransitions.slide({
        direction: 'left',
        duration: 200,
      });
      await this.router.navigate([PAGE_NAMES.TEST_REVIEW_PAGE], {
        state: {
          vehicleBeingReviewed: this.vehicleBeingReviewed + 1,
          backButtonText: this.title,
          previousExtras: this.extras
        }
      });
    } else {
      await this.presentConfirmAlert();
    }
  }

  async goToTestCreatePage() {
    await this.router.navigate([PAGE_NAMES.TEST_CREATE_PAGE]);
  }

  /**
   * Handler for the submit button
   * This will display the alert to confirm the test submission
   */
  async presentConfirmAlert() {
    if (!this.submitInProgress) {
      const ALERT = await this.alertCtrl.create({
        header: APP_STRINGS.SUBMIT_TEST,
        message: APP_STRINGS.SUBMIT_TEST_MESSAGE,
        buttons: [
          {
            text: APP_STRINGS.CANCEL,
            cssClass: 'cancel-test-submission-btn',
            handler: () => {
              this.submitInProgress = false;
            }
          },
          {
            text: APP_STRINGS.SUBMIT,
            cssClass: 'confirm-test-submission-btn',
            handler: async () => {
              this.storageService.setItem(LOCAL_STORAGE.IS_TEST_SUBMITTED, 'true');
              this.submitInProgress = true;
              this.latestTest.status = TEST_REPORT_STATUSES.SUBMITTED;
              this.testService.endTestReport(this.latestTest);
              await this.onSubmit(this.latestTest);
            }
          }
        ]
      });
      await ALERT.present();
    }
  }

  /**
   * Before submitting all the tests, check if the visit is still open or if it was closed from the backend.
   * If the visit is open, proceed. If closed, show popup and clean up.
   */
  async onSubmit(test: TestModel): Promise<void> {
    const LOADING = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await LOADING.present();

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
            await this.onSubmit(test);
          }
        }
      ]
    });

    this.activityService.isVisitStillOpen().subscribe(
      async (response) => {
        if (response && response.body === false) {
          await this.visitService.createDataClearingAlert(LOADING);
          const { oid } = this.authenticationService.tokenInfo;
          this.logProvider.dispatchLog({
            type: 'activityService.isVisitStillOpen in test-review.ts',
            message: `${oid} - attempted to submit tests when visit no longer open - response was: ${JSON.stringify(response)}`,
            timestamp: Date.now()
          });
        } else {
          this.submitTests(test, LOADING, TRY_AGAIN_ALERT);
        }
      },
      async (isVisitStillOpenError) => {
        await LOADING.dismiss();
        await this.showTryAgainAlert(TRY_AGAIN_ALERT);
      }
    );
  }

  async showTryAgainAlert(TRY_AGAIN_ALERT) {
    await TRY_AGAIN_ALERT.present();
    const didDismiss = await TRY_AGAIN_ALERT.onDidDismiss();
    if (didDismiss) {
      this.submitInProgress = false;
    }
  }

  /**
   * Algorithm to submit a test containing multiple vehicles.
   * For each vehicle, this creates a separate call to test-results
   *
   */
  submitTests(test: TestModel, LOADING: HTMLIonLoadingElement, TRY_AGAIN_ALERT: HTMLIonAlertElement): void {
    const { oid } = this.authenticationService.tokenInfo;
    const stack: Observable<any>[] = [];
    const testResultsArr: TestResultModel[] = [];
    let activitiesSubmitted = true;

    for (const vehicle of test.vehicles) {
      const testResult = this.testResultService.createTestResult(this.visit, test, vehicle);
      testResultsArr.push(testResult);
      stack.push(
        this.testResultService.submitTestResult(testResult).pipe(
          catchError((error: any) => {
            this.logProvider.dispatchLog({
              type: 'error',
              message: `${oid} - ${JSON.stringify(
                error
              )} for API call with the body message ${JSON.stringify(testResult)}`,
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
          category: ANALYTICS_EVENT_CATEGORIES.TEST,
          event: ANALYTICS_EVENTS.SUBMIT_TEST
        });

        for (const testResult of testResultsArr) {
          const activity = this.activityService.createActivityBodyForCall(
            this.visitService.visit,
            testResult,
            false
          );
          for (const testType of testResult.testTypes) {
            await this.analyticsService.logEvent({
              category: ANALYTICS_EVENT_CATEGORIES.TEST,
              event: ANALYTICS_EVENTS.SUBMITTED_TESTS,
              label: testType.testTypeName
            });
          }
          this.activityService.submitActivity(activity).subscribe(
            async (resp) => {
              this.logProvider.dispatchLog({
                type: LOG_TYPES.INFO,
                message: `${oid} - ${resp.status} ${resp.statusText} for API call to ${resp.url}`,
                timestamp: Date.now()
              });

              const activityIndex = this.activityService.activities
                .map((act) => activity.endTime)
                .indexOf(testResult.testStartTimestamp);
              if (activityIndex > -1) {
                this.activityService.activities[activityIndex].id = resp.body.id;
              }
              await this.activityService.updateActivities();
              await this.visitService.updateVisit();
            },
            async (error) => {
              this.logProvider.dispatchLog({
                type: `${LOG_TYPES.ERROR}-activityService.submitActivity in submit-test-review.ts`,
                message: `${oid} - ${JSON.stringify(error)}`,
                timestamp: Date.now()
              });
              activitiesSubmitted = false;
              await this.trackErrorOnTestSubmission(ANALYTICS_VALUE.WAIT_ACTIVITY_SUBMISSION_FAILED);
            }
          );
        }
        await LOADING.dismiss();
        if (activitiesSubmitted) {
          this.storageService.removeItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
          this.submitInProgress = false;
          await this.router.navigate([PAGE_NAMES.CONFIRMATION_PAGE], {
            state: {
              testerEmailAddress: this.visit.testerEmail
            }
          });
        } else {
          await this.showTryAgainAlert(TRY_AGAIN_ALERT);
        }
      },
      async (error) => {
        await LOADING.dismiss();
        await this.showTryAgainAlert(TRY_AGAIN_ALERT);
        await this.trackErrorOnTestSubmission(ANALYTICS_VALUE.TEST_SUBMISSION_FAILED);
      }
    );
  }

  private async trackErrorOnTestSubmission(value: string) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
      event: ANALYTICS_EVENTS.TEST_ERROR,
      label: value
    });
  }

  getCountryStringToBeDisplayed(vehicle: VehicleModel) {
    return this.commonFunctions.getCountryStringToBeDisplayed(vehicle);
  }

  isVehicleOfType(vehicle: VehicleModel, ...vehicleType: VEHICLE_TYPE[]) {
    return this.commonFunctions.checkForMatchInArray(vehicle.techRecord.vehicleType, vehicleType);
  }

  get nextButtonText(): string {
    switch (this.latestTest.vehicles.length) {
      case 1:
        return APP_STRINGS.SUBMIT_TEST;
      case this.vehicleBeingReviewed + 1:
        return APP_STRINGS.SUBMIT_TESTS;
      default:
        return APP_STRINGS.NEXT_VEHICLE;
    }
  }

  get title(): string {
    return `Test review ${
      this.latestTest.vehicles.length > 1
        ? ' (' + (this.vehicleBeingReviewed + 1) + ' of ' + this.latestTest.vehicles.length + ')'
        : ''
    }`;
  }
}
