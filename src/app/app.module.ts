import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  AnalyticsService,
  AppAlertService,
  AppService, DurationService,
  HTTPService, NetworkService,
  StateReformingService,
  SyncService
} from '@providers/global';
import {StorageService} from '@providers/natives/storage.service';
import {AuthenticationService, BrowserAuthPlugin, BrowserAuthService, VaultService} from '@providers/auth';
import {VisitService} from '@providers/visit/visit.service';
import {ActivityService} from '@providers/activity/activity.service';
import {PreparerService} from '@providers/preparer/preparer.service';
import {CommonFunctionsService} from '@providers/utils/common-functions';
import {LogsProvider} from '@store/logs/logs.service';
import {SignatureService} from '@providers/signature/signature.service';

const CUSTOM_PROVIDERS = [
  AppService,
  AppAlertService,
  SyncService,
  HTTPService,
  StorageService,
  AuthenticationService,
  VaultService,
  BrowserAuthPlugin,
  BrowserAuthService,
  PreparerService,
  VisitService,
  ActivityService,
  StateReformingService,
  CommonFunctionsService,
  LogsProvider,
  SignatureService,
  AnalyticsService,
  DurationService,
  NetworkService
];

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ...CUSTOM_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
