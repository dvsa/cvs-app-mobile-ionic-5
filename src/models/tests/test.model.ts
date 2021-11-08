import { TEST_REPORT_STATUSES } from '@app/app.enums';
import { VehicleModel } from '../vehicle/vehicle.model';

export interface TestModel {
  testResultId?: string;
  startTime: string;
  endTime: string;
  status: TEST_REPORT_STATUSES | null;
  reasonForCancellation: string;
  vehicles: VehicleModel[];
}
