import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
  IonItemSliding
} from '@ionic/angular';
import { TestModel } from '@models/tests/test.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { StateReformingService } from '@providers/global/state-reforming.service';
import { VisitService } from '@providers/visit/visit.service';
import { TestTypeModel } from '@models/tests/test-type.model';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_SCREEN_NAMES,
  ANALYTICS_VALUE,
  APP,
  APP_STRINGS,
  PAGE_NAMES,
  STORAGE,
  TEST_COMPLETION_STATUS,
  TEST_REPORT_STATUSES,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS,
  VEHICLE_TYPE
} from '@app/app.enums';
import { TestTypesFieldsMetadata } from '@assets/app-data/test-types-data/test-types-fields.metadata';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppService, AnalyticsService, AppAlertService } from '@providers/global';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { EuVehicleCategoryData } from '@assets/app-data/eu-vehicle-category/eu-vehicle-category';
import { StorageService } from '@providers/natives/storage.service';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { Router } from '@angular/router';
import { EventsService } from '@providers/events/events.service';

@Component({
  selector: 'page-test-create',
  templateUrl: 'test-create.html',
  styleUrls: ['test-create.scss']
})
export class TestCreatePage implements OnInit {
  @ViewChildren('slidingItem') slidingItems: QueryList<IonItemSliding>;
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  testData: TestModel;
  testTypesFieldsMetadata;
  testCompletionStatus: typeof TEST_COMPLETION_STATUS;
  completedFields = {};
  changeOpacity = false;
  displayAddVehicleButton: boolean;
  doesHgvLgvExist: boolean;
  errorIncomplete = false;
  allVehiclesCompletelyTested = false;
  TEST_CREATE_ERROR_BANNER: typeof APP_STRINGS.TEST_CREATE_ERROR_BANNER =
    APP_STRINGS.TEST_CREATE_ERROR_BANNER;
  testTypeReferenceData: TestTypesReferenceDataModel[];
  previousPageName: string;


  constructor(
    public navCtrl: NavController,
    public callNumber: CallNumber,
    public alertCtrl: AlertController,
    public appService: AppService,
    public visitService: VisitService,
    public stateReformingService: StateReformingService,
    private vehicleService: VehicleService,
    private events: EventsService,
    public commonFunc: CommonFunctionsService,
    private modalCtrl: ModalController,
    private analyticsService: AnalyticsService,
    private testTypeService: TestTypeService,
    private storageService: StorageService,
    private alertService: AppAlertService,
    private router: Router
  ) {
    this.testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
  }

  ngOnInit() {
    // TODO - add this back
    // this.stateReformingService.saveNavStack(this.navCtrl);
    this.testCompletionStatus = TEST_COMPLETION_STATUS;
    const lastTestIndex = this.visitService.visit.tests.length - 1;
    this.testData = Object.keys(this.visitService.visit).length
      ? this.visitService.visit.tests[lastTestIndex]
      : this.router.getCurrentNavigation().extras.state.test;
    this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
    this.getTestTypeReferenceData();
  }

