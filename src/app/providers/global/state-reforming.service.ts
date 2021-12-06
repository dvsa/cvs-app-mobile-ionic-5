import { Injectable } from '@angular/core';
import { StorageService } from '../natives/storage.service';
import { PAGE_NAMES, STORAGE } from '@app/app.enums';
import { AppService } from './app.service';
import { NavigationExtras } from '@angular/router';

// interface StateHistoryModel {
//   page: string;
//   params: any;
// }

interface StateHistoryModel {
  page: string;
  extras?: NavigationExtras;
}

@Injectable()
export class StateReformingService {
  private _navStack: StateHistoryModel[] = [];
  constructor(public storageService: StorageService, private appService: AppService) {}

  getLastPage(): StateHistoryModel {
    return this.navStack[this.navStack.length - 1];
  }

  /**
   * Call this at end of test eventually to empty stack
   */
  async emptyStack() {
    // console.log(this.navStack);
    this.navStack = [];
    await this.storageService.update(STORAGE.STATE, this.navStack);
  }

  async rebuildStack() {
    await this.storageService.read(STORAGE.STATE).then((data: string) => {
      try {
        const stateHistory: StateHistoryModel[] = JSON.parse(data);
        this.navStack = stateHistory;
      }
      catch(e) {
        console.log('got empty string');
        this._navStack = [];
      }
    });
  }

  pushNavStack(nav: StateHistoryModel) {
    this._navStack.push(nav);
  }

  popNavStack() {
    this._navStack.pop();
  }

  async updateNavStack() {
    if (this.appService.caching) {
      const stateHistory: StateHistoryModel[] = [];
      for (const nav of this.navStack) {
        // ignore these pages
        if (nav.page.substring(1) === PAGE_NAMES.TEST_TYPES_LIST_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.COMPLETE_TEST_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.TEST_REVIEW_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.SIGNATURE_PAD_PAGE) {continue;}
        if (nav.page.substring(1) === PAGE_NAMES.TEST_CANCEL_PAGE) {continue;}

        stateHistory.push({
          page: nav.page,
          extras: nav.extras
        });
        const stateJSON = JSON.stringify(stateHistory);
        await this.storageService.update(STORAGE.STATE, stateJSON);
      }
    }
  }

  get navStack(): StateHistoryModel[] {
    return this._navStack;
  }

  set navStack(stack: StateHistoryModel[]) {
    this._navStack = stack;
  }

  onTestReview() {
    this.storageService.read(STORAGE.STATE).then((data: string) => {
      const stateHistory: StateHistoryModel[] = JSON.parse(data);
      for (let i = stateHistory.length - 1; i > 0; i--) {
        if (stateHistory[i].page === PAGE_NAMES.VISIT_TIMELINE_PAGE) {break;}
        stateHistory.pop();
      }
      const stateJSON = JSON.stringify(stateHistory);
      this.storageService.update(STORAGE.STATE, stateJSON);
    });
  }
}
