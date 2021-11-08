import { CommonRegExp } from './common-regExp';
import { TestBed } from '@angular/core/testing';

describe('CommonRegExp', () => {
  let commonRegExp: CommonRegExp;

  // dummy hand crafted jwt token for testing purpose only
  const JWT_TOKEN =
    // eslint-disable-next-line max-len
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidXBuIjoidGVzdEBlbWFpbC5jb20ifQ.BlL6ll8xB4iGqDn_KB2mezWRFMHRqbRu-NxDB3443s0';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonRegExp],
    });
    commonRegExp = TestBed.get(CommonRegExp);
  });

  it('should be created', () => {
    expect(commonRegExp).toBeTruthy();
  });

  it('should return a reg exp for odometer value', () => {
    expect(CommonRegExp.ODOMETER_VALUE.test('1234')).toBe(true);
    expect(CommonRegExp.ODOMETER_VALUE.test('abcde.')).toBe(false);
  });

  it('should return a reg exp for token value', () => {
    expect(CommonRegExp.JTW_TOKEN.test('abc')).toBe(false);
    expect(CommonRegExp.JTW_TOKEN.test(JWT_TOKEN)).toBe(true);
  });
});
