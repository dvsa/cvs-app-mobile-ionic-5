export class AlertMock {
  public static instance(): any {
    const instance = jasmine.createSpyObj('Alert', ['present', 'dismiss']);
    instance.present.and.returnValue(Promise.resolve());
    instance.dismiss.and.returnValue(Promise.resolve());

    return instance;
  }
}
