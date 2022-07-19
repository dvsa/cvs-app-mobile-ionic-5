import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertController, NavController } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestAbandonPage } from './test-abandon';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeDataModelMock } from '@assets/data-mocks/data-model/test-type-data-model.mock';
import { VisitService } from '@providers/visit/visit.service';
import { VisitServiceMock } from '@test-config/services-mocks/visit-service.mock';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { TestTypeServiceMock } from '@test-config/services-mocks/test-type-service.mock';
import { AlertControllerMock } from 'ionic-mocks';
import { AnalyticsService } from '@providers/global';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PAGE_NAMES } from '@app/app.enums';
import { TestCreatePage } from '@app/pages/testing/test-creation/test-create/test-create';
import { TestReviewPage } from '@app/pages/testing/test-creation/test-review/test-review';

describe('Component: TestAbandonPage', () => {
  let component: TestAbandonPage;
  let fixture: ComponentFixture<TestAbandonPage>;
  let alertCtrl: AlertController;
  let visitService: VisitService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  let router: any;
  let navCtrl: NavController;

  const vehicleTest: TestTypeModel = TestTypeDataModelMock.TestTypeData;
  const selectedReasons = ['Best reason', 'Second best reason'];
  const additionalComment = 'Some additional comment';

  beforeEach(() => {
    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', [
      'logEvent',
      'addCustomDimension'
    ]);

    TestBed.configureTestingModule({
      declarations: [TestAbandonPage],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: PAGE_NAMES.TEST_CREATE_PAGE,
            component: TestCreatePage
          },
          {
            path: PAGE_NAMES.TEST_REVIEW_PAGE,
            component: TestReviewPage
          }
        ])
      ],
      providers: [
        { provide: AlertController, useFactory: () => AlertControllerMock.instance() },
        { provide: VisitService, useClass: VisitServiceMock },
        { provide: TestTypeService, useClass: TestTypeServiceMock },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAbandonPage);
    component = fixture.componentInstance;
    alertCtrl = TestBed.inject(AlertController);
    visitService = TestBed.inject(VisitService);
    analyticsService = TestBed.inject(AnalyticsService);
    navCtrl = TestBed.inject(NavController);
    component.additionalComment = null;
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(
      { extras:
          {
            state: {
              vehicleTest,
              selectedReasons,
              editMode: true,
              fromTestReview: false
            }
          }
      } as any
    );
    component.vehicleTest = router.getCurrentNavigation().extras.state.vehicleTest;
    component.selectedReasons = router.getCurrentNavigation().extras.state.selectedReasons;
    component.editMode = router.getCurrentNavigation().extras.state.editMode;
    component.fromTestReview = router.getCurrentNavigation().extras.state.fromTestReview;
  });

  afterEach(() => {
    fixture.destroy();
    component = null;
  });

  it('should create the component', () => {
    expect(fixture).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should test getAdditionalComment logic', () => {
    component.vehicleTest.additionalCommentsForAbandon = 'abandon comments';
    component.editMode = undefined;
    component.getAdditionalComment();
    expect(component.additionalComment).toEqual('abandon comments');
    component.editMode = 'edit';
    component.vehicleTest.additionalCommentsForAbandon = '';
    component.getAdditionalComment();
    expect(component.additionalComment).toEqual('abandon comments');
  });

  it('should create and present alert when pressing onDone', () => {
    component.onDone();
    expect(alertCtrl.create).toHaveBeenCalled();
  });

  it('should test onDone handler logic - popToRoot to have been called', async () => {
    const navSpy = spyOn(navCtrl, 'navigateBack');
    spyOn(component, 'updateVehicleTestModel');
    component.fromTestReview = true;
    await component.onDoneHandler();
    expect(component.updateVehicleTestModel).toHaveBeenCalled();
    expect(await navSpy).toHaveBeenCalled();
  });

  it('should test onDone handler logic - popToRoot not to have been called', async () => {
    const navSpy = spyOn(router, 'navigate');
    spyOn(component, 'updateVehicleTestModel');
    await component.onDoneHandler();
    expect(component.updateVehicleTestModel).toHaveBeenCalled();
    expect(await navSpy).not.toHaveBeenCalled();
  });

  it('should update the vehicleTestModel with abandonment object', async () => {
    component.vehicleTest.additionalCommentsForAbandon = null;
    expect(component.vehicleTest.reasons.length).toEqual(0);
    expect(component.vehicleTest.additionalCommentsForAbandon).toEqual(null);
    component.additionalComment = additionalComment;

    await component.updateVehicleTestModel();
    expect(component.vehicleTest.reasons.length).toEqual(2);
    expect(component.vehicleTest.additionalCommentsForAbandon).toEqual('Some additional comment');
  });
});
