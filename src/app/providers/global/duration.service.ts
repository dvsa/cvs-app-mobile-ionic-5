import { Injectable } from '@angular/core';

import { Duration } from '@models/duration.model';
import { DURATION_TYPE } from '@app/app.enums';

@Injectable()
export class DurationService {
  constructor() {}

  private durationType = {
    [DURATION_TYPE.SEARCH_VEHICLE]: {} as Duration,
    [DURATION_TYPE.CONFIRM_VEHICLE]: {} as Duration,
    [DURATION_TYPE.CONFIRM_PREPARER]: {} as Duration,
    [DURATION_TYPE.ODOMETER_READING]: {} as Duration,
    [DURATION_TYPE.DEFECT_TIME]: {} as Duration,
    [DURATION_TYPE.TEST_TYPE]: {} as Duration
  };

  setDuration(duration: Duration, type: string) {
    const currentDuration: Duration = this.durationType[DURATION_TYPE[type]];
    const updatedDuration: Duration = {
      ...currentDuration,
      ...duration
    };

    this.durationType[DURATION_TYPE[type]] = updatedDuration;
  }

  getDuration(type: string): Duration {
    return this.durationType[DURATION_TYPE[type]];
  }

  getTakenDuration(params: Duration): number {
    const { start, end } = params;
    return Math.round((end - start) / 1000);
  }

  completeDuration(type: string, currentPage) {
    this.setDuration({ end: Date.now() }, type);
    const duration = this.getDuration(type);
    const takenDuration = this.getTakenDuration(duration);
    currentPage.trackAddTestTypeDuration('ADD_TEST_TYPE_START_TIME', duration.start.toString());
    currentPage.trackAddTestTypeDuration('ADD_TEST_TYPE_END_TIME', duration.end.toString());
    currentPage.trackAddTestTypeDuration('ADD_TEST_TYPE_TIME_TAKEN', takenDuration.toString());
  }
}
