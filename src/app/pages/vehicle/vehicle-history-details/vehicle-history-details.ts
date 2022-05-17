import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  TEST_TYPE_RESULTS,
  DEFICIENCY_CATEGORY,
  DEFAULT_VALUES,
  APP_STRINGS,
  ANALYTICS_SCREEN_NAMES
} from '@app/app.enums';
import {
  TestsWithoutCertificate,
  TestsWithoutSeatbelts,
  TestsWithoutDefects
} from '@assets/app-data/test-required-fields/test-required-fields.data';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestResultModel } from '../../../../models/tests/test-result.model';
import { CountryOfRegistrationData } from '../../../../assets/app-data/country-of-registration/country-of-registration.data';
import { AppService } from '@providers/global/app.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { AnalyticsService } from '@providers/global';
import { Router } from '@angular/router';

@Component({
  selector: 'page-vehicle-history-details',
  templateUrl: 'vehicle-history-details.html',
  styleUrls: ['vehicle-history-details.scss'],
})
export class VehicleHistoryDetailsPage {
  testResultHistory: any;
  testIndex: number;
  testTypeIndex: number;
  selectedTestResult: TestResultModel;
  selectedTestType: TestTypeModel;
  testTypeResults: typeof TEST_TYPE_RESULTS;
  defaultValues: typeof DEFAULT_VALUES;
  testsWithoutCertificate: any;
  testsWithoutSeatbelts: any;
  testsWithoutDefects: any;
  doesNotHaveCert: boolean = false;
  doesNotHaveDefects: boolean = false;
  doesNotHaveBelts: boolean = false;
  doesNotHaveExpiry: boolean;
  doDefectsExist: boolean;
  isTestResultAbandon: boolean;
  isTestResultFail: boolean;
  testResultColor: string;
  countryOfRegistration: string;
  distanceType: string;
  vehicleType: string;
  previousPageName: string = APP_STRINGS.TEST_HISTORY;

  constructor(
    public navCtrl: NavController,
    public router: Router,
    public commonFunc: CommonFunctionsService,
    private analyticsService: AnalyticsService,
    public appService: AppService,
    public testTypeService: TestTypeService
  ) {
    // this.testResultHistory = navParams.get('testResultHistory');
    // this.testIndex = navParams.get('testIndex');
    // this.testTypeIndex = navParams.get('testTypeIndex');
    // this.vehicleType = navParams.get('vehicleType');
  }

  ngOnInit() {
    this.selectedTestResult = this.testResultHistory[this.testIndex];
    this.selectedTestType = this.testResultHistory[this.testIndex].testTypes[this.testTypeIndex];
    this.testTypeResults = TEST_TYPE_RESULTS;
    this.defaultValues = DEFAULT_VALUES;
    this.doDefectsExist = this.checkForDefects(this.selectedTestType.defects);

    this.testTypeService.fixDateFormatting(this.selectedTestType);
    this.setTestMetadata();
    this.compareTestWithMetadata();

    this.isTestResultAbandon = this.commonFunc.checkForMatch(
      this.selectedTestType.testResult,
      TEST_TYPE_RESULTS.ABANDONED
    );
    this.isTestResultFail = this.commonFunc.checkForMatch(
      this.selectedTestType.testResult,
      TEST_TYPE_RESULTS.FAIL
    );
    this.testResultColor = this.commonFunc.getTestResultColor(this.selectedTestType.testResult);
  }

  ionViewDidEnter() {
    this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_TEST_HISTORY_DETAILS);
  }

  setTestMetadata() {
    this.testsWithoutCertificate = TestsWithoutCertificate.TestsWithoutCertificate;
    this.testsWithoutSeatbelts = TestsWithoutSeatbelts.TestsWithoutSeatbelts;
    this.testsWithoutDefects = TestsWithoutDefects.TestsWithoutDefects;
    this.countryOfRegistration = this.selectedTestResult.countryOfRegistration
      ? this.getCountryOfRegistration(this.selectedTestResult.countryOfRegistration)
      : '';
    this.distanceType = this.commonFunc.getDistanceType(
      this.testResultHistory[this.testIndex].odometerReadingUnits
    );
  }

  getCountryOfRegistration(countryKey: string): string {
    const countryMeta = CountryOfRegistrationData.CountryData.find(
      (country) => countryKey === country.key
    );

    if (!!countryMeta) {
      return countryMeta.value.split(' -')[0];
    }
  }

  compareTestWithMetadata() {
    // this implementation based on test type's name has to be changed! use test type's id instead!
    if (this.selectedTestType.testTypeName) {
      this.doesNotHaveCert = this.commonFunc.checkForMatchInArray(
        this.selectedTestType.testTypeName,
        this.testsWithoutCertificate
      );
      this.doesNotHaveDefects = this.commonFunc.checkForMatchInArray(
        this.selectedTestType.testTypeId,
        this.testsWithoutDefects
      );
      this.doesNotHaveBelts = this.commonFunc.checkForMatchInArray(
        this.selectedTestType.testTypeName,
        this.testsWithoutSeatbelts
      );
    }
  }

  getDeficiencyColor(deficiencyCategory: string): string {
    switch (deficiencyCategory.toLowerCase()) {
      case DEFICIENCY_CATEGORY.ADVISORY:
        return 'light';
      case DEFICIENCY_CATEGORY.DANGEROUS:
        return 'dark';
      case DEFICIENCY_CATEGORY.MAJOR:
        return 'danger';
      case DEFICIENCY_CATEGORY.MINOR:
        return 'attention';
    }
  }

  checkForDefects(defects: any[]): boolean {
    return defects && defects.length > 0;
  }
}
