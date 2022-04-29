import { VehicleLookupSearchCriteriaSelectionPage } from './vehicle-lookup-search-criteria-selection';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController} from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VehicleLookupSearchCriteriaData } from '@assets/app-data/vehicle-lookup-search-criteria/vehicle-lookup-search-criteria.data';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component: VehicleLookupSearchCriteriaSelectionPage', () => {
  let component: VehicleLookupSearchCriteriaSelectionPage;
  let fixture: ComponentFixture<VehicleLookupSearchCriteriaSelectionPage>;
  let modalCtrl: ModalController;
  let modalCtrlSpy;


  beforeEach(() => {
    modalCtrlSpy = jasmine.createSpyObj('ModalController', ['dismiss']);

    TestBed.configureTestingModule({
      declarations: [VehicleLookupSearchCriteriaSelectionPage],
      imports: [
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: ModalController, useValue: modalCtrlSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleLookupSearchCriteriaSelectionPage);
    component = fixture.componentInstance;
    modalCtrl = TestBed.inject(ModalController);
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

  it('should call modalCtrl.dismiss', async () => {
    await component.onSave();
    expect(await modalCtrlSpy.dismiss).toHaveBeenCalled();
  });
});
