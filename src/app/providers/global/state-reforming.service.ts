import { Injectable } from '@angular/core';
import { StorageService } from '../natives/storage.service';
import { PAGE_NAMES, STORAGE } from '@app/app.enums';
import { AppService } from './app.service';
import { NavParamService } from '@app/nav-param.service';

export interface NavStateModel {
  page: string;
}

@Injectable()
export class StateReformingService {
  private _navStack: NavStateModel[] = [];
  constructor(
    public storageService: StorageService,
    private appService: AppService,
    private navParamService: NavParamService
  ) {}

  getPageFromLastSession(): NavStateModel {
    return this.navStack[this.navStack.length - 1];
  }

  async emptyStack() {
    this.navStack = [];
    this.navParamService.navData = {};

    await this.storageService.update(STORAGE.STATE, this.navStack);
    await this.storageService.update('navData', this.navParamService.navData);
  }

  async rebuildState() {
    console.log('test');
    await this.rebuildNavStack();
    await this.rebuildNavParams();
  }

  async rebuildNavStack() {
    try {
      const data = await this.storageService.read(STORAGE.STATE);
      const stateHistory: NavStateModel[] = JSON.parse(data) || [];
      this.navStack = stateHistory;
    } catch {
      this.navStack = [];
    }
  }

  async rebuildNavParams() {
    try {
      this.navParamService.navData = await this.storageService.read(STORAGE.NAV_DATA) || {};
    } catch {
      this.navParamService.navData = {};
    }
  }


  pushNavStack(navState: NavStateModel) {
    this._navStack.push(navState);
  }

  async updateState() {
    if (this.appService.caching) {
      const stateHistory: NavStateModel[] = [];
      for (const nav of this.navStack) {
        if (nav.page.substring(1) === PAGE_NAMES.TEST_TYPES_LIST_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.COMPLETE_TEST_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.TEST_REVIEW_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.SIGNATURE_PAD_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.TEST_CANCEL_PAGE) {continue;}

        stateHistory.push({
          page: nav.page
        });
      }

      const stateJSON = JSON.stringify(stateHistory);
      await this.storageService.update(STORAGE.STATE, stateJSON);
      await this.storageService.update(STORAGE.NAV_DATA, this.navParamService.navData);
    }
  }

  get navStack(): NavStateModel[] {
    return this._navStack || [];
  }

  set navStack(stack: NavStateModel[]) {
    this._navStack = stack;
  }

  onTestReview() {
    this.storageService.read(STORAGE.STATE).then((data: string) => {
      const stateHistory: NavStateModel[] = JSON.parse(data);
      for (let i = stateHistory.length - 1; i > 0; i--) {
        if (stateHistory[i].page === PAGE_NAMES.VISIT_TIMELINE_PAGE) {break;}
        stateHistory.pop();
      }
      const stateJSON = JSON.stringify(stateHistory);
      this.storageService.update(STORAGE.STATE, stateJSON);
    });
  }
}
