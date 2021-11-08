import { TestModel } from '../tests/test.model';

export interface VisitModel {
  startTime: string;
  endTime: string;
  testStationName: string;
  testStationPNumber: string;
  testStationEmail: string;
  testStationType: string;
  testerName: string;
  testerId: string;
  testerEmail: string;
  tests: TestModel[];
  id?: string;
}
