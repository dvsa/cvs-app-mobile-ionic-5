import { Component, OnInit } from '@angular/core';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import {
  APP_STRINGS,
  TEST_TYPE_RESULTS,
  TEST_REPORT_STATUSES,
  VEHICLE_TYPE,
  ANALYTICS_SCREEN_NAMES
} from '@app/app.enums';
import { TestResultModel } from '@models/tests/test-result.model';
import { AnalyticsService } from '@providers/global';
import { TestTypeService } from '@providers/test-type/test-type.service';
import {Router} from '@angular/router';

@Component({
  selector: 'page-vehicle-history',
  templateUrl: 'vehicle-history.html',
  styleUrls: ['vehicle-history.scss'],
})
export class VehicleHistoryPage implements OnInit {
  VEHICLE_TYPE: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  vehicleData: VehicleModel;
  testResultHistory: TestResultModel[];
  testTypeResults = TEST_TYPE_RESULTS;
  noHistory: string;
  testResultHistoryClone: any[] = [];
  testTypeArray: any[] = [];
  previousPageName: string;

  constructor(
    public router: Router,
    public commonFunc: CommonFunctionsService,
    private analyticsService: AnalyticsService,
    public testTypeService: TestTypeService
  ) { }

  ngOnInit() {
    this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
    this.vehicleData = this.router.getCurrentNavigation().extras.state.vehicleData;
    this.testResultHistory = this.router.getCurrentNavigation().extras.state.testResultsHistory;
    this.testResultHistoryClone = this.commonFunc.cloneObject(this.testResultHistory);
    this.createTestTypeArray();
    this.commonFunc.orderTestTypeArrayByDate(this.testTypeArray);
  }

  ionViewWillEnter() {
    this.noHistory = APP_STRINGS.NO_HISTORY;
    this.previousPageName = APP_STRINGS.VEHICLE_DETAILS;
  }

  async ionViewDidEnter(): Promise<void> {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.VEHICLE_TEST_HISTORY);
  }

  async showTestDetails(testIndex: number, testTypeIndex: number): Promise<void> {
    await this.router.navigate(['VehicleHistoryDetailsPage'], {
      state: {
        testResultHistory: this.testResultHistory,
        testIndex,
        testTypeIndex,
        vehicleType: this.vehicleData.techRecord.vehicleType,
      }
    }).catch((error) => {
    });
  }

  createTestTypeArray(): void {
    if (this.testResultHistory.length) {
      this.testResultHistoryClone.forEach((testResult, testIndex) => {
        if (
          testResult.testTypes.length &&
          testResult.testStatus === TEST_REPORT_STATUSES.SUBMITTED
        ) {
          testResult.testTypes.forEach((testType, typeTypeIndex) => {
            testType.testIndex = testIndex;
            testType.testTypeIndex = typeTypeIndex;
            this.testTypeService.fixDateFormatting(testType);
            this.testTypeArray.push(testType);
          });
        }
      });
      delete this.testResultHistoryClone;
    }
  }

  haveProhibition(testType): boolean {
    let resp = false;
    if (testType.prohibitionIssued) {
      resp = true;
    } else {
      if (testType.defects && testType.defects.length) {
        testType.defects.forEach((defect) => {
          if (defect.prohibitionIssued) { resp = true; }
        });
      } else {
        resp = false;
      }
    }
    return resp;
  }

  isVehicleOfType(vehicle: VehicleModel, ...vehicleType: VEHICLE_TYPE[]) {
    return this.commonFunc.checkForMatchInArray(vehicle.techRecord.vehicleType, vehicleType);
  }
}
