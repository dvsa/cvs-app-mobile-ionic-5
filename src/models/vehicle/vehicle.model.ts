import { TestTypeModel } from '../tests/test-type.model';
import { TechRecordModel } from './tech-record.model';
import { TestResultModel } from '../tests/test-result.model';

export interface VehicleModel {
  systemNumber: string;
  vrm: string;
  vin: string;
  techRecord: TechRecordModel;
  testResultsHistory?: TestResultModel[];
  countryOfRegistration?: string;
  euVehicleCategory?: string;
  odometerReading?: string;
  odometerMetric?: string;
  preparerId?: string;
  preparerName?: string;
  testTypes?: TestTypeModel[];
  /* -------- ONLY FOR TRL -------- */
  trailerId?: string;
}
