import {ComponentFixture, inject, TestBed, waitForAsync} from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { TestStationSearchPage } from './test-station-search';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestStationService } from '@providers/test-station/test-station.service';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { NavControllerMock } from 'ionic-mocks';
import { AnalyticsService } from '@providers/global';
import { ANALYTICS_SCREEN_NAMES } from '@app/app.enums';

describe('Component: TestStationSearchPage', () => {
  let comp: TestStationSearchPage;
  let fixture: ComponentFixture<TestStationSearchPage>;
  let testStationService: TestStationService;
  let navCtrl: NavController;
  let analyticsService: AnalyticsService;
  let analyticsServiceSpy: any;

  beforeEach(waitForAsync(() => {
    const testStationServiceSpy = jasmine.createSpyObj('TestStationService', [
      'getTestStations, getTestStationsFromStorage',
      'sortAndSearchTestStation'
    ]);

    analyticsServiceSpy = jasmine.createSpyObj('AnalyticsService', ['setCurrentPage']);

    TestBed.configureTestingModule({
      declarations: [TestStationSearchPage],
      imports: [
        IonicModule
      ],
      providers: [
        { provide: NavController, useFactory: () => NavControllerMock.instance() },
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
    navCtrl = TestBed.inject(NavController);
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

  //@TODO - Ionic 5 - Fix this
  // it('should push TestStationDetailsPage', () => {
  //   comp.openTestStation({} as TestStationReferenceDataModel);
  //   expect(navCtrl.push).toHaveBeenCalled();
  // });

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
