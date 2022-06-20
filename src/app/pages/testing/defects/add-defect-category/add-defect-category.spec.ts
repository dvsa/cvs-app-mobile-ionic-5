// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Events, IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
// import { DefectsService } from '../../../../providers/defects/defects.service';
// import { PipesModule } from '../../../../pipes/pipes.module';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
// import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';
// import { DefectsServiceMock } from '../../../../../test-config/services-mocks/defects-service.mock';
// import { DefectsReferenceDataMock } from '../../../../assets/data-mocks/reference-data-mocks/defects-data.mock';
// import { NavControllerMock } from 'ionic-mocks';
// import { AddDefectCategoryPage } from './add-defect-category';
// import { TestTypeDataModelMock } from '../../../../assets/data-mocks/data-model/test-type-data-model.mock';
//
// describe('Component: AddDefectCategoryPage', () => {
//   let comp: AddDefectCategoryPage;
//   let fixture: ComponentFixture<AddDefectCategoryPage>;
//
//   let viewCtrl: ViewControllerMock;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [AddDefectCategoryPage],
//       imports: [PipesModule, IonicModule.forRoot(AddDefectCategoryPage)],
//       providers: [
//         Events,
//         { provide: NavController, useFactory: () => NavControllerMock.instance() },
//         { provide: DefectsService, useClass: DefectsServiceMock },
//         { provide: NavParams, useClass: NavParamsMock },
//         { provide: ViewController, useClass: ViewControllerMock }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddDefectCategoryPage);
//     comp = fixture.componentInstance;
//     viewCtrl = TestBed.get(ViewController);
//     comp.vehicleTest = TestTypeDataModelMock.TestTypeData;
//     comp.defectCategories = DefectsReferenceDataMock.DefectsData;
//     comp.filteredCategories = [];
//   });
//
//   afterEach(() => {
//     fixture = null;
//     comp = null;
//     viewCtrl = null;
//   });
//
//   it('should create the component', () => {
//     expect(fixture).toBeTruthy();
//     expect(comp).toBeTruthy();
//   });
//
//   it('should test ngOnInit logic', () => {
//     expect(comp.filteredCategories.length).toEqual(0);
//     comp.ngOnInit();
//     expect(comp.filteredCategories.length).toEqual(2);
//   });
//
//   it('should test ionViewWillEnter logic', () => {
//     spyOn(viewCtrl, 'setBackButtonText');
//     comp.ionViewWillEnter();
//     expect(viewCtrl.setBackButtonText).toHaveBeenCalled();
//   });
// });
