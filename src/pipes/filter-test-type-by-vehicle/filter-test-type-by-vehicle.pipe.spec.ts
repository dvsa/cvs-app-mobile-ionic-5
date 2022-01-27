import { FilterTestTypeByVehiclePipe } from './filter-test-type-by-vehicle.pipe';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { TestTypesReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/test-types.mock';
import { cloneDeep } from 'lodash';
import { AuthenticationService } from '@providers/auth';

describe('FilterTestTypeByVehiclePipe', () => {
  const pipe = new FilterTestTypeByVehiclePipe(new AuthenticationService(null, null, null, null, null, null));
  const testTypeData: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const vehicle = VehicleDataMock.VehicleData;

  it('return filtered by vehicle', () => {
    expect(pipe.transform(testTypeData, vehicle).length).toBe(2);
  });

  it('return all items since no vehicle was entered', () => {
    expect(pipe.transform(testTypeData, null).length).toBe(testTypeData.length);
  });

  it('handles the situation where String fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleConfiguration = ['chicken'];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleConfiguration;
    expect(pipe.transform(modifiedTestData, partialVehicle).length).toBe(0);
  });

  it('handles the situation where Object fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleClass = ['chicken'];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleClass;
    expect(pipe.transform(modifiedTestData, partialVehicle).length).toBe(1);
  });

  it('handles the situation where Array fields are missing without erroring', () => {
    const modifiedTestData = cloneDeep(testTypeData);
    modifiedTestData[0].forVehicleSubclass = ['chicken'];
    const partialVehicle = cloneDeep(vehicle);
    delete partialVehicle.techRecord.vehicleSubclass;
    expect(pipe.transform(modifiedTestData, partialVehicle).length).toBe(1);
  });

  describe('getField function', () => {
    it('correctly extracts a field from a present input', () => {
      const testInput = { thing: 'aValue' };
      expect(pipe.getField(testInput, 'thing')).toEqual('aValue');
    });

    it('returns empty string if input is not object', () => {
      expect(pipe.getField('notAnObject', 'anything')).toEqual('');
    });

    it('returns undefined if the field is not  present on the input object', () => {
      expect(pipe.getField({ thing: 'value' }, 'notAField')).toEqual(undefined);
    });
  });
});
