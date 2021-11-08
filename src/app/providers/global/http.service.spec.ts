import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Data } from '@angular/router';

import { HTTPService } from './http.service';
import { ActivityModel } from '@models/visit/activity.model';
import { ActivityDataModelMock } from '@assets/data-mocks/data-model/activity-data-model.mock';
import { ActivityDataMock } from '@assets/data-mocks/activity.data.mock';
import { default as AppConfig } from '@config/application.hybrid';

describe(`Provider: HttpService`, () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  const testUrl = '';
  let httpService: HTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HTTPService]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    httpService = TestBed.inject(HTTPService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('can test HttpClient.get', () => {
    const testData: Data = { name: 'Test Data' };
    httpClient.get<Data>(testUrl).subscribe((data) => expect(data).toEqual(testData));
    const req = httpMock.expectOne(testUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('can test for network error', () => {
    const emsg = 'simulated network error';
    httpClient.get<Data[]>(testUrl).subscribe(
      () => fail('should have failed with the network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual(emsg, 'message');
      }
    );
    const req = httpMock.expectOne(testUrl);
    const mockError = new ErrorEvent('Network error', {
      message: emsg
    });
    req.error(mockError);
  });

  it('test getAtfs', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getAtfs();
    expect(data).toBeTruthy();
  });

  it('test getDefects', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getDefects();
    expect(data).toBeTruthy();
  });

  it('test getTestTypes', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getTestTypes();
    expect(data).toBeTruthy();
  });

  it('test getPreparers', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getPreparers();
    expect(data).toBeTruthy();
  });

  it('test getTechRecords', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getTechRecords('bq91yhq', 'all');
    expect(data).toBeTruthy();
  });

  it('test getTestResultsHistory', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.getTestResultsHistory('23423443');
    expect(data).toBeTruthy();
  });

  it('test postTestResult', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.postTestResult('23423443');
    expect(data).toBeTruthy();
  });

  it('test startVisit', () => {
    // eslint-disable-next-line prefer-const
    let data;
    const activities: ActivityModel = ActivityDataModelMock.ActivityData;
    expect(data).toBeUndefined();
    data = httpService.startVisit(activities);
    expect(data).toBeTruthy();
  });

  it('test postActivity', () => {
    // eslint-disable-next-line prefer-const
    let data;
    const waitActivity: ActivityModel = ActivityDataMock.WaitActivityData;
    expect(data).toBeUndefined();
    data = httpService.postActivity(waitActivity);
    expect(data).toBeTruthy();
  });

  it('test updateActivity', () => {
    let data;
    const updateWaitActivities = ActivityDataMock.UpdateActivities;
    const updateWaitActivity = ActivityDataMock.UpdateActivity;
    expect(data).toBeUndefined();
    data = httpService.updateActivity(updateWaitActivities);
    expect(data).toBeTruthy();
    data = httpService.updateActivity(updateWaitActivity);
    expect(data).toBeTruthy();
  });

  it('test endVisit', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.endVisit('23423443');
    expect(data).toBeTruthy();
  });

  it('test saveSignature', () => {
    // eslint-disable-next-line prefer-const
    let data;
    expect(data).toBeUndefined();
    data = httpService.saveSignature('23423443', 'a big string');
    expect(data).toBeTruthy();
  });

  it('should encode the search identifier', async(() => {
    const searchIdentifier = 'YV31ME00000 1/\\*-1';
    httpService.getTechRecords(searchIdentifier, 'all').subscribe();

    const testRequest = httpMock.expectOne(
      `${AppConfig.app.BACKEND_URL}/vehicles/${encodeURIComponent(
        searchIdentifier
      )}/tech-records?status=provisional_over_current&searchCriteria=all`
    );
    expect(testRequest.request.method).toEqual('GET');
    testRequest.flush(null, { status: 200, statusText: 'Ok' });
  }));

  it('should fail when the open visit check takes more than the defined timeout (not flushing the request)', fakeAsync(() => {
    const testerStaffId = '1234567';
    const timeout = 31000;
    httpService.getOpenVisitCheck(testerStaffId).subscribe(
      () => {
        fail('The request should fail');
      },
      (error) => {
        expect(error.message).toEqual('Timeout has occurred');
      }
    );

    const testRequest = httpMock.expectOne(
      `${AppConfig.app.BACKEND_URL}/activities/open?testerStaffId=${testerStaffId}`
    );
    expect(testRequest.request.method).toEqual('GET');

    setTimeout(() => {
      expect(testRequest.cancelled).toBe(true);
    }, timeout);

    tick(timeout);
  }));

  it('should succeed when the open visit check takes less than the defined timeout', (done) => {
    const testerStaffId = '1234567';
    httpService.getOpenVisitCheck(testerStaffId).subscribe(
      (response) => {
        expect(response.status).toBe(200);
        done();
      },
      () => {
        fail('The request should complete successfully');
      }
    );

    const testRequest = httpMock.expectOne(
      `${AppConfig.app.BACKEND_URL}/activities/open?testerStaffId=${testerStaffId}`
    );
    expect(testRequest.request.method).toEqual('GET');

    setTimeout(() => {
      testRequest.flush(null, { status: 200, statusText: 'OK' });
    }, 1000);
  });
});
