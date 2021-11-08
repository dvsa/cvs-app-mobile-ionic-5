export class AppServiceMock {
  public isProduction: boolean;
  public isCordova: boolean;
  public isInitSyncDone: boolean;
  public isSignatureRegistered: boolean;
  public isJwtTokenStored: boolean;
  public easterEgg: boolean;
  public caching: boolean;

  constructor() {
    this.isCordova = false;
    this.isProduction = false;
    this.isSignatureRegistered = false;
    this.caching = true;
    this.easterEgg = true;
    this.isInitSyncDone = false;
    this.isJwtTokenStored = false;
  }

  enableCache() {}

  isAccessibilityTextZoomEnabled() {
    return false;
  }

  manageAppInit() {}
}
