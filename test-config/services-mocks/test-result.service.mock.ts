import { VehicleModel } from '@models/vehicle/vehicle.model';
import { TestResultModel } from '@models/tests/test-result.model';
import { TestTypeModel } from '@models/tests/test-type.model';

export class TestResultServiceMock {

  constructor() {
  }

  createTestResult(visit, test, vehicle: VehicleModel): TestResultModel {
    const newTestResult = {} as TestResultModel;

    newTestResult.testResultId = test.testResultId;
    newTestResult.vrm = vehicle.vrm;
    newTestResult.vin = vehicle.vin;
    newTestResult.testStationName = visit.testStationName;
    newTestResult.testStationPNumber = visit.testStationPNumber;
    newTestResult.testStationType = visit.testStationType;
    newTestResult.testerName = 'John Doe';
    newTestResult.testerStaffId = 'dfgdgdfgdg';
    newTestResult.testerEmailAddress = 'mail@mail.com';
    newTestResult.testStartTimestamp = test.startTime;
    newTestResult.testEndTimestamp = test.endTime;
    newTestResult.testStatus = test.status;
    newTestResult.reasonForCancellation = test.reasonForCancellation;
    newTestResult.vehicleClass = vehicle.techRecord.vehicleClass;
    newTestResult.vehicleType = vehicle.techRecord.vehicleType;
    newTestResult.numberOfSeats = vehicle.techRecord.seatsLowerDeck + vehicle.techRecord.seatsUpperDeck;
    newTestResult.vehicleConfiguration = vehicle.techRecord.vehicleConfiguration;
    newTestResult.odometerReading = parseInt(vehicle.odometerReading, 10); // to match backend implementation
    newTestResult.odometerReadingUnits = vehicle.odometerMetric;
    newTestResult.preparerId = vehicle.preparerId;
    newTestResult.preparerName = vehicle.preparerName;
    newTestResult.euVehicleCategory = vehicle.euVehicleCategory;
    newTestResult.countryOfRegistration = vehicle.countryOfRegistration;
    newTestResult.vehicleSize = vehicle.techRecord.vehicleSize;
    newTestResult.noOfAxles = vehicle.techRecord.noOfAxles;
    newTestResult.testTypes = vehicle.testTypes;

    return newTestResult;
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

  endTestType(testType: TestTypeModel) {
    testType.testTypeEndTimestamp = new Date().toISOString();
  }
}
