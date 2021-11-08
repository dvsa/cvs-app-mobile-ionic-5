export class NavControllerMock {
  public static instance(): any {

    const instance = jasmine.createSpyObj('navController', [
      'push',
      'pop',
      'setRoot',
      'popToRoot',
      'registerChildNav',
      'unregisterChildNav',
      'ionViewDidLoad',
      'ionViewWillEnter',
      'ionViewDidEnter',
      'ionViewWillLeave',
      'ionViewWillUnload',
      'ionViewCanEnter',
      'ionViewCanLeave',
      'last'
    ]);

    instance.push.and.returnValue(Promise.resolve());
    instance.pop.and.returnValue(Promise.resolve());
    instance.setRoot.and.returnValue(Promise.resolve());
    instance.popToRoot.and.returnValue(Promise.resolve());
    instance.ionViewCanEnter.and.returnValue(true);
    instance.ionViewCanLeave.and.returnValue(true);
    instance.last.and.returnValue({name: 'Last page name'});
    return instance;
  }
}
