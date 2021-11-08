export interface TokenInfo {
  id: string;
  testerName: string;
  testerEmail: string;
  testerRoles: string[];
  oid: string;
  employeeId: string;
  testerId: string;
  token: string;
}

export interface TokenStatus {
  active: boolean;
  action: string;
}

export interface AzureIDToken {
  aio: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  name: string;
  nbf: string;
  nonce: string;
  oid: string;
  preferred_username: string;
  rh: string;
  roles: string[];
  sub: string;
  tid: string;
  uti: string;
  ver: string;
}
