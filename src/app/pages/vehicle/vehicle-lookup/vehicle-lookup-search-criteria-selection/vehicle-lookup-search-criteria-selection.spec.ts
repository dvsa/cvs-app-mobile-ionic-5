import { VehicleLookupSearchCriteriaSelectionPage } from './vehicle-lookup-search-criteria-selection';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController, NavParams, ViewController } from 'ionic-angular';
import { NavParamsMock } from '../../../../../../test-config/ionic-mocks/nav-params.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VehicleLookupSearchCriteriaData } from '../../../../../assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';
import { ViewControllerMock } from 'ionic-mocks';

describe('Component: VehicleLookupSearchCriteriaSelectionPage', () => {
  let component: VehicleLookupSearchCriteriaSelectionPage;
  let fixture: ComponentFixture<VehicleLookupSearchCriteriaSelectionPage>;
  let navCtrl: NavController;
  let navParams: NavParams;
  let viewCtrl: ViewController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleLookupSearchCriteriaSelectionPage],
      imports: [IonicModule.forRoot(VehicleLookupSearchCriteriaSelectionPage)],
      providers: [
        NavController,
        { provide: NavParams, useClass: NavParamsMock },
        { provide: ViewController, useFactory: () => ViewControllerMock.instance() }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLookupSearchCriteriaSelectionPage);
    component = fixture.componentInstance;
    navCtrl = TestBed.get(NavController);
    navParams = TestBed.get(NavParams);
    viewCtrl = TestBed.get(ViewController);
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should populate the searchCriteriaList at init', () => {
    expect(component.searchCriteriaList).toBe(undefined);
    component.trailersOnly = true;
    component.ngOnInit();
    expect(component.searchCriteriaList.length).toEqual(4);
    component.trailersOnly = false;
    component.ngOnInit();
    expect(component.searchCriteriaList.length).toEqual(5);
  });

  it('should format an array of strings into an array of objects', () => {
    expect(
      component.getFormattedSearchCriteriaList(
        VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria
      )[0].text
    ).toEqual(VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria[0]);
  });

  it('should check which is the selected search criteria', () => {
    component.trailersOnly = false;
    component.ngOnInit();
    expect(component.searchCriteriaList[3].isChecked).toBeFalsy();
    component.onCheck(VehicleLookupSearchCriteriaData.VehicleLookupSearchCriteria[3]);
    expect(component.searchCriteriaList[3].isChecked).toBeTruthy();
  });

  it('should call viewCtrl.dismiss', () => {
    component.onSave();
    expect(viewCtrl.dismiss).toHaveBeenCalled();
  });
});
