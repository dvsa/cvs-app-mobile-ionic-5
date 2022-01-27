import {ComponentFixture, inject, TestBed, waitForAsync} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { TestStationSearchPage } from './test-station-search';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStationService } from '@providers/test-station/test-station.service';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { AnalyticsService } from '@providers/global';
import { ANALYTICS_SCREEN_NAMES } from '@app/app.enums';
import { RouterTestingModule } from '@angular/router/testing';

describe('Component: TestStationSearchPage', () => {
  let comp: TestStationSearchPage;
  let fixture: ComponentFixture<TestStationSearchPage>;
  let testStationService: TestStationService;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

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
        RouterTestingModule,
      ],
      providers: [
        { provide: TestStationService, useValue: testStationServiceSpy },
        { provide: AnalyticsService, useValue: analyticsServiceSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStationSearchPage);
    comp = fixture.componentInstance;
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

  it('should test keepCancelOn method', () => {
    expect(comp.focusOut).toBeFalsy();
    comp.keepCancelOn('ev');
    expect(comp.focusOut).toBeTruthy();
    comp.keepCancelOn('ev', true);
    expect(comp.focusOut).toBeFalsy();
  });

  //@TODO - Ionic 5 - update expectation to include router navigation
  it('should push TestStationDetailsPage', () => {
    spyOn(comp, 'clearSearch');
    comp.openTestStation({} as TestStationReferenceDataModel);
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
