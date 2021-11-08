export class NavParamsMock {

  static returnParams: any = {};

  public get(key): any {
    if (NavParamsMock.returnParams[key]) {
      return NavParamsMock.returnParams[key];
    }
  }

  static setParams(key, value): any {
    NavParamsMock.returnParams[key] = value;
  }

}
