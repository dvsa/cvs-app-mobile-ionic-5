import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppAlertService } from '@providers/global/app-alert.service';
import { STATUS_CODE } from '@app/app.enums';

@Injectable()
export class UnauthInterceptor implements HttpInterceptor {
  constructor(private alertService: AppAlertService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {},
        async (err: HttpErrorResponse) => {
          if (err.status === STATUS_CODE.UNAUTHORIZED) {
            await this.alertService.alertUnAuthorise();
          }
        }
      )
    );
  }
}
