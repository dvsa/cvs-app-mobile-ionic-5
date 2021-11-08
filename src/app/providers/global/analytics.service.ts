import { Injectable } from '@angular/core';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Platform } from '@ionic/angular';
import to from 'await-to-js';

import { AuthenticationService } from '../auth';
import { LogsProvider } from '@store/logs/logs.service';
import { LOG_TYPES } from '@app/app.enums';

export interface EventDetails {
  category: string;
  event: string;
  label?: string;
  value?: number;
  newSession?: boolean;
}

@Injectable()
export class AnalyticsService {
  hasTrackingStarted: boolean;

  constructor(
    private platform: Platform,
    private ga: GoogleAnalytics,
    private authenticationService: AuthenticationService,
    private logProvider: LogsProvider
  ) {}

  async startAnalyticsTracking(trackId: string): Promise<void> {
    const [err, success] = await to(this.ga.startTrackerWithId(trackId));

    if (err) {
      const { oid } = this.authenticationService.tokenInfo;

      this.logProvider.dispatchLog({
        type: LOG_TYPES.ERROR,
        message: `${oid} - startAnalyticsTracking: Error starting Google Analytics`,
        timestamp: Date.now()
      });

      return;
    }

    this.hasTrackingStarted = !!trackId;
  }

  isActionAllowed(): boolean {
    return this.platform.is('cordova') && this.hasTrackingStarted;
  }

  async logEvent(eventParams: EventDetails) {
    if (this.isActionAllowed()) {
      const { category, event, label, value } = eventParams;
      const [err, success] = await to(this.ga.trackEvent(category, event, label, value));

      if (err) {
        const { oid } = this.authenticationService.tokenInfo;

        this.logProvider.dispatchLog({
          type: LOG_TYPES.ERROR,
          message: `${oid} - logEvent: Error tracking event`,
          timestamp: Date.now()
        });
      }
    }
  }

  async setCurrentPage(pageName: string): Promise<void> {
    if (this.isActionAllowed()) {
      const [err, success] = await to(this.ga.trackView(pageName));
      if (err) {
        const { oid } = this.authenticationService.tokenInfo;

        this.logProvider.dispatchLog({
          type: LOG_TYPES.ERROR,
          message: `${oid} - setCurrentPage: Error setting page`,
          timestamp: Date.now()
        });
      }
    }
  }

  async addCustomDimension(key: number, value: string): Promise<void> {
    if (this.isActionAllowed()) {
      const [err, success] = await to(this.ga.addCustomDimension(key, value));
      if (err) {
        const { oid } = this.authenticationService.tokenInfo;

        this.logProvider.dispatchLog({
          type: LOG_TYPES.ERROR,
          message: `${oid} - addCustomDimension: Error adding custom dimension`,
          timestamp: Date.now()
        });
      }
    }
  }
}
