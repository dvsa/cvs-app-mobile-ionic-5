import { TestResultModel } from '@models/tests/test-result.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { HTTPService } from '@providers/global';
import { Injectable } from '@angular/core';
import { TIR_CERTIFICATE_NUMBER_PREFIXES, VEHICLE_TYPE } from '@app/app.enums';
import { CommonFunctionsService } from '../utils/common-functions';
import { TestTypeService } from '../test-type/test-type.service';
import { AuthenticationService } from '@providers/auth';
import { TestTypeModel } from '@models/tests/test-type.model';
import { FirstTestTypesData } from '@assets/app-data/test-types-data/first-test-types.data';
import { TirTestTypesData } from '@assets/app-data/test-types-data/tir-test-types.data';
import {AnnualTestTypesHgvTrlData} from '@assets/app-data/test-types-data/annual-test-types-hgv-trl.data';
import {
  PsvAnnualTestsThatGenerateCertificateData
} from '@assets/app-data/test-types-data/psv-annual-tests-that-generate-certificate.data';

@Injectable()
export class TestResultService {
  constructor(
    private authenticationService: AuthenticationService,
    private httpService: HTTPService,
    private commFunc: CommonFunctionsService,
    private testTypeService: TestTypeService
  ) {}

  createTestResult(visit, test, vehicle: VehicleModel): TestResultModel {
    const newTestResult = {} as TestResultModel;

    newTestResult.testResultId = test.testResultId;
    /* VISIT */
    newTestResult.testStationName = visit.testStationName;
    newTestResult.testStationPNumber = visit.testStationPNumber;
    newTestResult.testStationType = visit.testStationType;
    newTestResult.testerName = this.authenticationService.tokenInfo.testerName;
    newTestResult.testerStaffId = this.authenticationService.tokenInfo.testerId;
    newTestResult.testerEmailAddress = this.authenticationService.tokenInfo.testerEmail;
    /* TEST */
    newTestResult.testStartTimestamp = test.startTime;
    newTestResult.testEndTimestamp = test.endTime;
    newTestResult.testStatus = test.status;
    newTestResult.reasonForCancellation = test.reasonForCancellation;
    /* VEHICLE */
    if (vehicle.vrm) {
      newTestResult.vrm = vehicle.vrm;
    }
    if (vehicle.trailerId) {
      newTestResult.trailerId = vehicle.trailerId;
    } else {
      newTestResult.odometerReading = vehicle.odometerReading
        ? parseInt(vehicle.odometerReading, 10)
        : null;
      newTestResult.odometerReadingUnits = vehicle.odometerMetric ? vehicle.odometerMetric : null;
    }
    if (this.vehicleContainsFirstTestsOrAnnualTests(vehicle)) {
      if (vehicle.techRecord.vehicleType === VEHICLE_TYPE.HGV) {
        newTestResult.regnDate = vehicle.techRecord.regnDate;
      } else {
        newTestResult.firstUseDate = vehicle.techRecord.firstUseDate;
      }
    }
    if (
      vehicle.techRecord.vehicleType === VEHICLE_TYPE.PSV &&
      this.vehicleContainsPsvAnnualTestsThatGenerateCertificate(vehicle)
    ) {
      newTestResult.regnDate = vehicle.techRecord.regnDate;
    }
    newTestResult.systemNumber = vehicle.systemNumber;
    newTestResult.vin = vehicle.vin;
    newTestResult.vehicleClass = vehicle.techRecord.vehicleClass;
    if (
      vehicle.techRecord.vehicleType === VEHICLE_TYPE.CAR ||
      vehicle.techRecord.vehicleType === VEHICLE_TYPE.LGV
    )
      {newTestResult.vehicleSubclass = vehicle.techRecord.vehicleSubclass;}
    newTestResult.vehicleType = vehicle.techRecord.vehicleType;
    newTestResult.vehicleConfiguration = vehicle.techRecord.vehicleConfiguration;
    newTestResult.preparerId = vehicle.preparerId;
    newTestResult.preparerName = vehicle.preparerName;
    newTestResult.euVehicleCategory = vehicle.euVehicleCategory;
    newTestResult.countryOfRegistration = vehicle.countryOfRegistration;
    newTestResult.noOfAxles = vehicle.techRecord.noOfAxles;
    newTestResult.numberOfWheelsDriven =
      vehicle.techRecord.vehicleType === VEHICLE_TYPE.MOTORCYCLE
        ? vehicle.techRecord.numberOfWheelsDriven
        : null;
    if (vehicle.techRecord.vehicleSize)
      {newTestResult.vehicleSize = vehicle.techRecord.vehicleSize;}
    if (vehicle.techRecord.vehicleType === VEHICLE_TYPE.PSV)
      {newTestResult.numberOfSeats =
        vehicle.techRecord.seatsLowerDeck + vehicle.techRecord.seatsUpperDeck;}
    newTestResult.testTypes = vehicle.testTypes;

    return newTestResult;
  }

