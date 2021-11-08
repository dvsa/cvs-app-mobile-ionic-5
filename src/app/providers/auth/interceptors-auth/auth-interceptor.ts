import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { filter, mergeMap, map } from 'rxjs/operators';

import { AuthenticationService } from '@providers/auth';
import { NetworkService } from '@providers/global';
import { AUTH, CONNECTION_STATUS } from '@app/app.enums';
import { default as AppConfig } from '@config/application.hybrid';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authentication: AuthenticationService,
    private networkService: NetworkService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const netWorkStatus: CONNECTION_STATUS = this.networkService.getNetworkState();

    if (netWorkStatus === CONNECTION_STATUS.OFFLINE) {
      return throwError(new HttpErrorResponse({ error: AUTH.INTERNET_REQUIRED }));
    }

    // don't mutate request for this EP
    if (req.url === AppConfig.app.URL_LATEST_VERSION) {
      return next.handle(req);
    }

    return from(this.authentication.checkUserAuthStatus()).pipe(
      filter((authStatus: boolean) => !!req.url && authStatus),
      map((_) => this.addTokenToRequest(req)),
      mergeMap((updatedReq) => next.handle(updatedReq))
    );
  }

  addTokenToRequest(req: HttpRequest<any>): HttpRequest<any> {
    const { token } = this.authentication.tokenInfo;

    const httpReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token
      }
    });

    return httpReq;
  }
}
