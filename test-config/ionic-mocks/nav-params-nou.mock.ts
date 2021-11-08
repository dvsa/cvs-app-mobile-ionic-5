export class NavParamsMock {
  public static instance(getReturn?: any): any {
    const instance = jasmine.createSpyObj('NavParams', ['get']);
    instance.get.and.returnValue(getReturn);

    return instance;
  }
}
