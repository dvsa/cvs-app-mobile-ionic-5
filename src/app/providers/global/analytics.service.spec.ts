import { TestBed } from '@angular/core/testing';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Platform } from '@ionic/angular';
import { PlatformMock, GoogleAnalyticsMock } from 'ionic-mocks';

import { AuthenticationService } from '@providers/auth';
import { AuthenticationServiceMock } from '@test-config/services-mocks/authentication-service.mock';
import { LogsProvider } from '@store/logs/logs.service';
import { AnalyticsService, EventDetails } from './analytics.service';
import { LOG_TYPES } from '@app/app.enums';

describe('AnalyticsService', () => {
  let platform: Platform;
  let analyticsService: AnalyticsService;
  let googleAnalytics: GoogleAnalytics;
  let authService: AuthenticationService;
  let logProvider: LogsProvider;
  let logProviderSpy: any;

  const testerOid = 'tester_oid';
  const dateNow = 1621429040275;

  beforeEach(() => {
    logProviderSpy = jasmine.createSpyObj('LogsProvider', {
      dispatchLog: () => true
    });

    spyOn(Date, 'now').and.returnValue(dateNow);

    TestBed.configureTestingModule({
      providers: [
        AnalyticsService,
        { provide: GoogleAnalytics, useFactory: () => GoogleAnalyticsMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
        { provide: AuthenticationService, useClass: AuthenticationServiceMock },
        { provide: LogsProvider, useValue: logProviderSpy }
      ]
    });
  });

  beforeEach(() => {
    platform = TestBed.inject(Platform);
    analyticsService = TestBed.inject(AnalyticsService);
    googleAnalytics = TestBed.inject(GoogleAnalytics);
    logProvider = TestBed.inject(LogsProvider);
    authService = TestBed.inject(AuthenticationService);

    authService.tokenInfo.oid = testerOid;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  const allowAction = () => {
    platform.is = jasmine.createSpy('platform.is').and.returnValue(true);
    analyticsService.hasTrackingStarted = true;
  };

  const preventAction = () => {
    platform.is = jasmine.createSpy('platform.is').and.returnValue(false);
    analyticsService.hasTrackingStarted = false;
  };

  describe('startAnalyticsTracking', () => {
    let trackId: string;

    beforeEach(() => {
      trackId = 'UA-00000000-0';
    });

    it('should start analytics tracking', async () => {
      await analyticsService.startAnalyticsTracking(trackId);

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalledWith(trackId);
      expect(analyticsService.hasTrackingStarted).toBeTruthy();
    });

    it('should not start analytics tracking if tracking id is not available', async () => {
      await analyticsService.startAnalyticsTracking('');

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalled();
      expect(analyticsService.hasTrackingStarted).toBeFalsy();
    });

    it('should not start analytics tracking if errored', async () => {
      googleAnalytics.startTrackerWithId = jasmine
        .createSpy('googleAnalytics.startTrackerWithId')
        .and.returnValue(Promise.reject('track error!'));

      await analyticsService.startAnalyticsTracking(trackId);

      expect(googleAnalytics.startTrackerWithId).toHaveBeenCalled();
      expect(analyticsService.hasTrackingStarted).toBeFalsy();
      expect(logProvider.dispatchLog).toHaveBeenCalledWith({
        type: LOG_TYPES.ERROR,
        message: `${testerOid} - startAnalyticsTracking: Error starting Google Analytics`,
        timestamp: dateNow
      });
    });
  });

  describe('logEvent', () => {
    let details: EventDetails;

    beforeEach(() => {
      details = {
        category: 'category',
        event: 'event-name',
        label: 'label-name'
      };
    });

    it('should log event if allowed conditions are met', async () => {
      allowAction();

      await analyticsService.logEvent(details);

      expect(googleAnalytics.trackEvent).toHaveBeenCalledWith(
        details.category,
        details.event,
        details.label,
        undefined
      );
    });

    it('should prevent log event if conditions are not met', async () => {
      preventAction();

      await analyticsService.logEvent(details);

      expect(googleAnalytics.trackEvent).not.toHaveBeenCalled();
    });

    it('should not track event if errored', async () => {
      googleAnalytics.trackEvent = jasmine
        .createSpy('googleAnalytics.trackEvent')
        .and.returnValue(Promise.reject('track error!'));

      allowAction();
      await analyticsService.logEvent(details);

      expect(googleAnalytics.trackEvent).toHaveBeenCalled();
      expect(logProvider.dispatchLog).toHaveBeenCalledWith({
        type: LOG_TYPES.ERROR,
        message: `${testerOid} - logEvent: Error tracking event`,
        timestamp: dateNow
      });
    });
  });

  describe('setCurrentPage', () => {
    it('should set the current page for tracking', async () => {
      allowAction();

      const pName = 'page-name';
      await analyticsService.setCurrentPage(pName);

      expect(googleAnalytics.trackView).toHaveBeenCalledWith(pName);
    });

    it('should prevent current page from tracking if conditions are not met', async () => {
      preventAction();

      await analyticsService.setCurrentPage('details');

      expect(googleAnalytics.trackView).not.toHaveBeenCalled();
    });
  });

  describe('addCustomDimension', () => {
    it('should set the custom dimension for tracking', async () => {
      allowAction();

      const key = 1;
        const value = 'some-value';

      await analyticsService.addCustomDimension(key, value);

      expect(googleAnalytics.addCustomDimension).toHaveBeenCalledWith(key, value);
    });

    it('should prevent custom dimension from tracking if conditions are not met', async () => {
      preventAction();

      await analyticsService.addCustomDimension(1, 'value');

      expect(googleAnalytics.addCustomDimension).not.toHaveBeenCalled();
    });

    it('should not add custom dimension if errored', async () => {
      googleAnalytics.addCustomDimension = jasmine
        .createSpy('googleAnalytics.addCustomDimension')
        .and.returnValue(Promise.reject('track error!'));

      allowAction();
      await analyticsService.addCustomDimension(1, 'value');

      expect(googleAnalytics.addCustomDimension).toHaveBeenCalled();
      expect(logProvider.dispatchLog).toHaveBeenCalledWith({
        type: LOG_TYPES.ERROR,
        message: `${testerOid} - addCustomDimension: Error adding custom dimension`,
        timestamp: dateNow
      });
    });
  });
});
