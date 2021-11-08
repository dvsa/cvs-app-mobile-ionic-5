import { TestModel } from '@models/tests/test.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import * as uuidv4 from 'uuid/v4';
import { VisitService } from '../visit/visit.service';
import { Injectable } from '@angular/core';
import { LogsProvider } from '@store/logs/logs.service';

@Injectable()
export class TestService {
  constructor(
    public visitService: VisitService,
    public logProvider: LogsProvider,
  ) {}

  createTest() {
    const newTest = {} as TestModel;
    const visitStart = this.visitService.visit.startTime;
    const testStart: string = new Date().toISOString();
    const testStartIsBeforeVisitStart: boolean = new Date(visitStart) > new Date(testStart);
    const testResultId: string = uuidv4();

    if(testStartIsBeforeVisitStart) {
      this.logProvider.dispatchLog({
        type: 'warning',
        // eslint-disable-next-line max-len
        message: `${this.visitService.visit.testerId} - test start time of ${testStart} for test ${testResultId} is before visit start time of ${visitStart} for visit ${this.visitService.visit.id}`,
        timestamp: Date.now(),
      });
    }

    newTest.testResultId = testResultId;
    newTest.startTime = testStart;
    newTest.endTime = null;
    newTest.status = null;
    newTest.reasonForCancellation = null;
    newTest.vehicles = [];

    return newTest;
  }

  endTestReport(test: TestModel) {
    test.endTime = new Date().toISOString();
  }

  addVehicle(test: TestModel, vehicle: VehicleModel) {
    test.vehicles.push(vehicle);
  }
}
