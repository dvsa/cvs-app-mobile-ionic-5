import { Component, OnInit } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  ModalController,
  NavController,
  NavParams,
  ViewController
} from 'ionic-angular';
import { VisitModel } from '../../../../models/visit/visit.model';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
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
} from '../../../../app/app.enums';
import { VehicleModel } from '../../../../models/vehicle/vehicle.model';
import { VehicleService } from '../../../../providers/vehicle/vehicle.service';
import { TestTypesFieldsMetadata } from '../../../../assets/app-data/test-types-data/test-types-fields.metadata';
import { TestTypeModel } from '../../../../models/tests/test-type.model';
import { TestModel } from '../../../../models/tests/test.model';
import { TestResultService } from '../../../../providers/test-result/test-result.service';
import { TestService } from '../../../../providers/test/test.service';
import { Observable } from 'rxjs';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { VisitService } from '../../../../providers/visit/visit.service';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../../../../providers/natives/storage.service';
import { DefectsService } from '../../../../providers/defects/defects.service';
import { AuthenticationService } from '../../../../providers/auth/authentication/authentication.service';
import { ActivityService } from '../../../../providers/activity/activity.service';
import { TestResultModel } from '../../../../models/tests/test-result.model';
import { RoadworthinessTestTypesData } from '../../../../assets/app-data/test-types-data/roadworthiness-test-types.data';
import { AdrTestTypesData } from '../../../../assets/app-data/test-types-data/adr-test-types.data';
import { AppService, AnalyticsService } from '../../../../providers/global';
import { TirTestTypesData } from '../../../../assets/app-data/test-types-data/tir-test-types.data';
import { TestTypeService } from '../../../../providers/test-type/test-type.service';
import { LogsProvider } from '../../../../modules/logs/logs.service';

