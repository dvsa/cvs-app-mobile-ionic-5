import { PreparerService } from './preparer.service';
import { StorageService } from '../natives/storage.service';
import { PreparersDataMock } from '@assets/data-mocks/reference-data-mocks/preparers-data.mock';
import { TestBed } from '@angular/core/testing';
import { PreparersReferenceDataModel } from '@models/reference-data-models/preparers.model';

describe('Provider: PreparerService', () => {
  let preparerService: PreparerService;
  let storageService: StorageService;
  let spy: any;

  const preparerData = PreparersDataMock.PreparersData;
  let filter: string;

  beforeEach(() => {
    spy = jasmine.createSpyObj('StorageService', {
      read: new Promise((resolve) => resolve(preparerData))
    });

    TestBed.configureTestingModule({
      providers: [PreparerService, { provide: StorageService, useValue: spy }]
    });

    preparerService = TestBed.inject(PreparerService);
    storageService = TestBed.inject(StorageService);
  });

  afterEach(() => {
    preparerService = null;
    storageService = null;
  });

  it('should return data from local storage', () => {
    preparerService.getPreparersFromStorage().subscribe((data) => {
      expect(data).toBe(preparerData as PreparersReferenceDataModel[]);
    });
  });

  it('should return Preparer by ID', () => {
    filter = 'AK4434';
    const filteredData = preparerService.search(preparerData, filter);
    expect(filteredData.length).toEqual(1);
    expect(filteredData[0].preparerId).toEqual(filter);
  });

  it('should return nothing by unrelated string', () => {
    filter = 'xxx';
    const filteredData = preparerService.search(preparerData, filter);

    expect(filteredData.length).toEqual(0);
  });

  it('should return nothing by no array', () => {
    filter = 'xxx';
    let preparerArray;
    const filteredData = preparerService.search(preparerArray, filter);

    expect(filteredData.length).toEqual(0);
  });

  it('should return array as no filter entered', () => {
    let nullFilter;
    const filteredData = preparerService.search(preparerData, nullFilter);

    expect(filteredData.length).toEqual(preparerData.length);
  });
});
