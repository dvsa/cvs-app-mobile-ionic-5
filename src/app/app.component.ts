import {Component, OnInit, Renderer2} from '@angular/core';
import {Platform} from '@ionic/angular';
import {AnalyticsService, AppService, NetworkService, SyncService} from '@providers/global';
import {AuthenticationService} from '@providers/auth';
import {StorageService} from '@providers/natives/storage.service';
import {
  ACCESSIBILITY_DEFAULT_VALUES,
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  CONNECTION_STATUS, PAGE_NAMES
} from '@app/app.enums';
import { default as AppConfig } from '../../config/application.hybrid';
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NavigationStart, Router} from '@angular/router';
import { StateReformingService} from '@providers/global';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private networkService: NetworkService,
    private authenticationService: AuthenticationService,
    public storageService: StorageService,
    private appService: AppService,
    private analyticsService: AnalyticsService,
    private mobileAccessibility: MobileAccessibility,
    private screenOrientation: ScreenOrientation,
    private renderer: Renderer2,
    private router: Router,
    private syncService: SyncService,
    private stateReformingService: StateReformingService
  ) {
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.initApp();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.stateReformingService.pushNavStack(
          {
            page: event.url,
            extras: {
              state: this.router.getCurrentNavigation().extras.state
            }
          });
      }
    });
  }

  async initApp() {

    this.networkService.initialiseNetworkStatus();

    await this.authenticationService.expireTokens();

    await this.appService.manageAppInit();

    const netWorkStatus: CONNECTION_STATUS = this.networkService.getNetworkState();

    if (netWorkStatus === CONNECTION_STATUS.OFFLINE) {
      await this.manageAppState();
      return;
    }

    const authStatus = await this.authenticationService.checkUserAuthStatus();
    if (authStatus && !this.appService.isSignatureRegistered) {
      // @TODO - Ionic 5 - enable this once signature pad page implemented
      // await this.navigateToSignaturePage();
    } else {
      await this.manageAppState();
    }

    if (authStatus && this.appService.isCordova) {
      await this.activateNativeFeatures();
    }
  }

  async navigateToSignaturePage(): Promise<void> {
    await this.router.navigate([PAGE_NAMES.SIGNATURE_PAD_PAGE], {replaceUrl: true});
    // @TODO - Ionic 5 - enable this
    // this.manageAppStateListeners();
  }

  private async setRootPage(): Promise<any> {
    await this.router.navigate([PAGE_NAMES.TEST_STATION_HOME_PAGE], {replaceUrl: true});
    // @TODO - Ionic 5 - do we need this?
    // this.splashScreen.hide();

  }

  async manageAppState() {
    await this.stateReformingService.rebuildStack();
    try {
      const lastPage = this.stateReformingService.getPageFromLastSession();
      await this.router.navigate([lastPage.page]);
    } catch(e) {
      await this.setRootPage();
      // await this.stateReformingService.emptyStack();
      // this.splashScreen.hide();
    }

    // let error, storageState, storedVisit, storedActivities;
    //
    // [error, storageState] = await to(this.storageService.read(STORAGE.STATE));
    // if (storageState) {
    //   let parsedArr = JSON.parse(storageState);
    //   this.navElem.setPages(parsedArr).then(() => this.splashScreen.hide());
    // } else {
    //   this.setRootPage();
    // }
    //
    // [error, storedVisit] = await to(this.storageService.read(STORAGE.VISIT));
    // this.visitService.visit = storedVisit || ({} as VisitModel);
    //
    // [error, storedActivities] = await to(this.storageService.read(STORAGE.ACTIVITIES));
    // this.activityService.activities = storedActivities || ([] as ActivityModel[]);
    //
    // if (error) {
    //   const { oid } = this.authenticationService.tokenInfo;
    //   this.logProvider.dispatchLog({
    //     type: `${LOG_TYPES.ERROR}`,
    //     timestamp: Date.now(),
    //     message: `User ${oid} failed from manageAppState in app.component.ts - ${JSON.stringify(
    //       error
    //     )}`
    //   });
    // }
  }

  async activateNativeFeatures(): Promise<void> {
    await this.analyticsService.startAnalyticsTracking(AppConfig.ga.GOOGLE_ANALYTICS_ID);

    this.accessibilityFeatures();
    await this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
  }

  private accessibilityFeatures(): void {
    this.mobileAccessibility.updateTextZoom();

    this.mobileAccessibility
      .getTextZoom()
      .then((result) => {
        if (result !== ACCESSIBILITY_DEFAULT_VALUES.TEXT_SIZE) {
          this.analyticsService.logEvent({
            category: ANALYTICS_EVENT_CATEGORIES.MOBILE_ACCESSIBILITY,
            event: ANALYTICS_EVENTS.IOS_FONT_SIZE_USAGE
          });
        }
        this.appService.setAccessibilityTextZoom(result);
      })
      .catch(() => this.appService.setAccessibilityTextZoom(106));

    this.mobileAccessibility.isVoiceOverRunning().then((result) => {
      if (result) {
        this.analyticsService.logEvent({
          category: ANALYTICS_EVENT_CATEGORIES.MOBILE_ACCESSIBILITY,
          event: ANALYTICS_EVENTS.IOS_VOICEOVER_USAGE
        });
      }
    });

    this.mobileAccessibility.isInvertColorsEnabled().then((result) => {
      if (result) {
        this.renderer.setStyle(document.body, 'filter', 'invert(100%)');
      } else {
        this.renderer.removeStyle(document.body, 'filter');
      }
    });

    this.mobileAccessibility.isBoldTextEnabled().then((result) => {
      if(result) {
        this.renderer.addClass(document.body, 'accessibility-bold-text');
      } else {
        this.renderer.removeClass(document.body, 'accessibility-bold-text');
      }
    });
  }


}
