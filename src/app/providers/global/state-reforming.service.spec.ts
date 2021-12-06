// import { TestBed } from '@angular/core/testing';
// import { StorageService } from '../natives/storage.service';
// import { AppService } from './app.service';
// import { AppServiceMock } from '@test-config/services-mocks/app-service.mock';
// import { StorageServiceMock } from '@test-config/services-mocks/storage-service.mock';
// import { StateReformingService } from './state-reforming.service';
//
// describe('Provider: StateReformingService', () => {
//   let stateReformingService: StateReformingService;
//   let storageService: StorageService;
//   let appService: AppService;
//   const navMock = {
//     length: (): number => 1,
//     getByIndex: (i) => ({ name: 'test' })
//   };
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         StateReformingService,
//         { provide: AppService, useClass: AppServiceMock },
//         { provide: StorageService, useClass: StorageServiceMock }
//       ]
//     });
//     stateReformingService = TestBed.inject(StateReformingService);
//     storageService = TestBed.inject(StorageService);
//     appService = TestBed.inject(AppService);
//   });
//
//   afterEach(() => {
//     stateReformingService = null;
//     storageService = null;
//     appService = null;
//   });
//
//   it('should be created', () => {
//     expect(stateReformingService).toBeTruthy();
//   });
//
//   it('should update storage on saveNavStack action', () => {
//     spyOn(storageService, 'update');
//     stateReformingService.saveNavStack(navMock);
//     expect(appService.caching).toBeTruthy();
//     expect(storageService.update).toHaveBeenCalledWith('state', '[{"page":"test"}]');
//   });
//
//   it('should update storage on onTestReview action', (done) => {
//     spyOn(storageService, 'update');
//     const spy = spyOn(storageService, 'read').and.returnValue(Promise.resolve(true));
//     stateReformingService.onTestReview();
//
//     spy.calls.mostRecent().returnValue.then((res) => {
//       expect(res).toBe(true);
//       expect(storageService.update).toHaveBeenCalledWith('state', 'true');
//       done();
//     });
//   });
// });
