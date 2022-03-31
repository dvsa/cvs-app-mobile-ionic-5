import {ComponentFixture, inject, TestBed, waitForAsync} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestStationSearchPage } from './test-station-search';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStationService } from '@providers/test-station/test-station.service';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { AnalyticsService } from '@providers/global';
import { ANALYTICS_SCREEN_NAMES, PAGE_NAMES } from '@app/app.enums';
import { RouterTestingModule } from '@angular/router/testing';
import { TestStationDataMock } from '@assets/data-mocks/reference-data-mocks/test-station-data.mock';
import { TestStationDetailsPage } from '@app/pages/test-station/test-station-details/test-station-details';
import { Router } from '@angular/router';

describe('Component: TestStationSearchPage', () => {
  let comp: TestStationSearchPage;
  let fixture: ComponentFixture<TestStationSearchPage>;
  let testStationService: TestStationService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;
  const testStation = TestStationDataMock.TestStationData[0];
  let router: Router;

  beforeEach(waitForAsync(async () => {
    const testStationServiceSpy = jasmine.createSpyObj('TestStationService', [
      'getTestStations, getTestStationsFromStorage',
      'sortAndSearchTestStation'
    ]);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['setCurrentPage']);

    await TestBed.configureTestingModule({
      declarations: [TestStationSearchPage],
      imports: [
        IonicModule,
        RouterTestingModule.withRoutes([
          { path: PAGE_NAMES.TEST_STATION_DETAILS_PAGE, component: TestStationDetailsPage}
        ]),
      ],
      providers: [
        { provide: TestStationService, useValue: testStationServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationSearchPage);
    comp = fixture.componentInstance;
    router = TestBed.inject(Router);
    testStationService = TestBed.inject(TestStationService);
    analyticsService = TestBed.inject(AnalyticsService);
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    testStationService = null;
  });

  it('should create component', (done) => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
    expect(testStationService).toBeTruthy();
    done();
  });

  it('should test ionViewDidEnterLogic', () => {
    comp.ionViewDidEnter();
    expect(analyticsService.setCurrentPage).toHaveBeenCalledWith(
      ANALYTICS_SCREEN_NAMES.TEST_STATION_SEARCH
    );
  });

  it('should TestStationService and TestStationSearchPage Component share the same instance', inject(
    [TestStationService],
    (injectService: TestStationService) => {
      expect(injectService).toBe(testStationService);
    }
  ));

  it('should go to TestStationDetailsPage', async () => {
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(comp, 'clearSearch');
    await comp.openTestStation(testStation as TestStationReferenceDataModel);
    expect(await navigateSpy).toHaveBeenCalledWith(
      [PAGE_NAMES.TEST_STATION_DETAILS_PAGE],
      {state: {testStation}}
    );
    expect(comp.clearSearch).toHaveBeenCalled();
  });

  it('should test searchList logic', () => {
    const value = 'searchValue';
    const mockTestStations = [
      {
        testStationId: '1',
        testStationPNumber: 'p123',
        testStationName: 'ashirbe'
      }
    ] as TestStationReferenceDataModel[];
    const searchProperties = ['testStationName', 'testStationPNumber', 'testStationAddress'];
    comp.testStations = mockTestStations;

    comp.searchList({ target: { value } });

    expect(comp.searchVal).toEqual(value);
    expect(testStationService.sortAndSearchTestStation).toHaveBeenCalledWith(
      mockTestStations,
      value,
      searchProperties
    );
  });

  it('should clear search', () => {
    comp.searchVal = 'searchVal';
    comp.clearSearch();
    expect(comp.searchVal).toEqual('');
  });
});
