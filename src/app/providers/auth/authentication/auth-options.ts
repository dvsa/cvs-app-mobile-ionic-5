import { IonicAuthOptions } from '@ionic-enterprise/auth';
import { default as AppConfig } from '@config/application.hybrid';

const baseConfig = {
  authConfig: 'azure',
  clientID: `${AppConfig.app.CLIENT_ID}`,
  scope: 'openid offline_access profile email',
  // eslint-disable-next-line max-len
  discoveryUrl: `https://login.microsoftonline.com/${AppConfig.app.TENANT_ID}/v2.0/.well-known/openid-configuration?appid=${AppConfig.app.CLIENT_ID}`
};

export const webAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  platform: 'web',
  redirectUri: 'http://localhost:8100',
  logoutUrl: 'http://localhost:8100',
  logLevel: 'DEBUG',
  webAuthFlow: 'PKCE'
} as IonicAuthOptions;

export const cordovaAzureConfig: IonicAuthOptions = {
  ...baseConfig,
  platform: 'cordova',
  redirectUri: `${AppConfig.app.AUTH_REDIRECT_URL}://callback`,
  logoutUrl: `${AppConfig.app.AUTH_REDIRECT_URL}://callback?logout=true`,
  iosWebView: 'private'
} as IonicAuthOptions;