  private vehicleContainsFirstTestsOrAnnualTests(vehicle: VehicleModel): boolean {
    return vehicle.testTypes.filter(this.isFirstTestOrAnnualTest).length > 0;
  }

  private isFirstTestOrAnnualTest(testType: TestTypeModel): boolean {
    const concatenatedArray = FirstTestTypesData.FirstTestTypesDataIds.concat(
      AnnualTestTypesHgvTrlData.AnnualTestTypesHgvTrlDataIds
    );
    return concatenatedArray.some((id) => id === testType.testTypeId);
  }

  private vehicleContainsPsvAnnualTestsThatGenerateCertificate(
    vehicleType: VehicleModel
  ): boolean {
    return vehicleType.testTypes.filter(this.isPsvAnnualTestsThatGenerateCertificate).length > 0;
  }

  private isPsvAnnualTestsThatGenerateCertificate(testType: TestTypeModel): boolean {
    return PsvAnnualTestsThatGenerateCertificateData.PsvAnnualTestsThatGenerateCertificateIds.some(
      (id) => id === testType.testTypeId
    );
  }

  concatenateReasonsArray(reasons: string[]) {
    let str = '';
    if (reasons.length > 1) {
      for (let i = 0; i < reasons.length - 1; i++) {
        str += reasons[i] + '. ';
      }
    }
    str += reasons[reasons.length - 1] + '.';

    return str;
  }

  formatCertificateNumber(testType: TestTypeModel, vehicleType: string) {
    if (testType.certificateNumber) {
      return (
        (TirTestTypesData.TirTestTypesDataIds.indexOf(testType.testTypeId) !== -1
          ? vehicleType === VEHICLE_TYPE.HGV
            ? TIR_CERTIFICATE_NUMBER_PREFIXES.GB_V
            : TIR_CERTIFICATE_NUMBER_PREFIXES.GB_T
          : '') + testType.certificateNumber
      );
    }
    return null;
  }

  moveCoifCertificateNumbersToSecondaryCertificateNumberField(testType: TestTypeModel) {
    if (this.testTypeService.isSpecialistCoifWithAnnualTest(testType.testTypeId)) {
      testType.secondaryCertificateNumber = testType.certificateNumber;
      testType.certificateNumber = null;
    }
  }

  formatCustomDefects(testType: TestTypeModel) {
    if (testType.customDefects) {
      for (const customDefect of testType.customDefects) {
        if (!customDefect.hasOwnProperty('defectNotes')) {customDefect.defectNotes = null;}
        if (customDefect.hasOwnProperty('hasAllMandatoryFields'))
          {delete customDefect.hasAllMandatoryFields;}
      }
    }
  }

  submitTestResult(testResult: TestResultModel) {
    const newTestResult = this.commFunc.cloneObject(testResult);

    if (newTestResult.testTypes.length) {
      for (const testType of newTestResult.testTypes) {
        if (testType.hasOwnProperty('linkedIds')) {delete testType.linkedIds;}
        if (testType.hasOwnProperty('reasons')) {
          if (testType.reasons.length) {
            testType.reasonForAbandoning = this.concatenateReasonsArray(testType.reasons);
          }
          delete testType.reasons;
        }
        this.moveCoifCertificateNumbersToSecondaryCertificateNumberField(testType);
        testType.certificateNumber = this.formatCertificateNumber(
          testType,
          testResult.vehicleType
        );
        if (testType.modType) {
          testType.modType = {
            code: testType.modType.split(' - ')[0],
            description: testType.modType.split(' - ')[1]
          };
        }
        delete testType.completionStatus;
        delete testType.testTypeCategoryName;
        if (testType.numberOfSeatbeltsFitted)
          {testType.numberOfSeatbeltsFitted = parseInt(testType.numberOfSeatbeltsFitted, 10);}
        this.testTypeService.endTestType(testType);

        if (testType.defects.length) {
          for (const defect of testType.defects) {
            if (defect.hasOwnProperty('metadata')) {delete defect.metadata;}
          }
        }
        this.formatCustomDefects(testType);
      }
    }

    return this.httpService.postTestResult(newTestResult);
  }
}
