import { TestBed } from '@angular/core/testing';
import { StorageService } from '../natives/storage.service';
import { ActivityService } from '@providers/activity/activity.service';
import { AppService } from '@providers/global/app.service';
import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
import { HTTPService } from '@providers/global/http.service';
import { ActivityDataMock } from '@assets/data-mocks/activity.data.mock';
import { VisitModel } from '@models/visit/visit.model';
import { TestResultsDataMock } from '@assets/data-mocks/test-results-data.mock';
import { TestResultModel } from '@models/tests/test-result.model';
import { WaitTimeReasonsData } from '@assets/app-data/wait-time-data/wait-time-reasons.data';
import { VISIT } from '@app/app.enums';
import { AuthenticationService } from '../auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';

describe('Provider: ActivityService', () => {
  let activityService: ActivityService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let appService: AppService;
  let httpService: HTTPService;
  let httpServiceSpy: any;

  const waitreasonsData = WaitTimeReasonsData.WaitTimeReasonsData;
  const activity = ActivityDataMock.WaitActivityData;
  const ACTIVITIES = ActivityDataMock.Activities;
  const TEST_RESULT = TestResultsDataMock.TestResultsData;
  const activitiesForUpdate = ActivityDataMock.UpdateActivities;
  const visit: VisitModel = {
    startTime: '2019-05-23T12:11:11.974Z',
    endTime: null,
    testStationName: 'Abshire-Kub',
    testStationPNumber: '09-4129632',
    testStationEmail: 'teststationname@dvsa.gov.uk',
    testStationType: 'gvts',
    testerId: '9b4q4o87d',
    testerName: 'gvminnbbl',
    testerEmail: 'blabla@email.com',
    tests: [],
    id: '8e56af10-503c-494c-836b-b2f3aa3c56ac'
  };

  const waitActivity = {
    activityType: 'wait',
    testStationName: 'Abshire-Kub',
    testStationPNumber: '09-4129632',
    testStationEmail: 'teststationname@dvsa.gov.uk',
    testStationType: 'gvts',
    testerName: 'gvminnbbl',
    testerStaffId: '9b4q4o87d',
    startTime: '2019-05-23T12:11:11.974Z',
    endTime: null,
    waitReason: ['Waiting for vehicle'],
    notes: '',
    parentId: '8e56af10-503c-494c-836b-b2f3aa3c56ac'
  };

  const testResult: TestResultModel = {
    systemNumber: '1000000',
    testResultId: 'b1972f03-4a1d-482a-a812-7bdd82b1aae9',
    vrm: 'BQ91YHQ',
    vin: '1B7GG36N12S678410',
    testStationName: 'Abshire-Kub',
    testStationPNumber: '09-4129632',
    testStationType: 'gvts',
    testerName: 'dnbcjcmvb',
    testerStaffId: '77deigpn9',
    testerEmailAddress: 'dnbcjcmvb.77deigpn9@email.com',
    testStartTimestamp: '2019-05-23T14:52:33.216Z',
    testEndTimestamp: '2019-05-24T09:12:54.689Z',
    testStatus: 'cancelled',
    reasonForCancellation: 'we',
    vehicleClass: { description: 'small psv (ie: less than or equal to 22 seats)', code: 's' },
    vehicleType: 'psv',
    numberOfSeats: 50,
    vehicleConfiguration: 'rigid',
    odometerReading: null,
    odometerReadingUnits: null,
    preparerId: 'No preparer ID given',
    preparerName: '',
    euVehicleCategory: null,
    countryOfRegistration: 'gb',
    vehicleSize: 'small',
    noOfAxles: 2,
    numberOfWheelsDriven: null,
    testTypes: []
  };

  const newVisit = {
    startTime: '2019-05-23T14:52:02.041Z',
    endTime: null,
    testStationName: 'Abshire-Kub',
    testStationPNumber: '09-4129632',
    testStationEmail: 'teststationname@dvsa.gov.uk',
    testStationType: 'gvts',
    testerId: '77deigpn9',
    testerName: 'dnbcjcmvb',
    testerEmail: 'dnbcjcmvb.77deigpn9@email.com',
    tests: [
      {
        testResultId: 'e2b1f4b7-16d8-440b-bb73-adbc9a0147b9',
        startTime: '2019-05-23T14:52:04.208Z',
        endTime: '2019-05-23T14:52:24.773Z',
        status: 'cancelled',
        reasonForCancellation: 'qw',
        vehicles: [
          {
            vrm: 'BQ91YHQ',
            vin: '1B7GG36N12S678410',
            techRecord: {
              bodyType: { description: 'single decker', code: 's' },
              grossKerbWeight: 13315,
              brakeCode: '171202',
              lastUpdatedAt: '2019-01-16T12:24:38.027Z',
              coifDate: '2010-12-20',
              seatsUpperDeck: 0,
              standingCapacity: 0,
              brakes: {
                brakeCodeOriginal: '123',
                brakeCode: '171202',
                retarderBrakeOne: 'exhaust',
                brakeForceWheelsNotLocked: {
                  parkingBrakeForceA: 2742,
                  serviceBrakeForceA: 7713,
                  secondaryBrakeForceA: 3857
                },
                dataTrBrakeTwo: 'None',
                retarderBrakeTwo: 'exhaust',
                dataTrBrakeOne: 'None',
                dataTrBrakeThree: 'None',
                brakeForceWheelsUpToHalfLocked: {
                  secondaryBrakeForceB: 3329,
                  parkingBrakeForceB: 2130,
                  serviceBrakeForceB: 6658
                }
              },
              bodyModel: 'Tourismo',
              bodyMake: 'Plaxton',
              conversionRefNo: '2',
              grossLadenWeight: 17140,
              axles: [
                {
                  axleNumber: 1,
                  tyres: {
                    tyreSize: '295/80-22.5',
                    speedCategorySymbol: 'j',
                    fitmentCode: 'single',
                    dataTrAxles: 0,
                    plyRating: 'A',
                    tyreCode: 456
                  },
                  parkingBrakeMrk: false,
                  weights: {
                    kerbWeight: 5018,
                    gbWeight: 7100,
                    ladenWeight: 7100,
                    designWeight: 7100
                  }
                },
                {
                  axleNumber: 2,
                  weights: {
                    kerbWeight: 8297,
                    gbWeight: 11500,
                    ladenWeight: 11500,
                    designWeight: 12600
                  },
                  tyres: {
                    tyreSize: '295/80-22.5',
                    speedCategorySymbol: 'j',
                    fitmentCode: 'double',
                    dataTrAxles: 0,
                    plyRating: 'A',
                    tyreCode: 456
                  }
                }
              ],
              createdAt: '2019-01-16T12:24:38.027Z',
              chassisModel: '632,01',
              grossGbWeight: 18000,
              dispensations: 'None',
              vehicleClass: {
                description: 'small psv (ie: less than or equal to 22 seats)',
                code: 's'
              },
              chassisMake: 'Mercedes',
              vehicleSize: 'small',
              noOfAxles: 2,
              grossDesignWeight: 19000,
              vehicleType: 'psv',
              speedLimiterMrk: false,
              vehicleConfiguration: 'rigid',
              regnDate: '2011-01-05',
              seatsLowerDeck: 50,
              tachoExemptMrk: false,
              unladenWeight: 0,
              ntaNumber: '7',
              reasonForCreation: 'COIF',
              speedRestriction: 0,
              manufactureYear: 2010,
              remarks: 'None',
              statusCode: 'current'
            },
            testResultsHistory: [],
            countryOfRegistration: 'gb',
            euVehicleCategory: null,
            odometerReading: null,
            odometerMetric: null,
            preparerId: 'No preparer ID given',
            preparerName: '',
            testTypes: []
          }
        ]
      },
      {
        testResultId: '2d44d0e3-14da-472c-a3d7-f6c1693d84ef',
        startTime: '2019-05-23T14:52:33.216Z',
        endTime: '2019-05-23T14:55:17.148Z',
        status: 'cancelled',
        reasonForCancellation: 'qwe',
        vehicles: [
          {
            vrm: 'BQ91YHQ',
            vin: '1B7GG36N12S678410',
            techRecord: {
              bodyType: { description: 'single decker', code: 's' },
              grossKerbWeight: 13315,
              brakeCode: '171202',
              lastUpdatedAt: '2019-01-16T12:24:38.027Z',
              coifDate: '2010-12-20',
              seatsUpperDeck: 0,
              standingCapacity: 0,
              brakes: {
                brakeCodeOriginal: '123',
                brakeCode: '171202',
                retarderBrakeOne: 'exhaust',
                brakeForceWheelsNotLocked: {
                  parkingBrakeForceA: 2742,
                  serviceBrakeForceA: 7713,
                  secondaryBrakeForceA: 3857
                },
                dataTrBrakeTwo: 'None',
                retarderBrakeTwo: 'exhaust',
                dataTrBrakeOne: 'None',
                dataTrBrakeThree: 'None',
                brakeForceWheelsUpToHalfLocked: {
                  secondaryBrakeForceB: 3329,
                  parkingBrakeForceB: 2130,
                  serviceBrakeForceB: 6658
                }
              },
              bodyModel: 'Tourismo',
              bodyMake: 'Plaxton',
              conversionRefNo: '2',
              grossLadenWeight: 17140,
              axles: [
                {
                  axleNumber: 1,
                  tyres: {
                    tyreSize: '295/80-22.5',
                    speedCategorySymbol: 'j',
                    fitmentCode: 'single',
                    dataTrAxles: 0,
                    plyRating: 'A',
                    tyreCode: 456
                  },
                  parkingBrakeMrk: false,
                  weights: {
                    kerbWeight: 5018,
                    gbWeight: 7100,
                    ladenWeight: 7100,
                    designWeight: 7100
                  }
                },
                {
                  axleNumber: 2,
                  weights: {
                    kerbWeight: 8297,
                    gbWeight: 11500,
                    ladenWeight: 11500,
                    designWeight: 12600
                  },
                  tyres: {
                    tyreSize: '295/80-22.5',
                    speedCategorySymbol: 'j',
                    fitmentCode: 'double',
                    dataTrAxles: 0,
                    plyRating: 'A',
                    tyreCode: 456
                  }
                }
              ],
              createdAt: '2019-01-16T12:24:38.027Z',
              chassisModel: '632,01',
              grossGbWeight: 18000,
              dispensations: 'None',
              vehicleClass: {
                description: 'small psv (ie: less than or equal to 22 seats)',
                code: 's'
              },
              chassisMake: 'Mercedes',
              vehicleSize: 'small',
              noOfAxles: 2,
              grossDesignWeight: 19000,
              vehicleType: 'psv',
              speedLimiterMrk: false,
              vehicleConfiguration: 'rigid',
              regnDate: '2011-01-05',
              seatsLowerDeck: 50,
              tachoExemptMrk: false,
              unladenWeight: 0,
              ntaNumber: '7',
              reasonForCreation: 'COIF',
              speedRestriction: 0,
              manufactureYear: 2010,
              remarks: 'None',
              statusCode: 'current'
            },
            testResultsHistory: [],
            countryOfRegistration: 'gb',
            euVehicleCategory: null,
            odometerReading: null,
            odometerMetric: null,
            preparerId: 'No preparer ID given',
            preparerName: '',
            testTypes: []
          }
        ]
      }
    ],
    id: '3ea6476a-c360-4bd5-9ba5-048c2a428f4c'
  };

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', ['update']);
    httpServiceSpy = jasmine.createSpyObj('HTTPService', ['postActivity', 'updateActivity']);

    TestBed.configureTestingModule({
      providers: [
        ActivityService,
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: AppService, useClass: AppServiceMock },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: HTTPService, useValue: httpServiceSpy }
      ]
    });

    activityService = TestBed.get(ActivityService);
    storageService = TestBed.get(StorageService);
    appService = TestBed.get(AppService);
    httpService = TestBed.get(HTTPService);
  });

  afterEach(() => {
    storageService = null;
    appService = null;
    httpService = null;
  });

  it('should create an activity', () => {
    const newActivity1 = activityService.createActivity(visit, null, false, false);
    expect(newActivity1).toBeTruthy();
    expect(newActivity1.activityType).toBe(VISIT.ACTIVITY_TYPE_UNACCOUNTABLE_TIME);
    expect(storageService.update).not.toHaveBeenCalled();

    const newActivity2 = activityService.createActivity(
      visit,
      VISIT.ACTIVITY_TYPE_WAIT,
      true,
      true
    );
    expect(newActivity2.activityType).toBe(VISIT.ACTIVITY_TYPE_WAIT);
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should check if activities are returned', () => {
    activityService.activities = ActivityDataMock.Activities;
    const activitiesArr = activityService.getActivities();
    expect(activitiesArr).toBeTruthy();
  });

  it('should not update the storage', () => {
    appService.caching = false;
    activityService.updateActivities();
    expect(storageService.update).not.toHaveBeenCalled();
    appService.caching = true;
    activityService.updateActivities();
    expect(storageService.update).toHaveBeenCalled();
  });

  it('should check if postActivity have been called', () => {
    activityService.submitActivity(activity);
    expect(httpService.postActivity).toHaveBeenCalledWith(activity);
  });

  it('should check if updateActivityReason have been called', () => {
    activityService.updateActivityReasons(activitiesForUpdate);
    expect(httpService.updateActivity).toHaveBeenCalledWith(activitiesForUpdate);
  });

  it('should return array of activities for update call', () => {
    const expectedActivitiesForUpdate = activityService.createActivitiesForUpdateCall(ACTIVITIES);
    expect(expectedActivitiesForUpdate[0].id).toBe('8ae539aa-cbfb-49e2-8951-63567003b512');
  });

  it('should create activity body for call on submit/cancel test or end visit', () => {
    let timeline = [];
    timeline.push(waitActivity);
    let activityForBody = activityService.createActivityBodyForCall(visit, null, timeline);
    expect(activityForBody).toBeTruthy();
    expect(activityForBody.activityType).toBe(VISIT.ACTIVITY_TYPE_WAIT);

    activityForBody = activityService.createActivityBodyForCall(visit, null, []);
    expect(activityForBody).toBeTruthy();
    expect(activityForBody.activityType).toBe(VISIT.ACTIVITY_TYPE_WAIT);

    timeline = [];
    timeline.push(newVisit.tests[0]);
    activityForBody = activityService.createActivityBodyForCall(visit, null, timeline);
    expect(activityForBody).toBeTruthy();
    expect(activityForBody.activityType).toBe(VISIT.ACTIVITY_TYPE_WAIT);

    activityForBody = activityService.createActivityBodyForCall(newVisit, testResult, null);
    expect(activityForBody).toBeTruthy();

    const customVisit = newVisit;
    customVisit.tests.shift();
    activityForBody = activityService.createActivityBodyForCall(newVisit, testResult, null);
    expect(activityForBody).toBeTruthy();
  });

  it('should add activity to activities array', () => {
    activityService.addActivity(activity);
    expect(activityService.activities).toBeTruthy();
  });
});
