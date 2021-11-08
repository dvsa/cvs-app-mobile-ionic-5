import { Observable, of } from 'rxjs';

export class StorageServiceMock {
  constructor() {
  }

  get(): Promise<string>{
    return Promise.resolve('some value');
  }

  create(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  read(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  update(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  watchStorage(isError: boolean): Observable<any> {
    return of({});
  }

  setItem(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  removeItem(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  delete(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }

  clearStorage(isError: boolean): Promise<any> {
    if(isError) {return Promise.reject();}
    return Promise.resolve();
  }
}
