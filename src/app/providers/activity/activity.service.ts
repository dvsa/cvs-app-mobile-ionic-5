import { Injectable } from '@angular/core';
import { StorageService } from '../natives/storage.service';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_VALUE,
  LOG_TYPES,
  STORAGE,
  VISIT
} from '@app/app.enums';
import { AppService } from '@providers/global';
import { VisitModel } from '@models/visit/visit.model';
import { ActivityModel } from '@models/visit/activity.model';
import { AuthenticationService } from '@providers/auth/authentication/authentication.service';
import { HTTPService } from '@providers/global';
import { TestResultModel } from '@models/tests/test-result.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { CommonFunctionsService } from '../utils/common-functions';
import { of } from 'rxjs/observable/of';
import { AnalyticsService } from '../global';
import { LogsProvider } from '@store/logs/logs.service';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class ActivityService {
  activities: ActivityModel[] = [];
  waitTimeStarted = false;
  waitTimer: number;
  loading: any;
  counterTime = 5;

  constructor(
    private storageService: StorageService,
    private appService: AppService,
    private authenticationService: AuthenticationService,
    private httpService: HTTPService,
    private commonFunc: CommonFunctionsService,
    private analyticsService: AnalyticsService,
    private logProvider: LogsProvider,
    private loadingCtrl: LoadingController
  ) {}

  createActivity(
    visit: VisitModel,
    activityType?: string,
    pushToActivities?: boolean,
    updateActivities?: boolean
  ): ActivityModel {
    const activity: ActivityModel = {
      activityType: activityType ? activityType : VISIT.ACTIVITY_TYPE_UNACCOUNTABLE_TIME,
      testStationName: visit.testStationName,
      testStationPNumber: visit.testStationPNumber,
      testStationEmail: visit.testStationEmail,
      testStationType: visit.testStationType,
      testerName: this.authenticationService.tokenInfo.testerName,
      testerStaffId: this.authenticationService.tokenInfo.testerId,
      startTime: null,
      endTime: null,
      waitReason: [],
      notes: '',
      parentId: visit.id
    };
    if (pushToActivities) {this.activities.push(activity);}
    if (updateActivities) {this.updateActivities();}
    return activity;
  }

  getActivities(): ActivityModel[] {
    return this.activities;
  }

  addActivity(activity: ActivityModel) {
    this.activities.push(activity);
  }

  isVisitStillOpen(): Observable<HttpResponse<boolean>> {
    //  make sure token object is re-hydrated before checking for open visits
    return fromPromise(this.authenticationService.getTesterID())
      .pipe(
        switchMap((testerId) => this.httpService.getOpenVisitCheck(testerId))
      );
  }

  /**
   * @deprecated stop using in favour of equivalent method taken a @param activities as parameter
   */
  updateActivities() {
    if (this.appService.caching) {this.storageService.update(STORAGE.ACTIVITIES, this.activities);}
  }

  /**
   * @description use by passing in @param activities
   */
  async updateActivitiesArgs(activities: ActivityModel[]) {
    if (this.appService.caching) {
      await this.storageService.update(STORAGE.ACTIVITIES, activities);
    }
  }

  submitActivity(activity: ActivityModel) {
    return this.httpService.postActivity(activity);
  }

  updateActivityReasons(activities) {
    return this.httpService.updateActivity(activities);
  }

  /**
   * creates an activity based on the current timeline
   *
   * @param visit the current visit
   * @param testResult test result if available
   * @param timeline the current timeline
   * @return wait or unaccountable time
   */
  createActivityBodyForCall(visit, testResult?: TestResultModel, timeline?): ActivityModel {
    let activity: ActivityModel;
    let timeNotTesting = 0;

    if (testResult) {
      const indexTestResult = visit.tests
        .map((elem) => elem.startTime)
        .indexOf(testResult.testStartTimestamp);
      if (indexTestResult === 0) {
        timeNotTesting = this.getWaitTimeBetween(
          testResult.testStartTimestamp,
          visit.startTime
        );
        activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
        activity.startTime = visit.startTime;
      } else {
        timeNotTesting = this.getWaitTimeBetween(
          testResult.testStartTimestamp,
          visit.tests[indexTestResult - 1].endTime
        );
        activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
        activity.startTime = visit.tests[indexTestResult - 1].endTime;
      }
      activity.endTime = testResult.testStartTimestamp;

    } else {
      const currentTime = new Date().toISOString();
      if (timeline.length === 0) {
        timeNotTesting = this.getWaitTimeBetween(
          currentTime,
          visit.startTime
        );
        activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
        activity.startTime = visit.startTime;
      } else {
        const lastTimelineItem = timeline[timeline.length - 1];
        if (lastTimelineItem.status) {
          timeNotTesting = this.getWaitTimeBetween(
            currentTime,
            lastTimelineItem.endTime
          );
          activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
          activity.startTime = lastTimelineItem.endTime;
        } else {
          timeNotTesting = this.getWaitTimeBetween(
            currentTime,
            lastTimelineItem.startTime
          );
          activity = this.createWaitOrUnaccountableTime(timeNotTesting, visit);
          activity.startTime = lastTimelineItem.startTime;
        }
      }
      activity.endTime = new Date().toISOString();
    }

    activity.notes = null;
    return activity;
  }

  /**
   * creates a wait time if time not testing is above 5 minutes or unaccountable time if less
   *
   * @param timeNotTesting time since last test in milliseconds
   * @param visit the current visit
   * @return wait or unaccountable time
   */
  createWaitOrUnaccountableTime(timeNotTesting: number, visit: VisitModel): ActivityModel {
    if (timeNotTesting < this.counterTime) {
      return this.createActivity(visit, null, false, false);
    } else {
      return this.createActivity(visit, VISIT.ACTIVITY_TYPE_WAIT, false, false);
    }
  }

  /**
   * returns the number of milliseconds between the two time strings
   *
   * @param start start time string
   * @param end end time string
   * @return milliseconds
   */
  getWaitTimeBetween(start: string, end: string): number {
    return this.commonFunc.minutesIntoMilliseconds(
      (Date.parse(start) - Date.parse(end))
    );
  }

  /**
   * returns a list of objects containing the id, waitReason and notes for each wait time
   *
   * @param activitiesArr the current list of activities
   * @return list of objects containing id, waitReason and notes for wait times
   */
  createActivitiesForUpdateCall(activitiesArr: ActivityModel[]): any[] {
    const activitiesForUpdate = [];
    for (const activity of activitiesArr) {
      const updActivity = {
        id: activity.id,
        waitReason: activity.waitReason,
        notes: activity.notes ? activity.notes : null
      };
      activitiesForUpdate.push(updActivity);
    }
    return activitiesForUpdate;
  }

  /**
   * calculates the time since the beginning of the visit or the last test if available in minutes
   *
   * @param visit the current visit
   * @return minutes
   */
  minutesPassedSinceVisitOrLastTest(visit: VisitModel): number {
    if (!visit.tests.length) {
      return this.commonFunc.millisecondsIntoMinutes(
        Date.now() - Date.parse(visit.startTime)
      );
    } else {
      return this.commonFunc.millisecondsIntoMinutes(
        Date.now() - Date.parse(visit.tests[visit.tests.length - 1].endTime)
      );
    }
  }

  /**
   * returns true if 5 minutes have passed since the test start or the last test if available
   *
   * @param visit the current visit
   * @return have 5 minutes passed?
   */
  have5MinutesPassedSinceVisitOrLastTest(visit: VisitModel): boolean {
    return (this.minutesPassedSinceVisitOrLastTest(visit) > this.counterTime);
  }

  /**
   * returns true if timeline is empty or if last thing in the timeline isn't a wait time
   *
   * @param timeline the current timeline
   * @return can another wait time be added?
   */
  canAddOtherWaitingTime(timeline: any[]): boolean {
    if (timeline.length === 0) {
      return true;
    }
    return !timeline[timeline.length - 1].activityType;
  }

  /**
   * returns true if any of the activities are missing a wait reason
   *
   * @param activities the current activities
   * @return are wait reasons missing from any activity?
   */
  checkWaitTimeReasons(activities: ActivityModel[]): boolean {
    let checkReason = false;
    activities.forEach((activity) => {
      if (activity.waitReason.length === 0) {checkReason = true;}
    });
    return checkReason;
  }

  /**
   * creates a wait time using the current timeline and visit
   *
   * @param timeline the current timeline
   * @param visit the current visit
   */
  createWaitTime(timeline: any[], visit: VisitModel): void {
    const waitActivity: ActivityModel = this.createActivity(
      visit,
      VISIT.ACTIVITY_TYPE_WAIT,
      true,
      true
    );
    this.waitTimeStarted = true;
    if (timeline.length === 0) {
      waitActivity.startTime = visit.startTime;
    } else {
      waitActivity.startTime = timeline[timeline.length - 1].endTime;
    }
    timeline.push(waitActivity);
  }

  /**
   * creates the final activity for the visit and returns all activities to be updated
   *
   * @param timeline the current timeline
   * @param visit the current visit
   * @param oid the oid for authentication
   * @return
   */
  createActivityToPost$(timeline: any[], visit: VisitModel, oid: string): Observable<any> {
    const activity: ActivityModel = this.createActivityBodyForCall(
      visit,
      null,
      timeline
    );

    return this.submitActivity(activity).pipe(
      map((submitActivityResp) => {

        this.logProvider.dispatchLog({
          type: LOG_TYPES.INFO,
          message: `${oid} - ${submitActivityResp.status} ${submitActivityResp.statusText} for API call to ${submitActivityResp.url}`,
          timestamp: Date.now()
        });

        const activities = this.getActivities();
        if (timeline.length && timeline[timeline.length - 1].activityType) {
          const latestActivityPos = activities.length - 1;
          activities[latestActivityPos].endTime = new Date().toISOString();
          activities[latestActivityPos].id = submitActivityResp.body.id;

        }
        this.updateActivitiesArgs(activities);
        return activities;
      }),
      catchError((error) => {
        this.showLoading('');

        this.logProvider.dispatchLog({
          type: `${LOG_TYPES.ERROR}-activityService.submitActivity in visit-timeline.ts`,
          message: `${oid} -${JSON.stringify(error)}`,
          timestamp: Date.now()
        });

        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.ERRORS,
          event: ANALYTICS_EVENTS.TEST_ERROR,
          label: ANALYTICS_VALUE.WAIT_ACTIVITY_SUBMISSION_FAILED
        });

        return of(null);
      })
    );
  }

  async showLoading(loadingText: string) {
    if (loadingText) {
      this.loading = await this.loadingCtrl.create({
        message: loadingText
      });

      await this.loading.present();
    } else {
      await this.loading.dismiss();
    }
  }
}
