import { ByVehicleTypePipe } from './by-vehicle-type';
import { VEHICLE_TYPE } from '@app/app.enums';
import { DefectsReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/defects-data.mock';

describe('ByVehicleTypePipe', () => {
  const pipe = new ByVehicleTypePipe();

  const deficiencies = DefectsReferenceDataMock.DefectDataDeficiencies;
  deficiencies.push({
    deficiencyCategory: 'major',
    deficiencyText: 'insecure.',
    ref: '1.1.b',
    stdForProhibition: false,
    deficiencySubId: null,
    forVehicleType: ['other'],
    deficiencyId: 'f'
  });

  it('return only psv items', () => {
    expect(pipe.transform(deficiencies, VEHICLE_TYPE.PSV).length).toBe(5);
  });

  it('return only psv items', () => {
    expect(pipe.transform(deficiencies, 'other').length).toBe(1);
  });

  it('return the array', () => {
    expect(pipe.transform(deficiencies, '').length).toBe(deficiencies.length);
  });
});
