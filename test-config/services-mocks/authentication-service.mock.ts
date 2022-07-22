import { TESTER_ROLES } from '@app/app.enums';
import { TokenInfo } from '@providers/auth/authentication/auth-model';

export class AuthenticationServiceMock {
  public tokenInfo: TokenInfo;

  constructor() {
    this.tokenInfo = {
      testerId: 'testerId',
      testerEmail: 'jack@dvsa.gov.uk',
      testerName: 'jack',
      token: 'eyJhbGciOiJIUzI1NiIsIn',
      testerRoles: [TESTER_ROLES.FULL_ACCESS],
      employeeId: '1234567',
    } as TokenInfo;
  }

  hasUserRights(): boolean {
    return true;
  }

  login() {}

  logout() {}

  checkUserAuthStatus(): Promise<boolean> {
    return Promise.resolve(true);
  }

  getTesterID(): Promise<string> {
    return Promise.resolve('');
  }
}
