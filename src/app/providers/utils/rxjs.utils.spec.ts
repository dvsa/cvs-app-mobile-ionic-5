import {
  genericRetryStrategy,
  GenericRetryStrategyInterface,
} from './rxjs.utils';
import { of } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import {catchError} from 'rxjs/operators';

describe('RXJS utils', () => {
  it('should return a result on genericRetryStrategy action if retryAttempt < maxRetryAttempts', fakeAsync(() => {
    const test = {
      maxRetryAttempts: 3,
      duration: 3000,
      excludedStatusCodes: [],
    } as GenericRetryStrategyInterface;
    const result = genericRetryStrategy(test)(of([]));
    result.subscribe((res) => {
      expect(res).toEqual(0);
    });
    tick(15000);
  }));

  it('should throw an error on genericRetryStrategy action if retryAttempt > maxRetryAttempts', (done) => {
    const test = {
      maxRetryAttempts: 0,
      duration: 3000,
      excludedStatusCodes: [],
    } as GenericRetryStrategyInterface;

    const result = genericRetryStrategy(test)(of([new Error('hi')]));

    result.pipe(catchError((e) => e)).subscribe(e => {
      expect(e instanceof Error).toEqual(true);
      done();
    });
  });
});
