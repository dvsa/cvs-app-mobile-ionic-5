import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DefectDetailsModel } from '@models/defects/defect-details.model';
import { DefectsService } from '@providers/defects/defects.service';
import { DefectsReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/defects-data.mock';
import {
  DEFICIENCY_CATEGORY,
  MOD_TYPES, PAGE_NAMES,
  REG_EX_PATTERNS,
  SPEC_VALUES,
  TEST_TYPE_FIELDS,
  TEST_TYPE_RESULTS,
  TEST_TYPE_SECTIONS,
  TEST_TYPES_IDS
} from '@app/app.enums';
import { TechRecordDataMock } from '@assets/data-mocks/tech-record-data.mock';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { TestTypeMetadataMock } from '@assets/data-mocks/data-model/test-type-metadata.mock';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { VehicleServiceMock } from '@test-config/services-mocks/vehicle-service.mock';
import { of } from 'rxjs/observable/of';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { DefectCategoryReferenceDataModel } from '@models/reference-data-models/defects.reference-model';
import { VehicleTechRecordModel } from '@models/vehicle/tech-record.model';
import { ActionSheetControllerMock } from 'ionic-mocks';
import { AnalyticsService } from '@providers/global';
import { TestCompletePage } from '@app/pages/testing/test-creation/test-complete/test-complete';
import { RouterTestingModule } from '@angular/router/testing';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';
import { Router } from '@angular/router';
import { ModalControllerMock } from '@test-config/mocks/modal-controller.mock';

describe('Component: CompleteTestPage', () => {
  let comp: TestCompletePage;
  let fixture: ComponentFixture<TestCompletePage>;

  let navCtrl: NavController;
  let defectsService: DefectsService;
  let alertCtrl: AlertController;
  let actionSheetCtrl: ActionSheetController;
  let defectsServiceSpy: any;
  let visitService: VisitService;
  let vehicleService: VehicleService;
  let modalCtrl: ModalController;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: any;

  const DEFECTS: DefectCategoryReferenceDataModel[] = DefectsReferenceDataMock.DefectsData;
  const ADDED_DEFECT: DefectDetailsModel = {
    deficiencyRef: '1.1.a',
    deficiencyCategory: DEFICIENCY_CATEGORY.MAJOR,
    deficiencyId: 'a',
    deficiencyText: 'missing',
    imNumber: 1,
    imDescription: 'test',
    itemNumber: 1,
    stdForProhibition: false,
    deficiencySubId: null,
    itemDescription: 'test2',
    metadata: {
      category: {}
    },
    prs: false,
    prohibitionIssued: false,
    additionalInformation: {
      notes: '',
      location: {
        vertical: '',
        horizontal: '',
        lateral: '',
        longitudinal: '',
        rowNumber: null,
        seatNumber: null,
        axleNumber: null
      }
    }
  };

  const TEST_TYPES_METADATA = TestTypeMetadataMock.TestTypeMetadata;
  const VEHICLE_TEST: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const VEHICLE: VehicleTechRecordModel = TechRecordDataMock.VehicleTechRecordData;

  beforeEach(waitForAsync(() => {
    defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
      getDefectsFromStorage: of(DEFECTS)
    });

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'setCurrentPage',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      declarations: [TestCompletePage],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.TEST_CREATE_PAGE,
            component: TestCreatePage
          }
        ])],
      providers: [
        NavController,
        ChangeDetectorRef,
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: TestTypeService, useClass: TestTypeServiceMock },
        AlertController,
        {
          provide: ActionSheetController,
          useFactory: () => ActionSheetControllerMock.instance()
        },
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: VehicleService, useClass: VehicleServiceMock },
        { provide: DefectsService, useValue: defectsServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCompletePage);
    comp = fixture.componentInstance;
    navCtrl = TestBed.inject(NavController);
    defectsService = TestBed.inject(DefectsService);
    alertCtrl = TestBed.inject(AlertController);
    visitService = TestBed.inject(VisitService);
    vehicleService = TestBed.inject(VehicleService);
    modalCtrl = TestBed.inject(ModalController);
    actionSheetCtrl = TestBed.inject(ActionSheetController);
    analyticsService = TestBed.inject(AnalyticsService);
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              previousPage: PAGE_NAMES.TEST_CREATE_PAGE,
              vehicle: VEHICLE,
              vehicleTest: VEHICLE_TEST,
              completedFields: {},
              errorIncomplete: false,
              fromTestReview: false,
            }
          }
      } as any
    );
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    visitService = null;
    vehicleService = null;
    modalCtrl = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should check if an ADR test-type has a 6 digits certificateNumber, if not set error true', () => {
    spyOn(comp, 'updateTestType');
    spyOn(comp, 'getTestTypeDetails');
    comp.vehicleTest = { ...VEHICLE_TEST };
    comp.errorIncomplete = true;
    comp.vehicleTest.testTypeId = '50';
    comp.vehicleTest.certificateNumber = '1234';
    comp.completedFields = {};
    expect(comp.errorIncompleteCertificateNumber).toBe(undefined);
    comp.ngOnInit();
    expect(comp.updateTestType).toHaveBeenCalled();
    expect(comp.errorIncompleteCertificateNumber).toBeTruthy();
    comp.errorIncomplete = false;
    comp.vehicleTest.certificateNumber = '123456';
    comp.errorIncompleteCertificateNumber = undefined;
    comp.ngOnInit();
    expect(comp.errorIncompleteCertificateNumber).toBe(undefined);
  });

  it('should check if a TIR test-type has a 5 digits certificateNumber, if not set error true', () => {
    spyOn(comp, 'updateTestType');
    spyOn(comp, 'getTestTypeDetails');
    comp.vehicleTest = { ...VEHICLE_TEST };
    comp.errorIncomplete = true;
    comp.vehicleTest.testTypeId = '49';
    comp.vehicleTest.certificateNumber = '1234';
    comp.completedFields = {};
    expect(comp.errorIncompleteCertificateNumber).toBe(undefined);
    comp.ngOnInit();
    expect(comp.updateTestType).toHaveBeenCalled();
    expect(comp.errorIncompleteCertificateNumber).toBeTruthy();
    comp.errorIncomplete = false;
    comp.vehicleTest.certificateNumber = '12345';
    comp.errorIncompleteCertificateNumber = undefined;
    comp.ngOnInit();
    expect(comp.errorIncompleteCertificateNumber).toBe(undefined);
  });

  it('should test ionViewDidEnter logic - modalCtrl.dismiss to be called', async () => {
    comp.fromTestReview = true;
    comp.vehicleTest = VEHICLE_TEST;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.ABANDONED;
    spyOn(modalCtrl, 'dismiss');
    await comp.ionViewDidEnter();
    expect(await modalCtrl.dismiss).toHaveBeenCalled();
  });

  it('should test ionViewDidEnter logic - modalCtrl.dismiss not to be called', async () => {
    comp.vehicleTest = VEHICLE_TEST;
    comp.fromTestReview = false;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.PASS;
    spyOn(modalCtrl, 'dismiss');
    await comp.ionViewDidEnter();
    expect(await modalCtrl.dismiss).not.toHaveBeenCalled();
  });

  it('should VisitService and Root Component share the same instance', inject(
    [VisitService],
    (injectService: VisitService) => {
      expect(injectService).toBe(visitService);
    }
  ));

  it('should convert to number', () => {
    const number = '5';
    expect(comp.convertToNumber(number)).toEqual(jasmine.any(Number));
  });

  it('should check if array of defects length is 0 after removing the only addedDefect', () => {
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    expect(comp.vehicleTest.defects.length).toBeFalsy();
    comp.vehicleTest.defects.push(ADDED_DEFECT);
    expect(comp.vehicleTest.defects.length).toBeTruthy();
    comp.removeDefect(ADDED_DEFECT);
    expect(comp.vehicleTest.defects.length).toBeFalsy();
  });

  it('should update the test type fields', () => {
    comp.completedFields = {};
    comp.completedFields.numberOfSeatbeltsFitted = 3;
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.testTypeDetails = comp.getTestTypeDetails();
    expect(comp.vehicleTest.numberOfSeatbeltsFitted).toBeFalsy();
    comp.updateTestType();
    expect(comp.vehicleTest.numberOfSeatbeltsFitted).toEqual(3);
  });

  it('should get the correct ddl value to be displayed', () => {
    comp.completedFields = {};
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.PASS;
    expect(comp.getDDLValueToDisplay(TEST_TYPES_METADATA.sections[0].inputs[0])).toEqual('Pass');

    comp.vehicleTest = { ...VEHICLE_TEST };
    comp.vehicleTest.modType = MOD_TYPES.P.toLowerCase();
    expect(comp.getDDLValueToDisplay(TEST_TYPES_METADATA.sections[3].inputs[0])).toEqual('P');
  });

  it('should tell if a section can be displayed', () => {
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.vehicleTest.testResult = null;
    expect(comp.canDisplaySection(TEST_TYPES_METADATA.sections[1])).toBeFalsy();
    // comp.vehicleTest[TEST_TYPES_METADATA.sections[1].dependentOn[0]] = 'pass';
    expect(comp.canDisplaySection(TEST_TYPES_METADATA.sections[1])).toBeTruthy();

    comp.vehicleTest.testTypeId = TEST_TYPES_IDS._44;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.FAIL;
    let section = TestTypeMetadataMock.TestTypeMetadata.sections[0];
    section.sectionName = TEST_TYPE_SECTIONS.EMISSION_DETAILS;
    expect(comp.canDisplaySection(section)).toBeFalsy();

    comp.vehicleTest.testTypeId = TEST_TYPES_IDS._49;
    section.inputs[0].type = TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM;
    expect(comp.canDisplaySection(section)).toBeFalsy();

    comp.vehicleTest.testTypeId = '133'; // specialist test only
    section.inputs[0].type = TEST_TYPE_FIELDS.CERTIFICATE_NUMBER;
    expect(comp.canDisplaySection(section)).toBeFalsy();

    comp.vehicleTest.testTypeId = '142';
    expect(comp.canDisplaySection(section)).toBeFalsy();

    comp.vehicleTest.testTypeId = '38';
    expect(comp.canDisplaySection(section)).toBeFalsy();

    comp.vehicleTest.testTypeId = '130'; //specialist IVA/Retest
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.FAIL;
    section.inputs[0].type = TEST_TYPE_FIELDS.CERTIFICATE_NUMBER;
    expect(comp.canDisplaySection(section)).toBeTruthy();
  });

  describe('canDisplayInput', () => {
    let inputMeta;

    beforeEach(() => {
      // comp.vehicleTest = navParams.get('vehicleTest');
      comp.vehicleTest = VEHICLE_TEST;
      comp.testTypeDetails = comp.getTestTypeDetails();
      inputMeta = TEST_TYPES_METADATA.sections[2].inputs[2];
      comp.completedFields = {
        seatbeltInstallationCheckDate: false
      };
    });

    it('should be truthy when seatbeltInstallationCheckDate is false', () => {
      expect(comp.canDisplayInput(inputMeta)).toBeTruthy();
    });

    it('should be falsy when seatbeltInstallationCheckDate is true', () => {
      comp.completedFields.seatbeltInstallationCheckDate = true;
      expect(comp.canDisplayInput(inputMeta)).toBeFalsy();
    });

    it('should show Certificate field when test fail for specialist IVA or Retest', () => {
      comp.vehicleTest.testTypeId = '130';
      comp.completedFields = {};
      inputMeta = TEST_TYPES_METADATA.sections[1].inputs[1];
      inputMeta = {
        ...inputMeta,
        type: TEST_TYPE_FIELDS.CERTIFICATE_NUMBER,
        dependentOn: [
          {
            testTypePropertyName: 'testResult',
            valueToBeDifferentFrom: TEST_TYPE_RESULTS.FAIL
          }
        ]
      };

      expect(comp.canDisplayInput(inputMeta)).toBeTruthy();
    });
  });

  it('should create a handler for a DDL button', () => {
    comp.today = new Date().toISOString();
    comp.completedFields = {};
    comp.vehicleTest = { ...VEHICLE_TEST };
    comp.vehicleTest.lastSeatbeltInstallationCheckDate = '2019-01-14';
    let input = TestTypeMetadataMock.TestTypeMetadata.sections[2].inputs[0];
    comp.createDDLButtons(input);
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.lastSeatbeltInstallationCheckDate).toBeNull();
    comp.createDDLButtonHandler(input, 0);
    expect(comp.vehicleTest.lastSeatbeltInstallationCheckDate).toBeDefined();
    input = TestTypeMetadataMock.TestTypeMetadata.sections[0].inputs[0];
    comp.vehicleTest.certificateNumber = '1234';
    comp.vehicleTest.testExpiryDate = '2019-01-14';
    comp.vehicleTest.testTypeId = '50';
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.certificateNumber).toBe(null);
    expect(comp.vehicleTest.testExpiryDate).toBe(null);

    comp.vehicleTest.testTypeId = TEST_TYPES_IDS._49;
    comp.vehicleTest.certificateNumber = '76322';
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.certificateNumber).toBeNull();

    comp.vehicleTest.testTypeId = TEST_TYPES_IDS._44;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.FAIL;
    comp.vehicleTest.emissionStandard = SPEC_VALUES.EMISSION_STANDARD;
    input = TestTypeMetadataMock.TestTypeMetadata.sections[0].inputs[0];
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.emissionStandard).toBeNull();

    comp.vehicleTest.modificationTypeUsed = 'mod';
    input = TestTypeMetadataMock.TestTypeMetadata.sections[3].inputs[0];
    comp.createDDLButtonHandler(input, 0);
    expect(comp.vehicleTest.modificationTypeUsed).toBeNull();

    comp.vehicleTest.particulateTrapFitted = 'jhb56';
    comp.vehicleTest.particulateTrapSerialNumber = 'serial';
    comp.createDDLButtonHandler(input, 1);
    expect(comp.vehicleTest.particulateTrapFitted).toBeNull();
    expect(comp.vehicleTest.particulateTrapSerialNumber).toBeNull();
  });

  it('should test ionViewWillEnter logic', () => {
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.vehicleTest.testTypeId = '47';
    comp.ionViewWillEnter();
    expect(comp.isNotifiableAlteration).toBeTruthy();
    comp.vehicleTest.testTypeId = '50';
    comp.ionViewWillEnter();
    expect(comp.isNotifiableAlteration).toBeFalsy();
    expect(comp.blockTestResultSelection).toBeFalsy();
  });

  it('should activate the notifiable alteration error if certain condition met', () => {
    comp.isNotesIncompleteError = false;
    comp.isNotifiableAlteration = true;
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.vehicleTest.testResult = TEST_TYPE_RESULTS.FAIL;
    comp.vehicleTest.additionalNotesRecorded = null;
    comp.onSave();
    expect(comp.isNotesIncompleteError).toBeTruthy();
  });

  it('should test openInputModalDismissHandler logic', () => {
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.vehicleTest = VEHICLE_TEST;
    comp.openInputModalDismissHandler(
      TestTypeMetadataMock.TestTypeMetadata.sections[0].inputs[0],
      {
        fromTestReview: false,
        errorIncomplete: false
      }
    );
    expect(comp.errorIncomplete).toBeFalsy();
  });

  it('should test openInputPage logic', () => {
    // comp.vehicleTest = navParams.get('vehicleTest');
    comp.testTypeDetails = TestTypeMetadataMock.TestTypeMetadata;
    comp.completedFields = {};
    comp.openInputPage(
      TestTypeMetadataMock.TestTypeMetadata.sections[0],
      TestTypeMetadataMock.TestTypeMetadata.sections[0].inputs[0]
    );
    expect(modalCtrl.create).toHaveBeenCalled();
  });

  it('should take only the first 6 digits from a string and assign them to the certificate number and only the first 5 for TIR tests and only the first 20 for specialist tests', () => {
    comp.vehicleTest = TestTypeDataModelMock.TestTypeData;
    comp.testTypeDetails = comp.getTestTypeDetails();
    comp.completedFields = {};
    comp.vehicleTest.certificateNumber = null;
    comp.certificateNumberInputChange('12345678');
    expect(comp.vehicleTest.certificateNumber).toEqual('123456');

    comp.vehicleTest.testTypeId = '49';
    comp.certificateNumberInputChange('123456');
    expect(comp.vehicleTest.certificateNumber).toEqual('12345');

    comp.vehicleTest.testTypeId = '125';
    comp.certificateNumberInputChange('123456789123456789123');
    expect(comp.vehicleTest.certificateNumber).toEqual('12345678912345678912');

    comp.vehicleTest.testTypeId = '142';
    comp.certificateNumberInputChange('123456789123456789123');
    expect(comp.vehicleTest.certificateNumber).toEqual('12345678912345678912');

    comp.vehicleTest.testTypeId = '38';
    comp.certificateNumberInputChange('123456789123456789123');
    expect(comp.vehicleTest.certificateNumber).toEqual('12345678912345678912');
  });

  it('should open ddl when blockTestResultSelection is false', () => {
    let input = {} as any;
    input.testTypePropertyName = 'testResult';
    comp.blockTestResultSelection = false;
    comp.openDDL(input);
    expect(actionSheetCtrl.create).toHaveBeenCalled();
  });

  it('should not open ddl when blockTestResultSelection is true and input is testResult', () => {
    let input = {} as any;
    input.testTypePropertyName = 'testResult';
    comp.blockTestResultSelection = true;
    comp.openDDL(input);
    expect(actionSheetCtrl.create).not.toHaveBeenCalled();
  });

  it('should return the correct type of the certificate number field', () => {
    comp.vehicleTest = { ...TestTypeDataModelMock.TestTypeData };
    comp.vehicleTest.testTypeId = '125';
    expect(comp.getTypeForCertificateNumberField()).toEqual('text');

    comp.vehicleTest.testTypeId = '142';
    expect(comp.getTypeForCertificateNumberField()).toEqual('text');

    comp.vehicleTest.testTypeId = '38';
    expect(comp.getTypeForCertificateNumberField()).toEqual('text');

    comp.vehicleTest.testTypeId = '1';
    expect(comp.getTypeForCertificateNumberField()).toEqual('number');
  });

  it('should return the correct pattern of the certificate number field', () => {
    comp.vehicleTest = { ...TestTypeDataModelMock.TestTypeData };
    comp.vehicleTest.testTypeId = '125';
    expect(comp.getPatternForCertificateNumberField()).toEqual('');

    comp.vehicleTest.testTypeId = '142';
    expect(comp.getPatternForCertificateNumberField()).toEqual('');

    comp.vehicleTest.testTypeId = '38';
    expect(comp.getPatternForCertificateNumberField()).toEqual('');

    comp.vehicleTest.testTypeId = '1';
    expect(comp.getPatternForCertificateNumberField()).toEqual(REG_EX_PATTERNS.NUMERIC);
  });

  it('should open the modal for specialist defects details page', () => {
    comp.toSpecialistDefectDetailsPage(false);
    expect(modalCtrl.create).toHaveBeenCalled();
  });
});
