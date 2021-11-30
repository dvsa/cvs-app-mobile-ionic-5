import { TestBed } from '@angular/core/testing';
import { StorageService } from '../natives/storage.service';
import { TestTypeService } from './test-type.service';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { VisitService } from '../visit/visit.service';
import {
  DefectDetailsModel,
  SpecialistCustomDefectModel
} from '@models/defects/defect-details.model';
import { DefectDetailsDataMock } from '@assets/data-mocks/defect-details-data.mock';
import { TestTypesReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/test-types.mock';
import { CommonFunctionsService } from '../utils/common-functions';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  DURATION_TYPE,
  TEST_TYPE_RESULTS,
  VEHICLE_TYPE
} from '@app/app.enums';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';
import { AnalyticsService, DurationService } from '../global';
import { Duration } from '@models/duration.model';

describe('Provider: TestTypeService', () => {
  let testTypeService: TestTypeService;
  let storageService: StorageService;
  let storageServiceSpy: any;
  let visitService: VisitService;
  let visitServiceSpy: any;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let durationService: DurationService;

  const TEST_TYPES: TestTypesReferenceDataModel[] = TestTypesReferenceDataMock.TestTypesData;
  const DEFECT: DefectDetailsModel = DefectDetailsDataMock.DefectData;

  beforeEach(() => {
    storageServiceSpy = jasmine.createSpyObj('StorageService', {
      read: new Promise((resolve) => TEST_TYPES)
    });
    visitServiceSpy = jasmine.createSpyObj('VisitService', ['updateVisit']);
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      providers: [
        TestTypeService,
        CommonFunctionsService,
        DurationService,
        { provide: VisitService, useValue: visitServiceSpy },
        { provide: StorageService, useValue: storageServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ]
    });

    testTypeService = TestBed.inject(TestTypeService);
    storageService = TestBed.inject(StorageService);
    visitService = TestBed.inject(VisitService);
    analyticsService = TestBed.inject(AnalyticsService);
    durationService = TestBed.inject(DurationService);
  });

  afterEach(() => {
    testTypeService = null;
    storageService = null;
    visitService = null;
  });

  it('create a testType', () => {
    const testType: TestTypesReferenceDataModel = TEST_TYPES[0];
    const newTestType = testTypeService.createTestType(testType, VEHICLE_TYPE.PSV);
    expect(newTestType.testTypeName).toMatch('Annual test');
  });

  it('should put end time on the testType', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    expect(testType.testTypeEndTimestamp).toBeNull();
    testTypeService.endTestType(testType);
    expect(testType.testTypeEndTimestamp).toBeTruthy();
  });

  describe('addDefect', () => {
    let getDurationSpy: jasmine.Spy; let getTakenDurationSpy: jasmine.Spy;
    let timeStart: number;
    let timeEnd: number;

    beforeEach(() => {
      timeStart = 1620242516913;
      timeEnd = 1620243020205;
      spyOn(Date, 'now').and.returnValue(timeEnd);

      spyOn(durationService, 'setDuration');
      getDurationSpy = spyOn(durationService, 'getDuration').and.returnValue({start: 12345, end: 123456});
      getTakenDurationSpy = spyOn(durationService, 'getTakenDuration').and.returnValue(1234);
    });

    it('should add a defect in test array', async () => {
      const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
      expect(testType.defects.length).toEqual(0);

      await testTypeService.addDefect(testType, DEFECT);

      expect(testType.defects.length).toEqual(1);
      expect(visitService.updateVisit).toHaveBeenCalled();
      expect(analyticsService.logEvent).toHaveBeenCalled();
      expect(analyticsService.addCustomDimension).toHaveBeenCalled();
    });

    it('should track adding of defect event', async () => {
      const { deficiencyRef } = DefectDetailsDataMock.DefectData;

      await testTypeService.trackAddDefect(deficiencyRef);

      expect(analyticsService.logEvent).toHaveBeenCalledWith({
        category: ANALYTICS_EVENT_CATEGORIES.DEFECTS,
        event: ANALYTICS_EVENTS.ADD_DEFECT,
        label: ANALYTICS_LABEL.DEFICIENCY_REFERENCE
      });

      const key = Object.keys(ANALYTICS_LABEL).indexOf('DEFICIENCY_REFERENCE') + 1;
      expect(analyticsService.addCustomDimension).toHaveBeenCalledWith(key, deficiencyRef);
    });

    it('should track defect Duration', async () => {
      const strType: string = DURATION_TYPE[DURATION_TYPE.DEFECT_TIME];
      const duration: Duration = { start: timeStart, end: timeEnd };
      getDurationSpy.and.returnValue(duration);
      getTakenDurationSpy.and.returnValue(timeEnd);

      await testTypeService.trackDefectDuration();

      expect(durationService.setDuration).toHaveBeenCalledWith({ end: timeEnd }, strType);
      expect(durationService.getDuration).toHaveBeenCalledWith(strType);
      expect(durationService.getTakenDuration).toHaveBeenCalledWith(duration);
    });
  });

  it('should remove a defect from test', async () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    expect(testType.defects.length).toEqual(2);

    await testTypeService.removeDefect(testType, DEFECT);

    expect(testType.defects.length).toEqual(1);
    expect(analyticsService.logEvent).toHaveBeenCalled();
    expect(analyticsService.addCustomDimension).toHaveBeenCalled();
  });

  it('should track removing of defect event', async () => {
    const { deficiencyRef } = DefectDetailsDataMock.DefectData;
    const strRemoveLabel = 'DEFICIENCY_REFERENCE';

    await testTypeService.trackRemoveDefect(deficiencyRef);

    expect(analyticsService.logEvent).toHaveBeenCalledWith({
      category: ANALYTICS_EVENT_CATEGORIES.DEFECTS,
      event: ANALYTICS_EVENTS.REMOVE_DEFECT,
      label: ANALYTICS_LABEL[strRemoveLabel]
    });

    const key = Object.keys(ANALYTICS_LABEL).indexOf(strRemoveLabel) + 1;
    expect(analyticsService.addCustomDimension).toHaveBeenCalledWith(key, deficiencyRef);
  });

  it('should set test result to FAIL: hasDefects true', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    const hasDefects = true;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    const result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.FAIL);
  });

  it('should set test result to FAIL: hasDefects false', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    const hasDefects = false;
    testType.defects = DefectDetailsDataMock.DefectDetails;
    const result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.FAIL);
  });

  it('should set test result PASS: hasDefects false', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    const hasDefects = false;
    const result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.PASS);
  });

  it('should set test result PRS: hasDefects false', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    const hasDefects = true;
    testType.defects.push(DefectDetailsDataMock.DefectData);
    testType.defects[0].prs = true;
    const result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.PRS);
  });

  it('should set test result: ABANDONED', () => {
    const testType: TestTypeModel = TestTypeDataModelMock.TestTypeData;
    testType.reasons.push('abandon ship');
    const hasDefects = true;
    const result = testTypeService.setTestResult(testType, hasDefects);
    expect(result).toMatch(TEST_TYPE_RESULTS.ABANDONED);
  });

  it('should ordered testType array', () => {
    const testTypes: TestTypeModel[] = [];
    testTypes.push(TestTypeDataModelMock.TestTypeData);
    testTypes.push(TestTypeDataModelMock.TestTypeData);
    testTypes[0].testTypeId = '2';
    expect(testTypes[0].testTypeId).toMatch('2');
    const orderedTestTypes: TestTypeModel[] = testTypeService.orderTestTypesArray(
      testTypes,
      'testTypeId',
      'asc'
    );
    expect(orderedTestTypes[0].testTypeId).toMatch('1');
  });

  it('should return data from local storage', () => {
    testTypeService.getTestTypesFromStorage().subscribe((data) => {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      expect(data).toBe(<TestTypesReferenceDataModel[]>TEST_TYPES);
    });
  });

  it('should update test types result when completing an adr and an annual test type at the same time', () => {
    const adrTestType = { ...TestTypeDataModelMock.TestTypeData };
    const annualTestType = { ...TestTypeDataModelMock.TestTypeData };
    const vehicle = VehicleDataMock.VehicleData;
    adrTestType.testTypeId = '50';
    adrTestType.testResult = TEST_TYPE_RESULTS.PASS;
    adrTestType.certificateNumber = '6776322';
    vehicle.testTypes.push(adrTestType);
    annualTestType.testTypeId = '40'; // or 94
    annualTestType.testResult = TEST_TYPE_RESULTS.FAIL;
    vehicle.testTypes.push(annualTestType);
    expect(testTypeService.updateLinkedTestResults(vehicle, adrTestType)).toBeTruthy();
    expect(vehicle.testTypes[0].testResult).toEqual(TEST_TYPE_RESULTS.FAIL);
    expect(vehicle.testTypes[0].certificateNumber).toEqual(null);

    expect(testTypeService.updateLinkedTestResults(vehicle, annualTestType)).toBeFalsy();
  });

  it('should check if testType is ADR or not', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '50';
    expect(testTypeService.isAdrTestType(testType.testTypeId)).toBeTruthy();
    testType.testTypeId = '1';
    expect(testTypeService.isAdrTestType(testType.testTypeId)).toBeFalsy();
  });

  it('should check if testType is LEC or not', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '39';
    expect(testTypeService.isLecTestType(testType.testTypeId)).toBeTruthy();
    testType.testTypeId = '1';
    expect(testTypeService.isLecTestType(testType.testTypeId)).toBeFalsy();
  });

  it('should check if testType is TIR or not', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '49';
    expect(testTypeService.isTirTestType(testType.testTypeId)).toBeTruthy();
    testType.testTypeId = '1';
    expect(testTypeService.isTirTestType(testType.testTypeId)).toBeFalsy();
  });

  it('should check if testType is specialist test or not', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '150';
    expect(testTypeService.isSpecialistTestType(testType.testTypeId)).toBeTruthy();
    testType.testTypeId = '1';
    expect(testTypeService.isSpecialistTestType(testType.testTypeId)).toBeFalsy();
  });

  it('should remove a specific specialist custom defect', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.customDefects.push({} as SpecialistCustomDefectModel);
    expect(testType.customDefects.length).toEqual(1);

    testTypeService.removeSpecialistCustomDefect(testType, 0);
    expect(testType.customDefects.length).toEqual(0);
  });

  it('should check if custom defects are completely captured', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.customDefects.push({} as SpecialistCustomDefectModel);
    expect(testTypeService.areSpecialistCustomDefectsCompleted(testType)).toBeFalsy();

    testType.customDefects[0].hasAllMandatoryFields = true;
    expect(testTypeService.areSpecialistCustomDefectsCompleted(testType)).toBeTruthy();
  });

  it('should check if test type is IVA test or retest', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '125';
    expect(
      testTypeService.isSpecialistIvaTestAndRetestTestType(testType.testTypeId)
    ).toBeTruthy();
  });

  it('should check if test type is Specialist test except for CoifAndVoluntaryIvaTestAndRetest', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '125';
    expect(
      testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        testType.testTypeId
      )
    ).toBeTruthy();
  });

  it('should check if test type is Specialist test part of Coif', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '142';
    expect(testTypeService.isSpecialistPartOfCoifTestTypes(testType.testTypeId)).toBeTruthy();
  });

  it('should check if test type is PSV Notifiable Alteration test', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '38';
    expect(testTypeService.isPsvNotifiableAlterationTestType(testType.testTypeId)).toBeTruthy();
  });

  it('should check if test type Coif with annual test', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '175';
    expect(testTypeService.isSpecialistCoifWithAnnualTest(testType.testTypeId)).toBeTruthy();
  });

  it('should check if test type Coif with annual test', () => {
    const testType = { ...TestTypeDataModelMock.TestTypeData };
    testType.testTypeId = '153';
    expect(
      testTypeService.isSpecialistWithoutCertificateNumberCapturedIds(testType.testTypeId)
    ).toBeTruthy();
  });
});
