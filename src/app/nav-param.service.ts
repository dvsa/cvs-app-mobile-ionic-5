import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavParamService {
  private _navData: any = {};
  constructor() { }

  get navData(): any {
    return this._navData;
  }

  set navData(data: any) {
    this._navData = data;
  }

  updateNavData(data: any) {
    this.navData = {...this.navData, ...data};
  }

  returnNavData(key): any {
    return this.navData[key];
  }
}
