import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { timer } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

export interface GenericRetryStrategyInterface {
  maxRetryAttempts?: number;
  duration?: number;
  excludedStatusCodes?: number[];
}

export const genericRetryStrategy = ({
  maxRetryAttempts = 2,
  duration = 3000,
  excludedStatusCodes = [0, 401, 404]
}: GenericRetryStrategyInterface = {}) => (attempts: Observable<any>) => attempts.pipe(
    tap((_) => true),
    mergeMap((error: HttpErrorResponse, i: number) => {
      const retryAttempt = i + 1;
      if (
        retryAttempt > maxRetryAttempts ||
        excludedStatusCodes.some((e) => e === error.status)
      ) {
        return throwError(error);
      }
      return timer(duration);
    })
  );
