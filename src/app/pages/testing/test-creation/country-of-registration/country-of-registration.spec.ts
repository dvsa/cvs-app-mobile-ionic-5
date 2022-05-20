import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Events, IonicModule, NavParams, ViewController } from 'ionic-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavParamsMock } from '../../../../../test-config/ionic-mocks/nav-params.mock';
import { RegionReadingPage } from './country-of-registration';
import { VisitService } from '../../../../providers/visit/visit.service';
import { VisitServiceMock } from '../../../../../test-config/services-mocks/visit-service.mock';
import { CommonFunctionsService } from '../../../../providers/utils/common-functions';
import { ViewControllerMock } from '../../../../../test-config/ionic-mocks/view-controller.mock';

describe('Component: RegionReadingPage', () => {
  let comp: RegionReadingPage;
  let fixture: ComponentFixture<RegionReadingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegionReadingPage],
      imports: [IonicModule.forRoot(RegionReadingPage)],
      providers: [
        CommonFunctionsService,
        Events,
        { provide: ViewController, useClass: ViewControllerMock },
        { provide: NavParams, useClass: NavParamsMock },
        { provide: VisitService, useClass: VisitServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionReadingPage);
    comp = fixture.componentInstance;
    comp.countriesArr = [];
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    done();
  });

  it('should test ngOnInit logic', () => {
    expect(comp.countriesArr.length).toEqual(0);
    comp.ngOnInit();
    expect(comp.countriesArr.length).toEqual(35);
    expect(comp.notApplicableElem[0].key).toEqual('not-applicable');
  });
});
