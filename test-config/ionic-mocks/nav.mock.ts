import { ViewControllerMock } from './view-controller-nou.mock';


export class NavMock {
  public static instance(): any {
    const instance: any = jasmine.createSpyObj('Nav', [
      'goToRoot',
      'initPane',
      'pangeChanged',
      'push',
      'insert',
      'insertPage',
      'pop',
      'popTo',
      'popToRoot',
      'popAll',
      'remove',
      'removeView',
      'setRoot',
      'setPages',
      'hasChildren',
      'getActiveChildNav',
      'registerChildNav',
      'unregisterChildNav',
      'destroy',
      'swipeBackStart',
      'swipeBackProgress',
      'swipeBackEnd',
      'canSwipeBack',
      'canGoBack',
      'isTransitioning',
      'setTransitioning',
      'getActive',
      'isActive',
      'getByIndex',
      'getPrevious',
      'first',
      'last',
      'indexOf',
      'length',
      'getViews',
      'isSwipeBackEnabled',
      'dismissPageChangeViews',
      'setViewPort',
      'resize'
    ]);

    instance.goToRoot.and.returnValue(Promise.resolve());
    instance.initPane.and.returnValue(1);

    instance.root = ViewControllerMock.instance();
    instance.rootParams = {};

    instance.push.and.returnValue(Promise.resolve());
    instance.insert.and.returnValue(Promise.resolve());
    instance.insertPage.and.returnValue(Promise.resolve());
    instance.pop.and.returnValue(Promise.resolve());
    instance.popTo.and.returnValue(Promise.resolve());
    instance.popToRoot.and.returnValue(Promise.resolve());
    instance.popAll.and.returnValue(Promise.resolve());
    instance.remove.and.returnValue(Promise.resolve());
    instance.removeView.and.returnValue(Promise.resolve());
    instance.setRoot.and.returnValue(Promise.resolve());
    instance.setPages.and.returnValue(Promise.resolve());
    instance.hasChildren.and.returnValue(true);
    instance.canSwipeBack.and.returnValue(true);
    instance.canGoBack.and.returnValue(true);
    instance.isTransitioning.and.returnValue(false);
    instance.getActive.and.returnValue(ViewControllerMock.instance());
    instance.isActive.and.returnValue(true);
    instance.getByIndex.and.returnValue(ViewControllerMock.instance());
    instance.getPrevious.and.returnValue(ViewControllerMock.instance());
    instance.first.and.returnValue(ViewControllerMock.instance());
    instance.last.and.returnValue(ViewControllerMock.instance());
    instance.indexOf.and.returnValue(0);
    instance.length.and.returnValue(0);
    instance.getViews.and.returnValue([]);
    instance.isSwipeBackEnabled.and.returnValue(true);

    return instance;
  }
}
