import { Injectable } from '@angular/core';
import { StorageService } from '../natives/storage.service';
import { Observable, from } from 'rxjs';
import { TestStationReferenceDataModel } from '@models/reference-data-models/test-station.model';
import { STORAGE, TEST_STATIONS_SEARCH } from '@app/app.enums';

@Injectable()
export class TestStationService {
  orderedArray: TestStationReferenceDataModel[] = [];

  constructor(private storageService: StorageService) {}

  getTestStationsFromStorage(): Observable<TestStationReferenceDataModel[]> {
    return from(this.storageService.read(STORAGE.ATFS));
  }

  sortAndSearchTestStation(items: any[], filter: string, properties: string[]): any[] {
    const filteredArray: any[] = [];
    if (!items || !filter) {
      if ((filter === '' || filter === undefined) && items && Array.isArray(items[0])) {
        items.forEach((elem: TestStationReferenceDataModel[]) => {
          elem.forEach((subElem: TestStationReferenceDataModel) => {
            subElem.searchProperty = properties[0];
          });
        });
      }
      return this.orderedArray.length > 0
        ? this.orderedArray
        : this.groupByLetter(items, properties[0]);
    }
    items.forEach((elem) => {
      const arrGroup: any[] = elem.filter((item: TestStationReferenceDataModel) => {
        // eslint-disable-next-line guard-for-in
        for (const key in item) {
          const propIndex: number = properties.indexOf(key);
          if (propIndex !== -1) {
            if (
              item[key] !== null &&
              item[key]
                .toString()
                .toLowerCase()
                .includes(filter.toLowerCase())
            ) {
              item.searchProperty = properties[propIndex];
              return item;
            }
          } else {
            continue;
          }
        }
      });
      if (arrGroup.length) {filteredArray.push(arrGroup);}
    });
    return filteredArray;
  }

  boldSearchVal(str: string, find: string): string {
    if (!find) {return str;}
    if (!str.toLowerCase().includes(find.toLowerCase())) {return str;}

    const findIndex = str.toLowerCase().search(find.toLowerCase());
    const strArr = [];
    for (let i = 0; i < find.length; i++) {
      strArr.push(str[findIndex + i]);
    }
    const re = str.substr(findIndex, find.length);
    const res = strArr.join('');
    return str.replace(re, `<strong>${res}</strong>`);
  }

  groupByLetter(array: any[], groupBy: string): any[] {
    const sectionsArr = TEST_STATIONS_SEARCH.SECTIONS.split('');
    const newArr = [];
      let arrGroup = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < sectionsArr.length; i++) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < array.length; j++) {
        if (array[j][groupBy].charAt(0).toLowerCase() === sectionsArr[i]) {
          arrGroup.push(array[j]);
        }
      }
      if (arrGroup.length) {
        newArr.push(arrGroup);
        arrGroup = [];
      }
    }
    if (!this.orderedArray.length) {this.orderedArray = newArr;}
    return newArr;
  }
}
