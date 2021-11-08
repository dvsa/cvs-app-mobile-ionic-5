import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retryWhen, tap } from 'rxjs/operators';

import { genericRetryStrategy } from '../../utils/rxjs.utils';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {}),
      retryWhen(genericRetryStrategy())
    );
  }
}
