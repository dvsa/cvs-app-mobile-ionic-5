// import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
// import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
// import { DefectDetailsPage } from './defect-details';
// import { DefectsService } from '../../../../providers/defects/defects.service';
// import { DefectDetailsModel } from '../../../../models/defects/defect-details.model';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { TestTypeModel } from '../../../../models/tests/test-type.model';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
// import { TestTypeService } from '../../../../providers/test-type/test-type.service';
// import { TestTypeServiceMock } from '../../../../../test-config/services-mocks/test-type-service.mock';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { By } from '@angular/platform-browser';
// import {
//   TEST_TYPE_RESULTS,
//   DEFICIENCY_CATEGORY,
//   APP_STRINGS,
//   ANALYTICS_EVENT_CATEGORIES,
//   ANALYTICS_EVENTS,
//   ANALYTICS_LABEL
// } from '../../../../app/app.enums';
// import { NavControllerMock } from '../../../../../test-config/ionic-mocks/nav-controller.mock';
// import { AnalyticsService } from '../../../../providers/global';
//
// describe('Component: DefectDetailsPage', () => {
//   let comp: DefectDetailsPage;
//   let fixture: ComponentFixture<DefectDetailsPage>;
//   let navCtrl: NavController;
//   let navParams: NavParams;
//   let defectsService: DefectsService;
//   let testTypeService: TestTypeService;
//   let analyticsService: AnalyticsService;
//   let analyticsServiceSpy: any;
//
//   const vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
//   const defect: DefectDetailsModel = {
//     deficiencyRef: '1.1.a',
//     deficiencyCategory: 'major',
//     deficiencyId: 'a',
//     deficiencySubId: null,
//     deficiencyText: 'missing',
//     imNumber: 1,
//     imDescription: 'test',
//     itemNumber: 1,
//     itemDescription: 'test2',
//     stdForProhibition: false,
//     metadata: {
//       category: {
//         additionalInfo: {
//           location: {
//             axleNumber: [],
//             horizontal: [],
//             lateral: [],
//             longitudinal: ['front'],
//             rowNumber: [],
//             seatNumber: [],
//             vertical: []
//           },
//           notes: false
//         }
//       }
//     },
//     prs: false,
//     prohibitionIssued: false,
//     additionalInformation: {
//       notes: '',
//       location: {
//         vertical: '',
//         horizontal: '',
//         lateral: '',
//         longitudinal: '',
//         rowNumber: null,
//         seatNumber: null,
//         axleNumber: null
//       }
//     }
//   };
//
//   const addedDefect: DefectDetailsModel = {
//     deficiencyRef: '1.1.a',
//     deficiencyCategory: 'major',
//     deficiencyId: 'a',
//     deficiencyText: 'missing',
//     deficiencySubId: null,
//     imNumber: 1,
//     imDescription: 'test',
//     itemNumber: 1,
//     itemDescription: 'test2',
//     stdForProhibition: false,
//     metadata: {
//       category: {
//         additionalInfo: {
//           location: {
//             axleNumber: [],
//             horizontal: [],
//             lateral: [],
//             longitudinal: ['front'],
//             rowNumber: [],
//             seatNumber: [],
//             vertical: []
//           },
//           notes: false
//         }
//       }
//     },
//     prs: false,
//     prohibitionIssued: false,
//     additionalInformation: {
//       notes: '',
//       location: {
//         vertical: '',
//         horizontal: '',
//         lateral: '',
//         longitudinal: '',
//         rowNumber: null,
//         seatNumber: null,
//         axleNumber: null
//       }
//     }
//   };
//   const isEdit: boolean = false;
//   let defectsServiceSpy;
//
//   beforeEach(async(() => {
//     defectsServiceSpy = jasmine.createSpyObj('DefectsService', {
//       getBadgeColor: 'danger'
//     });
//
//     analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
//       'logEvent',
//       'addCustomDimension'
//     ]);
//
//     TestBed.configureTestingModule({
//       declarations: [DefectDetailsPage],
//       imports: [IonicModule.forRoot(DefectDetailsPage)],
//       providers: [
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: TestTypeService, useClass: TestTypeServiceMock },
//         { provide: DefectsService, useValue: defectsServiceSpy },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useClass: ViewControllerMock },
//         { provide: AnalyticsService, useValue: analyticsServiceSpy }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     });
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DefectDetailsPage);
//     comp = fixture.componentInstance;
//     defectsService = TestBed.get(DefectsService);
//     navCtrl = TestBed.get(NavController);
//     navParams = TestBed.get(NavParams);
//     testTypeService = TestBed.get(TestTypeService);
//     analyticsService = TestBed.get(AnalyticsService);
//   });
//
//   beforeEach(() => {
//     const navParams = fixture.debugElement.injector.get(NavParams);
//
//     navParams.get = jasmine.createSpy('get').and.callFake((param) => {
//       let params = {
//         vehicleTest: vehicleTest,
//         deficiency: defect,
//         isEdit: isEdit
//       };
//       return params[param];
//     });
//   });
//
//   beforeEach(() => {
//     comp.defect = navParams.get('deficiency');
//     comp.vehicleTest = navParams.get('vehicleTest');
//     comp.isEdit = navParams.get('isEdit');
//     spyOn(comp, 'showProhibitionAlert');
//   });
//
//   afterEach(() => {
//     fixture.destroy();
//     comp = null;
//     defectsService = null;
//     testTypeService = null;
//   });
//
//   it('should create component', (done) => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//     done();
//   });
//
//   it('should TestTypeService and Root Component share the same instance', inject(
//     [TestTypeService],
//     (injectService: TestTypeService) => {
//       expect(injectService).toBe(testTypeService);
//     }
//   ));
//
//   it('should check if the defect was added before', () => {
//     comp.vehicleTest.defects.push(addedDefect);
//     expect(comp.checkIfDefectWasAdded()).toBeTruthy();
//   });
//
//   it('should check if the PRS option is available for major defects', () => {
//     comp.checkForPrs(defect);
//     expect(comp.defect.prs).toBeFalsy();
//     expect(comp.showPrs).toBeTruthy();
//   });
//
//   it('should check if the PRS option is available for dangerous defects', () => {
//     defect.deficiencyCategory = 'dangerous';
//     comp.checkForPrs(defect);
//     expect(comp.defect.prs).toBeFalsy();
//     expect(comp.showPrs).toBeTruthy();
//   });
//
//   it('should check if the PRS option is unavailable for minor defects', () => {
//     defect.deficiencyCategory = 'minor';
//     comp.checkForPrs(defect);
//     expect(comp.defect.prs).toBeNull();
//     expect(comp.showPrs).toBeFalsy();
//   });
//
//   it('should change the notesChanged after the textarea value changes', () => {
//     fixture.detectChanges();
//     fixture.whenStable().then(() => {
//       expect(comp.notesChanged).toBeFalsy();
//       let textarea = fixture.debugElement.query(By.css('.textarea-height'));
//       textarea.nativeElement.value = 'new note';
//       textarea.nativeElement.dispatchEvent(new Event('input'));
//       expect(comp.notesChanged).toBeTruthy();
//     });
//   });
//
//   it('should track the defect reference when a note is added', async () => {
//     comp.fromTestReview = true;
//     comp.notesChanged = true;
//
//     await comp.addDefect();
//
//     expect(analyticsService.logEvent).toHaveBeenCalledWith({
//       category: ANALYTICS_EVENT_CATEGORIES.DEFECTS,
//       event: ANALYTICS_EVENTS.DEFECT_NOTES_USAGE,
//       label: ANALYTICS_LABEL.DEFICIENCY_REFERENCE
//     });
//
//     const key = Object.keys(ANALYTICS_LABEL).indexOf('DEFICIENCY_REFERENCE') + 1;
//     expect(analyticsService.addCustomDimension).toHaveBeenCalledWith(key, defect.deficiencyRef);
//   });
//
//   it('should not change the prohibition attributes if defect category is not dangerous', () => {
//     comp.checkForProhibition(defect);
//     expect(comp.showProhibition).toBeFalsy();
//     expect(comp.prohibitionAsterisk).toBeFalsy();
//   });
//
//   it('should set the prohibition attributes correctly if defect is dangerous and prohibitionIssued is true', () => {
//     defect.deficiencyCategory = 'dangerous';
//     defect.prohibitionIssued = true;
//     comp.checkForProhibition(defect);
//     expect(comp.showProhibition).toBeTruthy();
//     expect(comp.prohibitionAsterisk).toBeFalsy();
//   });
//
//   it('should set the prohibition attributes correctly if defect is dangerous, stdForProhibition is true and prohibitionIssued is true', () => {
//     defect.deficiencyCategory = 'dangerous';
//     defect.prohibitionIssued = true;
//     defect.stdForProhibition = true;
//     comp.checkForProhibition(defect);
//     expect(comp.showProhibition).toBeTruthy();
//     expect(comp.prohibitionAsterisk).toBeTruthy();
//   });
//
//   it('should add a defect if showProhibition is false and isProhibitionClearance is true', () => {
//     spyOn(comp, 'addDefect');
//     comp.showProhibition = false;
//     comp.isProhibitionClearance = true;
//     comp.checkProhibitionStatus();
//     expect(comp.addDefect).toHaveBeenCalled();
//   });
//
//   it('should add a defect if showProhibition is true, isProhibitionClearance is false, prohibitionAsterisk is false and prohibitionIssued is true', () => {
//     spyOn(comp, 'addDefect');
//     comp.showProhibition = true;
//     comp.isProhibitionClearance = false;
//     comp.prohibitionAsterisk = false;
//     comp.defect.prohibitionIssued = true;
//     comp.checkProhibitionStatus();
//     expect(comp.addDefect).toHaveBeenCalled();
//   });
//
//   it('should show correct alert if showProhibition is true, prohibitionAsterisk is false and prohibitionIssued is false', () => {
//     spyOn(comp, 'addDefect');
//     comp.showProhibition = true;
//     comp.isProhibitionClearance = false;
//     comp.prohibitionAsterisk = false;
//     comp.defect.prohibitionIssued = false;
//     comp.checkProhibitionStatus();
//     expect(comp.addDefect).not.toHaveBeenCalled();
//     expect(comp.showProhibitionAlert).toHaveBeenCalledWith(APP_STRINGS.PROHIBITION_MSG_CONFIRM);
//   });
//
//   it('should set the PRS state on a test having a dangerous defect which has been rectified on site', () => {
//     vehicleTest.defects[0].deficiencyCategory = DEFICIENCY_CATEGORY.DANGEROUS;
//     vehicleTest.defects.map((defect) => {
//       defect.prs = true;
//     });
//     let testResult: string | TEST_TYPE_RESULTS = testTypeService.setTestResult(
//       comp.vehicleTest,
//       true
//     );
//     expect(testResult).toBe(TEST_TYPE_RESULTS.PRS);
//   });
// });