  ionViewWillEnter() {
    this.displayAddVehicleButton = true;
    this.doesHgvLgvExist = false;
    for (const vehicle of this.testData.vehicles) {
      if (
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.PSV ||
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.CAR ||
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.MOTORCYCLE ||
        this.testData.vehicles.length >= 4
      ) {
        this.displayAddVehicleButton = false;
      }
      if (
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.HGV ||
        vehicle.techRecord.vehicleType === VEHICLE_TYPE.LGV
      ) {
        this.doesHgvLgvExist = true;
      }
      this.autoAssignVehicleCategoryOnlyWhenOneCategoryAvailable(vehicle);
    }
    this.events.subscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, (completedFields) => {
      this.completedFields = completedFields;
    });
    this.computeErrorIncomplete();
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_OVERVIEW);
  }

  ionViewWillLeave() {
    // TODO - does this need to be added back in?
    // this.events.unsubscribe(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS);
    if (this.slidingItems.length) {
      this.slidingItems.forEach((slidingItem) => {
        slidingItem.close();
      });
    }
  }

  getCountryStringToBeDisplayed(vehicle: VehicleModel) {
    return this.commonFunc.getCountryStringToBeDisplayed(vehicle);
  }

  doesOdometerDataExist(index: number) {
    if (this.testData.vehicles[index].odometerReading) {
      return (
        this.testData.vehicles[index].odometerReading.length &&
        this.testData.vehicles[index].odometerMetric.length
      );
    }
  }

  getOdometerStringToBeDisplayed(index: number) {
    if (this.doesOdometerDataExist(index)) {
      const unit = this.commonFunc.getDistanceType(
        this.testData.vehicles[index].odometerMetric
      );
      return (
        this.vehicleService.formatOdometerReadingValue(
          this.testData.vehicles[index].odometerReading
        ) +
        ' ' +
        unit
      );
    } else {
      return 'Enter';
    }
  }

  getVehicleTypeIconToShow(vehicle: VehicleModel) {
    return vehicle.techRecord.vehicleType.toLowerCase();
  }

  isLecTestTypeInProgress(testType: TestTypeModel): boolean {
    if (
      testType &&
      ((testType.testResult === TEST_TYPE_RESULTS.FAIL && testType.additionalNotesRecorded) ||
        (testType.testResult === TEST_TYPE_RESULTS.PASS &&
          testType.testExpiryDate &&
          testType.emissionStandard &&
          testType.smokeTestKLimitApplied &&
          testType.fuelType &&
          testType.modType &&
          ((testType.particulateTrapFitted && testType.particulateTrapSerialNumber) ||
            testType.modificationTypeUsed)))
    ) {
      testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
      return false;
    } else {
      testType.completionStatus = TEST_COMPLETION_STATUS.IN_PROGRESS;
      return true;
    }
  }

  getTestTypeStatus(vehicle: VehicleModel, testType: TestTypeModel) {
    let isInProgress = true;
    this.testTypeService.updateLinkedTestResults(vehicle, testType);
    for (const testTypeFieldMetadata of this.testTypesFieldsMetadata) {
      if (
        testType.testTypeId === testTypeFieldMetadata.testTypeId &&
        testTypeFieldMetadata.sections.length
      ) {
        isInProgress = false;
        testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
        for (const section of testTypeFieldMetadata.sections) {
          for (const input of section.inputs) {
            if (
              (!testType[input.testTypePropertyName] &&
                testType[input.testTypePropertyName] !== false) ||
              ((this.testTypeService.isAdrTestType(testType.testTypeId) ||
                this.testTypeService.isTirTestType(testType.testTypeId) ||
                this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
                  testType.testTypeId
                ) ||
                this.testTypeService.isSpecialistPartOfCoifTestTypes(testType.testTypeId) ||
                this.testTypeService.isSpecialistIvaTestAndRetestTestType(testType.testTypeId) ||
                this.testTypeService.isPsvNotifiableAlterationTestType(testType.testTypeId)) &&
                input.testTypePropertyName === TEST_TYPE_INPUTS.CERTIFICATE_NUMBER)
            ) {
              if (
                (input.testTypePropertyName !== TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER &&
                  input.testTypePropertyName !== TEST_TYPE_INPUTS.SIC_LAST_DATE) ||
                (testTypeFieldMetadata.category === 'B' &&
                  (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER ||
                    input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE))
              ) {
                isInProgress = true;
                testType.completionStatus = TEST_COMPLETION_STATUS.IN_PROGRESS;
              }
              if (
                this.testTypeService.isAdrTestType(testType.testTypeId) &&
                (testType.testResult === TEST_TYPE_RESULTS.FAIL ||
                  (input.testTypePropertyName === TEST_TYPE_INPUTS.CERTIFICATE_NUMBER &&
                    testType.certificateNumber &&
                    testType.certificateNumber.length === 6))
              ) {
                isInProgress = false;
                testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
              }
              if (
                this.testTypeService.isTirTestType(testType.testTypeId) &&
                (testType.testResult === TEST_TYPE_RESULTS.FAIL ||
                  (input.testTypePropertyName === TEST_TYPE_INPUTS.CERTIFICATE_NUMBER &&
                    testType.certificateNumber &&
                    testType.certificateNumber.length === 5))
              ) {
                isInProgress = false;
                testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
              }
              if (
                (this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
                  testType.testTypeId
                ) ||
                  this.testTypeService.isSpecialistPartOfCoifTestTypes(testType.testTypeId)) &&
                (testType.testResult === TEST_TYPE_RESULTS.FAIL ||
                  (input.testTypePropertyName === TEST_TYPE_INPUTS.CERTIFICATE_NUMBER &&
                    testType.certificateNumber))
              ) {
                isInProgress = false;
                testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
              }
              if (
                this.testTypeService.isPsvNotifiableAlterationTestType(testType.testTypeId) &&
                testType.testResult
              ) {
                isInProgress = false;
                testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
              }

              if (
                this.testTypeService.isSpecialistIvaTestAndRetestTestType(testType.testTypeId) &&
                input.testTypePropertyName === TEST_TYPE_INPUTS.CERTIFICATE_NUMBER &&
                !testType.certificateNumber
              ) {
                isInProgress = true;
                testType.completionStatus = TEST_COMPLETION_STATUS.IN_PROGRESS;
              }
            } else {
              if (
                !this.completedFields.hasOwnProperty(input.testTypePropertyName) &&
                (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT ||
                  input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER ||
                  input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE)
              ) {
                this.completedFields[input.testTypePropertyName] =
                  testType[input.testTypePropertyName];
              }
            }
          }
        }

        if (this.testTypeService.isLecTestType(testType.testTypeId)) {
          isInProgress = this.isLecTestTypeInProgress(testType);
        }

        if (
          this.testTypeService.isSpecialistTestType(testType.testTypeId) &&
          !this.testTypeService.areSpecialistCustomDefectsCompleted(testType)
        ) {
          isInProgress = true;
          testType.completionStatus = TEST_COMPLETION_STATUS.IN_PROGRESS;
        }
        testType.testResult = this.testTypeService.setTestResult(
          testType,
          testTypeFieldMetadata.hasDefects
        );
      } else if (
        testType.testTypeId === testTypeFieldMetadata.testTypeId &&
        !testTypeFieldMetadata.sections.length
      ) {
        testType.testResult = this.testTypeService.setTestResult(
          testType,
          testTypeFieldMetadata.hasDefects
        );
        isInProgress = false;
        testType.completionStatus = TEST_COMPLETION_STATUS.EDIT;
      }
    }

    return isInProgress ? 'In progress' : 'Edit';
  }

  getTestTypeReferenceData(): void {
    this.testTypeService
      .getTestTypesFromStorage()
      .subscribe((data: TestTypesReferenceDataModel[]) => {
        this.testTypeReferenceData = this.testTypeService.orderTestTypesArray(
          data,
          'id',
          'asc'
        );
      });
  }

  getSuggestedTestTypes(testType: TestTypeModel) {
    const flattenedTestTypes = this.testTypeService.flattenTestTypesData(this.testTypeReferenceData);
    const suggestedTestTypeIds = this.testTypeService.getSuggestedTestTypeIds(testType.testTypeId, flattenedTestTypes);
    const testTypes = this.testTypeService.determineAssociatedTestTypes(flattenedTestTypes, suggestedTestTypeIds);
    return this.testTypeService.sortSuggestedTestTypes(testTypes);
  }

  async onAddNewTestType(vehicle: VehicleModel) {
    let failedTest: null | TestTypeModel;
    const testHistory = await this.storageService.read(STORAGE.TEST_HISTORY + vehicle.systemNumber);
    if (testHistory.length) {
      const testTypes: TestTypeModel[] = [];
      const cutOffDate = new Date();
      const DAYS_WITHIN_TEST_FAIL = 20;
      cutOffDate.setDate(cutOffDate.getDate() - DAYS_WITHIN_TEST_FAIL);
      cutOffDate.setHours(0,0,0,0);

      testHistory.forEach(testResult => {
        const testResultDate = new Date(testResult.testStartTimestamp);
        testResultDate.setHours(0,0,0,0);

        if (
          testResult.testTypes.length &&
          testResult.testStatus === TEST_REPORT_STATUSES.SUBMITTED &&
          cutOffDate.valueOf() <= testResultDate.valueOf()
        ) {
          testResult.testTypes.forEach((testType) => {
            if (this.getSuggestedTestTypes(testType).length) {
              testTypes.push(testType);
            }
          });
        }
      });
      if (testTypes.length) {
        this.commonFunc.orderTestTypeArrayByDate(testTypes);
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < testTypes.length; i++) {
          if (testTypes[i].testResult === TEST_TYPE_RESULTS.FAIL) {
            failedTest = testTypes[i];
            break;
          }
        }
      }
    }
    if (failedTest) {
      await this.handleRecentlyFailedTest(failedTest, vehicle);
    } else {
      await this.addNewTestType(vehicle);
    };
  }

  async handleRecentlyFailedTest(failedTest: TestTypeModel, vehicle: VehicleModel) {
    const suggestedTestTypes: TestTypesReferenceDataModel[] = this.getSuggestedTestTypes(failedTest);

    const buttons = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < suggestedTestTypes.length; i++) {
      buttons.push({
        text: suggestedTestTypes[i].suggestedTestTypeDisplayName,
        handler: () => {
          this.addSuggestedTestType(suggestedTestTypes[i], vehicle);
        }
      });
    }

    const failedTestDate = new Date(failedTest.testTypeStartTimestamp);
    const RECENTLY_FAILED_TEST_MESSAGE = `This vehicle failed its ${failedTest.name.toLocaleLowerCase()} on `
      + `${failedTestDate.toLocaleDateString('en-GB')}`.bold() + `<br><br> It may be eligible for retest if within `
      + `14 working days.`.bold() + `<br><br> Check the ` + `date and failure items in test history`.bold()
      + ` to correctly select one of the following test types.`;

    await this.alertService.alertSuggestedTestTypes(RECENTLY_FAILED_TEST_MESSAGE, vehicle, buttons, this);
  }

  async goToVehicleTestResultsHistory(vehicle: VehicleModel) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.SUGGESTED_TEST_TYPES_POPUP,
      event: ANALYTICS_EVENTS.VIEW_TEST_HISTORY,
      label: ANALYTICS_VALUE.VIEW_TEST_HISTORY
    });
    const testResultsHistory = await this.storageService.read(
      STORAGE.TEST_HISTORY + vehicle.systemNumber
    );
    await this.router.navigate([PAGE_NAMES.VEHICLE_HISTORY_PAGE], {
      state: {
        vehicleData: vehicle,
        testResultsHistory: testResultsHistory ? testResultsHistory : []
      }
    });
  }

  async addNewTestType(vehicle: VehicleModel) {
    await this.router.navigate([PAGE_NAMES.TEST_TYPES_LIST_PAGE], {
      state: {
        vehicleData: vehicle
      }
    });
  }

  async addSuggestedTestType(testType: TestTypesReferenceDataModel, vehicle: VehicleModel) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.SUGGESTED_TEST_TYPES_POPUP,
      event: ANALYTICS_EVENTS.ADD_SUGGESTED_TEST_TYPE,
      label: testType.name
    });

    if (testType.name.includes('retest')) {
      testType.name = 'Retest';
    }
    const test = this.testTypeService.createTestType(
      testType,
      vehicle.techRecord.vehicleType
    );
    test.testTypeCategoryName = testType.name;
    this.vehicleService.addTestType(vehicle, test);
  }

  async onVehicleDetails(vehicle: VehicleModel) {
    await this.router.navigate([PAGE_NAMES.VEHICLE_DETAILS_PAGE], {
      state: {
        vehicleData: vehicle,
        previousPageName: PAGE_NAMES.TEST_CREATE_PAGE
      }
    });
  }

  async openTest(vehicle: VehicleModel, vehicleTest: TestTypeModel): Promise<void> {
    if (!this.isTestAbandoned(vehicleTest)) {
      await this.router.navigate([PAGE_NAMES.COMPLETE_TEST_PAGE], {
        state: {
          vehicle,
          vehicleTest,
          completedFields: this.completedFields,
          errorIncomplete: this.errorIncomplete
        }
      });
    } else {
      await this.router.navigate([PAGE_NAMES.TEST_ABANDONING_PAGE], {
        state: {
          vehicleTest,
          selectedReasons: vehicleTest.reasons,
          editMode: false
        }
      });
    }
  }

  async onOdometer(index: number) {
    // TODO - Add modal back
    // const MODAL = await this.modalCtrl.create({
    //   component: OdometerReadingPage,
    //   componentProps: {
    //     vehicle: this.testData.vehicles[index],
    //     errorIncomplete: this.errorIncomplete
    //   }
    // });
    // await MODAL.present();
    // const didDismiss = await MODAL.onWillDismiss();
    // if (didDismiss) {
    //   this.computeErrorIncomplete();
    // }
  }

  async onCountryOfRegistration(vehicle: VehicleModel) {
    // TODO - Add modal back
    // const MODAL = await this.modalCtrl.create({
    //   component: RegionReadingPage,
    //   componentProps: {
    //     vehicle
    //   }
    // });
    // await MODAL.present();
    // const didDismiss = await MODAL.onWillDismiss();
    // if (didDismiss) {
    //   this.computeErrorIncomplete();
    // }
  }

  async onVehicleCategory(vehicle: VehicleModel) {
    // TODO - Add modal back
    // const MODAL = await this.modalCtrl.create({
    //   component: CategoryReadingPage,
    //   componentProps: {
    //     vehicle,
    //     errorIncomplete: this.errorIncomplete
    //   }
    // });
    // await MODAL.present();
    // const didDismiss = await MODAL.onWillDismiss();
    // if (didDismiss) {
    //   this.computeErrorIncomplete();
    // }
  }

  async onRemoveVehicleTest(
    vehicle: VehicleModel,
    vehicleTest: TestTypeModel,
    slidingItem: IonItemSliding
  ) {
    await slidingItem.close();
    const alert = await this.alertCtrl.create({
      header: APP_STRINGS.REMOVE_TEST_TITLE,
      message: APP_STRINGS.REMOVE_TEST_MSG,
      buttons: [
        {
          text: APP_STRINGS.CANCEL,
          role: 'cancel'
        },
        {
          text: APP_STRINGS.REMOVE,
          handler: async () => {
            await this.removeVehicleTest(vehicle, vehicleTest);
          }
        }
      ]
    });

    await alert.present();
    const didDismiss = await alert.onDidDismiss();
    if (didDismiss) {
      this.computeErrorIncomplete();
    }
  }

  async removeVehicleTest(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
      event: ANALYTICS_EVENTS.REMOVE_TEST_TYPE,
      label: vehicleTest.testTypeName
    });

    this.vehicleService.removeSicFields(vehicle, this.completedFields);
    this.vehicleService.removeTestType(vehicle, vehicleTest);
  }

  isTestAbandoned(vehicleTest: TestTypeModel) {
    return vehicleTest.reasons.length > 0;
  }

  async onAbandonVehicleTest(vehicleType, vehicleTest) {
    await this.router.navigate([PAGE_NAMES.REASONS_SELECTION_PAGE], {
      state: {
        vehicleType,
        vehicleTest
      }
    });
  }

  async onCancel() {
    await this.router.navigate([PAGE_NAMES.TEST_CANCEL_PAGE], {
      state: {
        test: this.testData
      }
    });
  }

  async addTrailer(tests) {
    await this.router.navigate([PAGE_NAMES.VEHICLE_LOOKUP_PAGE], {
      state: {
        test: tests[tests.length - 1]
      }
    });
  }

  areAllTestTypesCompleted(vehicle: VehicleModel): boolean {
    return vehicle.testTypes.every((test: TestTypeModel) => {
      this.getTestTypeStatus(vehicle, test);
      return (
        test.completionStatus !== TEST_COMPLETION_STATUS.IN_PROGRESS ||
        test.testResult === TEST_TYPE_RESULTS.ABANDONED
      );
    });
  }

  doesVehicleHaveOnlyAbandonedTestTypes(vehicle: VehicleModel): boolean {
    return vehicle.testTypes.every((test: TestTypeModel) =>
      test.testResult === TEST_TYPE_RESULTS.ABANDONED);
  }

  areAllVehiclesCompletelyTested(test: TestModel): boolean {
    return test.vehicles.every((vehicle: VehicleModel) => {
      const isOdometerCaptured = vehicle.trailerId ? true : vehicle.odometerReading; // TRLs does not have odometer Reading
      return (
        (vehicle.countryOfRegistration &&
          vehicle.euVehicleCategory &&
          isOdometerCaptured &&
          this.areAllTestTypesCompleted(vehicle)) ||
        this.doesVehicleHaveOnlyAbandonedTestTypes(vehicle)
      );
    });
  }

  computeErrorIncomplete() {
    this.allVehiclesCompletelyTested = this.areAllVehiclesCompletelyTested(this.testData);
    if (this.allVehiclesCompletelyTested) {
      this.errorIncomplete = false;
    }
  }

  /**
   * Go to test review page with checks on the tests.
   * As this page is used to change the details during a test review also; if i'm already coming from a test review page
   * (for a vehicle being tested), go back to that page.
   */
  async reviewTest() {
    let allVehiclesHaveTests = true;
    this.changeOpacity = true;
    let finishedTest = true;
    let requiredFieldsCompleted = true;
    for (const vehicle of this.testData.vehicles) {
      if (
        (!vehicle.countryOfRegistration ||
          !vehicle.euVehicleCategory ||
          (vehicle.techRecord.vehicleType !== VEHICLE_TYPE.TRL && !vehicle.odometerReading)) &&
        !this.doesVehicleHaveOnlyAbandonedTestTypes(vehicle)
      ) {
        await this.logMissingFields(vehicle);
        requiredFieldsCompleted = false;
      }
      finishedTest = finishedTest && this.areAllTestTypesCompleted(vehicle);
      allVehiclesHaveTests = allVehiclesHaveTests && vehicle.testTypes.length > 0;
    }

    if (!allVehiclesHaveTests) {
      const alert = await this.alertCtrl.create({
        header: APP_STRINGS.NO_TESTS_ADDED,
        message: APP_STRINGS.PLEASE_ADD_TEST,
        buttons: [APP_STRINGS.OK]
      });
      await alert.present();

      await this.analyticsService.logEvent({
        category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
        event: ANALYTICS_EVENTS.TEST_ERROR,
        label: ANALYTICS_VALUE.NO_TEST_ADDED
      });

      const didDismiss = await alert.onDidDismiss();
      if (didDismiss) {
        this.changeOpacity = false;
      }
    } else if (!finishedTest || !requiredFieldsCompleted) {
      this.changeOpacity = false;
      this.errorIncomplete = true;

      await this.analyticsService.logEvent({
        category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
        event: ANALYTICS_EVENTS.TEST_ERROR,
        label: ANALYTICS_VALUE.NOT_ALL_TESTS_COMPLETED
      });

      if (!finishedTest) {
        await this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.REVIEWS,
          event: ANALYTICS_EVENTS.TEST_REVIEW_UNSUCCESSFUL,
          label: ANALYTICS_VALUE.NOT_ALL_TESTS_COMPLETED
        });
      }
    } else {
      this.changeOpacity = false;
      this.errorIncomplete = false;
      if (this.previousPageName === PAGE_NAMES.TEST_REVIEW_PAGE) {
        await this.navCtrl.navigateBack(PAGE_NAMES.TEST_REVIEW_PAGE);
      } else {
        await this.router.navigate([PAGE_NAMES.TEST_REVIEW_PAGE], {
          state: {
            visit: this.visitService.visit
          }
        });
      }
    }
  }

  async logMissingFields(vehicle: VehicleModel) {
    if (!vehicle.countryOfRegistration) {
      await this.trackTestReviewFailure(ANALYTICS_VALUE.COUNTRY_OF_REGISTRATION);
    }

    if (!vehicle.euVehicleCategory) {
      await this.trackTestReviewFailure(ANALYTICS_VALUE.EU_VEHICLE_CATEGORY);
    }

    if (!vehicle.odometerReading) {
      await this.trackTestReviewFailure(ANALYTICS_VALUE.ODOMETER_READING);
    }
  }

  async trackTestReviewFailure(value: string): Promise<void> {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.REVIEWS,
      event: ANALYTICS_EVENTS.TEST_REVIEW_UNSUCCESSFUL,
      label: value
    });
  }

  isVehicleOfType(vehicle: VehicleModel, ...vehicleType: VEHICLE_TYPE[]) {
    return this.commonFunc.checkForMatchInArray(vehicle.techRecord.vehicleType, vehicleType);
  }

  displayVehicleCategoryKey(key: string): string {
    return this.vehicleService.displayVehicleCategoryKey(key);
  }

  autoAssignVehicleCategoryOnlyWhenOneCategoryAvailable(vehicle: VehicleModel): void {
    if (vehicle.techRecord.vehicleType === VEHICLE_TYPE.CAR) {
      vehicle.euVehicleCategory = EuVehicleCategoryData.EuCategoryCarData[0].key;
    }
    if (vehicle.techRecord.vehicleType === VEHICLE_TYPE.LGV) {
      vehicle.euVehicleCategory = EuVehicleCategoryData.EuCategoryLgvData[0].key;
    }
  }
}
