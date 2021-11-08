import { VehicleModel } from '@models/vehicle/vehicle.model';
import { TestTypeModel } from '../../src/models/tests/test-type.model';
import { PreparersReferenceDataModel } from '../../src/models/reference-data-models/preparers.model';
import { Observable } from 'rxjs';
import { CommonRegExp } from '@providers/utils/common-regExp';
import { of } from 'rxjs';
import { VehicleTechRecordModel } from '@models/vehicle/tech-record.model';
import { TestResultModel } from '@models/tests/test-result.model';
import { APP_STRINGS, TEST_TYPE_INPUTS } from '@app/app.enums';
import { AlertController } from '@ionic/angular';
import { VehicleService } from '@providers/vehicle/vehicle.service';

export class VehicleServiceMock {

  private vehicleService: VehicleService = new VehicleService(
    null, null, null, null, null
  );

  createVehicle(vehicleTechRecord: VehicleTechRecordModel): VehicleModel {
    const newVehicle: VehicleModel = {} as VehicleModel;
    newVehicle.vrm = vehicleTechRecord.vrms.find((elem) => elem.isPrimary).vrm;
    newVehicle.vin = vehicleTechRecord.vin;
    newVehicle.techRecord = this.getCurrentTechRecord(vehicleTechRecord);
    newVehicle.testResultsHistory = [];
    newVehicle.odometerReading = '';
    newVehicle.odometerMetric = '';
    newVehicle.preparerId = '';
    newVehicle.preparerName = '';
    newVehicle.testTypes = [];
    return newVehicle;
  }

  addTestType(vehicle: VehicleModel, testType: TestTypeModel) {
    vehicle.testTypes.push(testType);
  }

  removeTestType(vehicle: VehicleModel, testType: TestTypeModel) {
    const foundIndex = vehicle.testTypes.indexOf(testType);
    vehicle.testTypes.splice(foundIndex, 1);
  }

  addPreparer(vehicle: VehicleModel, value: PreparersReferenceDataModel) {
    vehicle.preparerId = value.preparerId;
    vehicle.preparerName = value.preparerName;
  }

  setOdometer(vehicle: VehicleModel, odomReading: string, odomMetric: string) {
    vehicle.odometerReading = odomReading;
    vehicle.odometerMetric = odomMetric;
  }

  getVehicleTechRecords(param): Observable<VehicleModel[]> {
    return of([]);
  }

  getTestResultsHistory(): Observable<TestResultModel[]> {
    return of([]);
  }

  getCurrentTechRecord(array) {
    const currentArray = array.techRecord.find(
      techRec => techRec.statusCode === 'current');
    currentArray.noOfAxles = 2;
    currentArray.vehicleSize = 'small';
    currentArray.vehicleConfiguration = 'rigid';
    return currentArray;
  }

  formatOdometerReadingValue(stringValue: string) {
    return stringValue.replace(CommonRegExp.ODOMETER_VALUE, ',');
  }

  hasOnlyOneTestTypeWithSic(vehicle: VehicleModel) {
    let testsFound = 0;
    for (const testType of vehicle.testTypes) {
      if (testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] || testType[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] === false) {
        testsFound++;
      }
    }
    return testsFound === 1;
  }

  removeSicFields(vehicle, fields) {
    if (this.hasOnlyOneTestTypeWithSic(vehicle)) {
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_CARRIED_OUT)) {delete fields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT];}
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER)) {delete fields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER];}
      if (fields.hasOwnProperty(TEST_TYPE_INPUTS.SIC_LAST_DATE)) {delete fields[TEST_TYPE_INPUTS.SIC_LAST_DATE];}
    }
  }

  async createSkeletonAlert(alertCtrl: AlertController) {
    const ALERT = await alertCtrl.create({
      header: APP_STRINGS.SKELETON_ALERT_TITLE,
      message: APP_STRINGS.SKELETON_ALERT_MESSAGE,
      buttons: [APP_STRINGS.OK]
    });
    await ALERT.present();
  }

  isVehicleSkeleton(vehicle: VehicleModel) {
    return this.vehicleService.isVehicleSkeleton(vehicle);
  }

  displayVehicleCategoryKey(key: string) {
    return this.vehicleService.displayVehicleCategoryKey(key);
  }
}
