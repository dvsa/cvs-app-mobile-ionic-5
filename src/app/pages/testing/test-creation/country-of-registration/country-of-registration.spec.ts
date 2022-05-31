import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CountryOfRegistrationPage } from './country-of-registration';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { CommonFunctionsService } from '@providers/utils/common-functions';
import { EventsService } from '@providers/events/events.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PAGE_NAMES } from '@app/app.enums';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';
import { ModalControllerMock } from '@test-config/mocks/modal-controller.mock';
import { ModalController } from '@ionic/angular';

describe('Component: CountryOfRegistrationPage', () => {
  let comp: CountryOfRegistrationPage;
  let fixture: ComponentFixture<CountryOfRegistrationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CountryOfRegistrationPage],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.TEST_CREATE_PAGE,
            component: TestCreatePage
          }
        ])],
      providers: [
        CommonFunctionsService,
        EventsService,
        { provide: ModalController, useClass: ModalControllerMock },
        { provide: VisitService, useClass: VisitServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryOfRegistrationPage);
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
