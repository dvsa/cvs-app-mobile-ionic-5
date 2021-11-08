import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { STORAGE } from '@app/app.enums';
import { StorageService } from '../natives/storage.service';
import { PreparersReferenceDataModel } from '@models/reference-data-models/preparers.model';

@Injectable()
export class PreparerService {
  constructor(private storageService: StorageService) {}

  getPreparersFromStorage(): Observable<PreparersReferenceDataModel[]> {
    return from(this.storageService.read(STORAGE.PREPARERS));
  }

  search(array: PreparersReferenceDataModel[], filter: string): PreparersReferenceDataModel[] {
    if (!array) {return [];}
    if (!filter) {return array;}

    filter = filter.toLowerCase();

    return array.filter((eachItem) => eachItem.preparerId.toLowerCase().includes(filter));
  }
}
