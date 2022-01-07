import { Pipe, PipeTransform } from '@angular/core';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { AuthenticationService } from '@providers/auth';
import { TEST_TYPES_IDS, TESTER_ROLES } from '@app/app.enums';

@Pipe({
  name: 'filterTestTypeByVehicle'
})
export class FilterTestTypeByVehiclePipe implements PipeTransform {
  constructor(private authenticationService: AuthenticationService) {}

  transform(testTypes: TestTypesReferenceDataModel[], vehicle: VehicleModel) {
    if (!testTypes || !vehicle) {
      return testTypes;
    }
    testTypes = testTypes.filter((elem: TestTypesReferenceDataModel) => this.filterByVehicle(elem, vehicle));
    return testTypes;
  }

  filterByVehicle(
    elem: TestTypesReferenceDataModel,
    vehicle: VehicleModel
  ): TestTypesReferenceDataModel | boolean {
    const techRecord = vehicle.techRecord;
    if (
      elem.forVehicleType &&
      elem.forVehicleType.indexOf(this.toLowerCase(techRecord.vehicleType)) === -1
    ) {
      return false;
    }

    if (
      elem.forVehicleSize &&
      elem.forVehicleSize.indexOf(this.toLowerCase(techRecord.vehicleSize)) === -1
    ) {
      return false;
    }

    if (
      elem.forVehicleConfiguration &&
      elem.forVehicleConfiguration.indexOf(this.toLowerCase(techRecord.vehicleConfiguration)) ===
        -1
    ) {
      return false;
    }

    if (elem.forVehicleAxles && elem.forVehicleAxles.indexOf(techRecord.noOfAxles) === -1) {
      return false;
    }

    if (
      elem.forEuVehicleCategory &&
      vehicle.euVehicleCategory &&
      elem.forEuVehicleCategory.indexOf(this.toLowerCase(vehicle.euVehicleCategory)) === -1
    ) {
      return false;
    }

    if (
      elem.forVehicleClass &&
      elem.forVehicleClass.indexOf(
        this.toLowerCase(this.getField(techRecord.vehicleClass, 'code'))
      ) === -1
    ) {
      return false;
    }

    if (
      elem.forVehicleSubclass &&
      elem.forVehicleSubclass.indexOf(
        this.toLowerCase(this.getFirstElem(techRecord.vehicleSubclass))
      ) === -1
    ) {
      return false;
    }

    if (
      elem.forVehicleWheels &&
      elem.forVehicleWheels.indexOf(techRecord.numberOfWheelsDriven) === -1
    ) {
      return false;
    }

    if (
      elem.id === TEST_TYPES_IDS._123 &&
      !this.authenticationService.hasUserRights([TESTER_ROLES.FULL_ACCESS])
    ) {
      return false;
    }

    return elem;
  }

  toLowerCase(input: string): string {
    if (typeof input === 'string') {return input.toLowerCase();}
    return '';
  }

  getFirstElem(input: any): string {
    if (Array.isArray(input)) {return input[0];}
    return '';
  }

  getField(input: any, field: string): any {
    if (typeof input === 'object') {return input[field];}
    return '';
  }
}