@IonicPage()
@Component({
  selector: 'page-test-review',
  templateUrl: 'test-review.html'
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
  submitInProgress: boolean = false;
  isTestSubmitted: string;
  vehicleBeingReviewed: number;
  vehicle: VehicleModel;
  roadworthinessTestTypesIds: string[] = RoadworthinessTestTypesData.RoadworthinessTestTypesIds;
  adrTestTypesIds: string[] = AdrTestTypesData.AdrTestTypesDataIds;
  tirTestTypesIds: string[] = TirTestTypesData.TirTestTypesDataIds;
  TIR_CERTIFICATE_NUMBER_PREFIXES: typeof TIR_CERTIFICATE_NUMBER_PREFIXES = TIR_CERTIFICATE_NUMBER_PREFIXES;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public visitService: VisitService,
    public commonFunctions: CommonFunctionsService,
    public viewCtrl: ViewController,
    public defectsService: DefectsService,
    private vehicleService: VehicleService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private testResultService: TestResultService,
    private openNativeSettings: OpenNativeSettings,
    private testService: TestService,
    private loadingCtrl: LoadingController,
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private analyticsService: AnalyticsService,
    private activityService: ActivityService,
    public appService: AppService,
    private testTypeService: TestTypeService,
    private logProvider: LogsProvider
  ) {
    this.visit = this.visitService.visit;
    this.latestTest = this.visitService.getLatestTest();

    this.vehicleBeingReviewed = this.navParams.get('vehicleBeingReviewed') || 0;
    this.vehicle = this.latestTest.vehicles[this.vehicleBeingReviewed];
    this.vehicle.testTypes.forEach(testType => {
      this.testTypeService.fixDateFormatting(testType);
    });
  }

  ngOnInit(): void {
    this.appStrings = APP_STRINGS;
    this.dateFormat = DATE_FORMAT;
    this.testTypeResults = TEST_TYPE_RESULTS;
    this.deficiencyCategory = DEFICIENCY_CATEGORY;
    this.storageService.watchStorage().subscribe(() => {
      this.isTestSubmitted = localStorage.getItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
      this.isTestSubmitted
        ? this.viewCtrl.showBackButton(false)
        : this.viewCtrl.showBackButton(true);
    });

    this.viewCtrl.setBackButtonText(this.navParams.get('backButtonText') || APP_STRINGS.TEST);
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_REVIEW);
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType.toLowerCase();
  }

  getOdometerStringToBeDisplayed(vehicle) {
    let unit = vehicle.odometerMetric === ODOMETER_METRIC.KILOMETRES ? 'km' : 'mi';
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
    let testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (let testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (testType.testTypeId === testTypeFieldMetadata.testTypeId) {
        return field === 'defects'
          ? testTypeFieldMetadata.hasDefects
          : field === 'specialistDefects'
          ? testTypeFieldMetadata.hasSpecialistDefects
          : testTypeFieldMetadata.hasNotes;
      }
    }
  }

  /**
   * Opens a test overview page as a modal (sliding from bottom)
   */
  openTestDetailsPage(vehicle, testType) {
    let initialTestType = this.commonFunctions.cloneObject(testType);
    this.completeFields(testType);
    const MODAL = this.modalCtrl.create(PAGE_NAMES.COMPLETE_TEST_PAGE, {
      vehicle: vehicle,
      vehicleTest: testType,
      completedFields: this.completedFields,
      fromTestReview: true
    });
    MODAL.onDidDismiss((data) => this.checkMissingTestTypeMandatoryFields(data, initialTestType));
    MODAL.present();
  }

  popToTestCreatePage() {
    this.navCtrl.popTo(this.navCtrl.getViews().find((view) => view.id === 'TestCreatePage'));
  }

  isSpecialistTestTypeCompleted(
    changedTestType: TestTypeModel,
    initialTestType: TestTypeModel
  ): boolean {
    // specialist test-types WITHOUT certificate number with custom defects incomplete
    if (
      this.testTypeService.isSpecialistTestType(initialTestType.testTypeId) &&
      !(
        this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
          initialTestType.testTypeId
        ) || this.testTypeService.isSpecialistPartOfCoifTestTypes(initialTestType.testTypeId)
      ) &&
      !this.testTypeService.areSpecialistCustomDefectsCompleted(changedTestType)
    ) {
      return false;
    }
    // specialist test-types WITH certificate number with certificate number missing or custom defects incomplete
    if (
      (this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        initialTestType.testTypeId
      ) ||
        this.testTypeService.isSpecialistPartOfCoifTestTypes(initialTestType.testTypeId)) &&
      (!changedTestType.certificateNumber ||
        !this.testTypeService.areSpecialistCustomDefectsCompleted(changedTestType))
    ) {
      return false;
    }
    return true;
  }

  /**
   * Contains the mandatory fields logic used to pop to test-create page
   * @param changedTestType
   * @param initialTestType
   */
  checkMissingTestTypeMandatoryFields(
    changedTestType: TestTypeModel,
    initialTestType: TestTypeModel
  ): void {
    if (this.adrTestTypesIds.indexOf(initialTestType.testTypeId) !== -1) {
      if (
        changedTestType.testResult === TEST_TYPE_RESULTS.PASS &&
        (!changedTestType.certificateNumber ||
          (changedTestType.certificateNumber && changedTestType.certificateNumber.length < 6) ||
          !changedTestType.testExpiryDate)
      ) {
        this.popToTestCreatePage();
      }
    } else if (this.testTypeService.isTirTestType(initialTestType.testTypeId)) {
      if (
        changedTestType.testResult === TEST_TYPE_RESULTS.PASS &&
        (!changedTestType.certificateNumber ||
          (changedTestType.certificateNumber && changedTestType.certificateNumber.length < 5))
      ) {
        this.popToTestCreatePage();
      }
    } else if (!this.isSpecialistTestTypeCompleted(changedTestType, initialTestType)) {
      this.popToTestCreatePage();
    } else {
      if (initialTestType.certificateNumber && !changedTestType.certificateNumber) {
        this.popToTestCreatePage();
      }
    }
  }

  /**
   * Handler for the next button
   * Go to next vehicle if there are vehicles left, otherwise submit test
   */
  goToNextPage() {
    if (this.vehicleBeingReviewed < this.latestTest.vehicles.length - 1)
      this.navCtrl.push(PAGE_NAMES.TEST_REVIEW_PAGE, {
        vehicleBeingReviewed: this.vehicleBeingReviewed + 1,
        backButtonText: this.title
      });
    else this.presentConfirmAlert();
  }

  goToTestCreatePage() {
    this.navCtrl.push(PAGE_NAMES.TEST_CREATE_PAGE);
  }

  /**
   * Handler for the submit button
   * This will display the alert to confirm the test submission
   */
  presentConfirmAlert() {
    if (!this.submitInProgress) {
      const ALERT = this.alertCtrl.create({
        title: APP_STRINGS.SUBMIT_TEST,
        message: APP_STRINGS.SUBMIT_TEST_MESSAGE,
        buttons: [
          {
            text: APP_STRINGS.CANCEL,
            handler: () => {
              this.submitInProgress = false;
            }
          },
          {
            text: APP_STRINGS.SUBMIT,
            handler: () => {
              this.storageService.setItem(LOCAL_STORAGE.IS_TEST_SUBMITTED, 'true');
              this.submitInProgress = true;
              this.latestTest.status = TEST_REPORT_STATUSES.SUBMITTED;
              this.testService.endTestReport(this.latestTest);
              this.onSubmit(this.latestTest);
            }
          }
        ]
      });
      ALERT.present();
    }
  }

  /**
   * Before submitting all the tests, check if the visit is still open or if it was closed from the backend.
   * If the visit is open, proceed. If closed, show popup and clean up.
   */
  onSubmit(test: TestModel): void {
    const LOADING = this.loadingCtrl.create({
      content: 'Loading...'
    });
    LOADING.present();

    const TRY_AGAIN_ALERT = this.alertCtrl.create({
      title: APP_STRINGS.UNABLE_TO_SUBMIT_TESTS_TITLE,
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
            this.onSubmit(test);
          }
        }
      ]
    });
    TRY_AGAIN_ALERT.onDidDismiss(() => {
      this.submitInProgress = false;
    });

    this.activityService.isVisitStillOpen().subscribe(
      (response) => {
        if (response && response.body === false) {
          this.visitService.createDataClearingAlert(LOADING).present();
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
      (isVisitStillOpenError) => {
        LOADING.dismiss();
        TRY_AGAIN_ALERT.present();
      }
    );
  }

  /**
   * Algorithm to submit a test containing multiple vehicles.
   * For each vehicle, this creates a separate call to test-results
   *
   */
  submitTests(test: TestModel, LOADING: Loading, TRY_AGAIN_ALERT: Alert): void {
    const { oid } = this.authenticationService.tokenInfo;
    let stack: Observable<any>[] = [];
    let testResultsArr: TestResultModel[] = [];
    let activitiesSubmitted = true;

    for (let vehicle of test.vehicles) {
      let testResult = this.testResultService.createTestResult(this.visit, test, vehicle);
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

            return Observable.throw(error);
          })
        )
      );
    }

    Observable.forkJoin(stack).subscribe(
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

        for (let testResult of testResultsArr) {
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
            (resp) => {
              this.logProvider.dispatchLog({
                type: LOG_TYPES.INFO,
                message: `${oid} - ${resp.status} ${resp.statusText} for API call to ${resp.url}`,
                timestamp: Date.now()
              });

              let activityIndex = this.activityService.activities
                .map((activity) => activity.endTime)
                .indexOf(testResult.testStartTimestamp);
              if (activityIndex > -1)
                this.activityService.activities[activityIndex].id = resp.body.id;
              this.activityService.updateActivities();
              this.visitService.updateVisit();
            },
            (error) => {
              this.logProvider.dispatchLog({
                type: `${LOG_TYPES.ERROR}-activityService.submitActivity in submit-test-review.ts`,
                message: `${oid} - ${JSON.stringify(error)}`,
                timestamp: Date.now()
              });
              activitiesSubmitted = false;
              this.trackErrorOnTestSubmission(ANALYTICS_VALUE.WAIT_ACTIVITY_SUBMISSION_FAILED);
            }
          );
        }
        await LOADING.dismiss();
        if (activitiesSubmitted) {
          this.storageService.removeItem(LOCAL_STORAGE.IS_TEST_SUBMITTED);
          this.submitInProgress = false;
          await this.navCtrl.push(PAGE_NAMES.CONFIRMATION_PAGE, {
            testerEmailAddress: this.visit.testerEmail
          });
        } else {
          await TRY_AGAIN_ALERT.present();
        }
      },
      async (error) => {
        await LOADING.dismiss();
        await TRY_AGAIN_ALERT.present();

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
