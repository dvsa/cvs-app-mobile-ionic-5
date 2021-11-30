import { of } from 'rxjs';

export class NetworkMock {
  type = 'WiFi';
  onDisconnect = () => (of());
  onConnect = () => (of());
}
