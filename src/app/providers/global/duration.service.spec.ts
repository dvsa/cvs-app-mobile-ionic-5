import { TestBed } from '@angular/core/testing';

import { DurationService } from './duration.service';
import { Duration } from '@models/duration.model';
import { DURATION_TYPE } from '@app/app.enums';

describe('DurationService', () => {
  let durationService: DurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DurationService]
    });

    durationService = TestBed.inject(DurationService);
  });

  describe('durationType', () => {
    const timeStart = 1620242516913;
    const timeEnd = 1620243020205;
    beforeEach(() => {});

    it('should set duration for a duration type', () => {
      const type: string = DURATION_TYPE[DURATION_TYPE.TEST_TYPE];
      let duration: Duration = { start: timeStart };

      durationService.setDuration(duration, type);

      let result = durationService.getDuration(type);
      expect(result).toEqual(duration);

      duration = { start: timeStart, end: timeEnd };
      durationService.setDuration(duration, type);

      result = durationService.getDuration(type);
      expect(result).toEqual(duration);
    });

    it('should get the duration taken', () => {
      const duration = { start: timeStart, end: timeEnd };

      const result = durationService.getTakenDuration(duration);

      expect(result).toBe(503);
    });
  });
});
