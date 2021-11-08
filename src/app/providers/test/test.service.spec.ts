import { TestService } from './test.service';
import { TestBed } from '@angular/core/testing';
import { VehicleService } from '../vehicle/vehicle.service';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { LogsProviderMock } from '@store/logs/logs.service.mock';
import { VisitService } from '../visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';

describe('Provider: TestReportService', () => {
  let testService: TestService;
  let vehicleService: VehicleService;
  let visitService: VisitService;
  let logsService: LogsProvider;
  let vehicleServiceSpy: any;

  const VEHICLE: VehicleModel = VehicleDataMock.VehicleData;

  beforeEach(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    vehicleServiceSpy = jasmine.createSpyObj('VehicleService', [
      'createVehicle',
      'addTestType',
      'removeTestType'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TestService,
        { provide: VehicleService, useValue: vehicleServiceSpy },
        { provide: LogsProvider, useClass: LogsProviderMock },
        { provide: VisitService, useClass: VisitServiceMock }
      ]
    });

    testService = TestBed.inject(TestService);
    vehicleService = TestBed.inject(VehicleService);
    visitService = TestBed.inject(VisitService);
    logsService = TestBed.inject(LogsProvider);
    visitService.createVisit({
      atfName: 'some ATF',
      atfNumber: 'some  ATF number',
      atfType: 'some ATF type'
    });
  });

  afterEach(() => {
    testService = null;
    vehicleService = null;
    jasmine.clock().uninstall();
  });

  it('should assign the startTime to the report', () => {
    const newTest = testService.createTest();
    expect(newTest.startTime).toBeTruthy();
  });

  it('should assign the endTime to the report', () => {
    const endedTest = testService.createTest();
    testService.endTestReport(endedTest);
    expect(endedTest.endTime).toBeTruthy();
  });

  it('should add a vehicle to the vehicles array of testReport', () => {
    const newTest = testService.createTest();
    expect(newTest.vehicles.length).toEqual(0);
    testService.addVehicle(newTest, VEHICLE);
    expect(newTest.vehicles.length).toEqual(1);
  });
  it('should log an event if the test start time is before the visit start time', () => {
    jasmine.clock().mockDate(new Date(2020, 1, 1));
    testService.visitService.visit.startTime = '2099-12-19T00:00:00.000Z';
    testService.visitService.visit.testerId = '000000';
    testService.visitService.visit.id = 'ZZZZ';
    testService.createTest();
    const logContent = JSON.stringify((logsService.dispatchLog as jasmine.Spy).calls.mostRecent().args[0]);
    expect(logsService.dispatchLog).toHaveBeenCalled();
    // log message split into 2 parts to be tested to remove the unique test id
    expect(logContent).toContain('{"type":"warning","message":"000000 - test start time of 2020-02-01T00:00:00.000Z for test');
    expect(logContent).toContain('is before visit start time of 2099-12-19T00:00:00.000Z for visit ZZZZ","timestamp":1580515200000}');
  });
});
