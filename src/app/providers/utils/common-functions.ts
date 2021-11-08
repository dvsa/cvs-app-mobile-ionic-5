import { TEST_TYPE_RESULTS, ODOMETER_METRIC } from '@app/app.enums';
import { TestTypeModel } from '@models/tests/test-type.model';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { CountryOfRegistrationData } from '@assets/app-data/country-of-registration/country-of-registration.data';
import { CommonRegExp } from './common-regExp';

export class CommonFunctionsService {
  public capitalizeString(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  public checkForMatch(inputValue: string, expectedValue: string): boolean {
    return inputValue.toLowerCase() === expectedValue.toLowerCase();
  }

  public checkForMatchInArray(inputValue: string, expectedArray: string[]): boolean {
    return expectedArray.map((x) => x.toLowerCase()).indexOf(inputValue.toLowerCase()) !== -1;
  }

  public searchFor(array: any[], filter: string, properties: string[]) {
    if (!filter) {return array;}
    return array.filter((elem) => properties.some((property) => {
        if (typeof elem[property] == 'number') {
          if (elem[property].toString() === filter) {return true;}
        } else {
          if (elem[property].toLowerCase().includes(filter.toLowerCase())) {return true;}
        }
      }));
  }

  public orderBy(key, order: 'asc' | 'desc' = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
      const varB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  public groupArrayAlphabetically(array: any[], groupBy: string) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const newArr = [];
      let arrGroup = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < alphabet.length; i++) {
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let j = 0; j < array.length; j++) {
        if (array[j][groupBy].charAt(0).toLowerCase() === alphabet[i]) {
          arrGroup.push(array[j]);
        }
      }
      if (arrGroup.length) {
        newArr.push(arrGroup);
        arrGroup = [];
      }
    }
    return newArr;
  }

  public orderByStringId(key, order: 'asc' | 'desc' = 'asc') {
    return (a, b) => {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }

      const varA = +a[key];
      const varB = +b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === 'desc' ? comparison * -1 : comparison;
    };
  }

  getTestResultColor(testResult: string): string {
    switch (testResult.toLowerCase()) {
      case TEST_TYPE_RESULTS.PASS:
        return 'secondary';
      case TEST_TYPE_RESULTS.FAIL:
      case TEST_TYPE_RESULTS.ABANDONED:
        return 'danger';
      case TEST_TYPE_RESULTS.PRS:
        return 'tertiary';
    }
  }

  cloneObject(oldObj) {
    let newObj = oldObj;
    if (oldObj && typeof oldObj === 'object') {
      newObj = Object.prototype.toString.call(oldObj) === '[object Array]' ? [] : {};
      // eslint-disable-next-line guard-for-in
      for (const i in oldObj) {
        newObj[i] = this.cloneObject(oldObj[i]);
      }
    }
    return newObj;
  }

  randomString(length: number): string {
    return Math.random()
      .toString(36)
      .substr(2, length);
  }

  getDistanceType(distanceType: string): string {
    return distanceType === ODOMETER_METRIC.MILES ? ODOMETER_METRIC.MI : ODOMETER_METRIC.KM;
  }

  intersection(allowedTestsArray: string[][]): string[] {
    const result = [];
    // eslint-disable-next-line @typescript-eslint/prefer-for-of
    for (let i = 0; i < allowedTestsArray.length; i++) {
      const currentList = allowedTestsArray[i];
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let y = 0; y < currentList.length; y++) {
        const currentValue = currentList[y];
        if (result.indexOf(currentValue) === -1) {
          if (
            allowedTestsArray.filter((obj) => obj.indexOf(currentValue) === -1).length === 0
          ) {
            result.push(currentValue);
          }
        }
      }
    }
    return result;
  }

  orderTestTypeArrayByDate(testTypeArray: TestTypeModel[]): void {
    if (testTypeArray.length) {
      testTypeArray.sort((a, b) => +new Date(b.testTypeStartTimestamp) - +new Date(a.testTypeStartTimestamp));
    }
  }

  getCountryStringToBeDisplayed(vehicle: VehicleModel) {
    const corData = CountryOfRegistrationData.CountryData;
    for (const elem of corData) {
      if (vehicle.countryOfRegistration === elem.key) {
        return elem.value.split(' -')[0];
      }
    }
  }

  getObfuscatedTesterOid(testerOid: string): string {
    let obfuscated = '';
    let obfuscatedCollecton = [];

    if (testerOid.match(CommonRegExp.UUID_REGEX)) {
      obfuscatedCollecton = testerOid.split('-').map((portion) => {
        if (portion.match(CommonRegExp.UUID_REGEX_SUB)) {
          return '****';
        }
        return portion;
      });
      obfuscated = obfuscatedCollecton.join('-');
    }

    return obfuscated;
  }
}
