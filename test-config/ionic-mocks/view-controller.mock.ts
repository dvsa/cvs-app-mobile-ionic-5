export class ViewControllerMock {
  public index = 0;

  public readReady = {
    subscribe: () => {}
  };

  public writeReady = {
    subscribe: () => {}
  };

  dismiss() {
  }

  public remove(startIndex: number): any {
    return {};
  };

  public _setHeader(): any {
    return {};
  };

  public _setIONContent(): any {
    return {};
  };

  public _setIONContentRef(): any {
    return {};
  };

  public _setNavbar(): any {
    return {};
  };

  public setBackButtonText() {
    Promise.resolve();
  }
}
