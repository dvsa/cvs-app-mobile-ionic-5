import { TEST_TYPE_RESULTS } from '@app/app.enums';
import { TestBed } from '@angular/core/testing';
import { CommonFunctionsService } from './common-functions';
import { CountryOfRegistrationData } from '@assets/app-data/country-of-registration/country-of-registration.data';
import { TestTypesReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/test-types.mock';
import { TestTypeArrayDataMock } from '@assets/data-mocks/test-type-array-data.mock';
import { VehicleDataMock } from '@assets/data-mocks/vehicle-data.mock';

describe('Provider: CommonFunctionsService', () => {
  let commonFunctionsService: CommonFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonFunctionsService]
    });

    commonFunctionsService = TestBed.inject(CommonFunctionsService);
  });

  afterEach(() => {
    commonFunctionsService = null;
  });

  it('should return a capitalized string', () => {
    const someString = 'aaa';
    const capString = commonFunctionsService.capitalizeString(someString);
    expect(capString).toMatch('Aaa');
  });

  it('should return true if string is matched, false if not', () => {
    let inputValue = 'aaa';
    const expectedvalue = 'Aaa';
    let matched = commonFunctionsService.checkForMatch(inputValue, expectedvalue);
    expect(matched).toBeTruthy();
    inputValue = 'xscsd';
    matched = commonFunctionsService.checkForMatch(inputValue, expectedvalue);
    expect(matched).toBeFalsy();
  });

  it('should return true if a match was found in array', () => {
    const inputValue = 'aaa';
    const expectedArray = ['sad', 'dfdfsd', 'rgrgerg', 'aaa'];
    const match = commonFunctionsService.checkForMatchInArray(inputValue, expectedArray);
    expect(match).toBeTruthy();
  });

  it('should return false if a match was not found', () => {
    const inputValue = 'zxzcz';
    const expectedArray = ['sad', 'dfdfsd', 'rgrgerg', 'aaa'];
    const match = commonFunctionsService.checkForMatchInArray(inputValue, expectedArray);
    expect(match).toBeFalsy();
  });

  it('should return array if searchValue not entered', () => {
    let searchVal;
    const array = CountryOfRegistrationData.CountryData;
    const filteredArray = commonFunctionsService.searchFor(array, searchVal, ['key', 'value']);
    expect(filteredArray.length).toEqual(array.length);
  });

  it('should return elements from array', () => {
    const searchVal = 'bg';
    const array = CountryOfRegistrationData.CountryData;
    const filteredArray = commonFunctionsService.searchFor(array, searchVal, ['key', 'value']);
    expect(filteredArray[0].key).toMatch('bg');
  });

  it('should return empty array if not found', () => {
    const searchVal = '123';
    const array = [
      { key: 'gb', value: 'Great Britain and Northern Ireland - GB' },
      { key: 'gba', value: 'Alderney - GBA' },
      { key: 123, value: '123-lea' },
      { key: 'gbj', value: 'Jersey - GBJ' },
      { key: 'gbm', value: 'Isle of Man - GBM' },
      { key: 'gbz', value: 'Gibraltar - GBZ' },
      { key: 'a', value: 'Austria - A' },
      { key: 'b', value: 'Belgium - B' },
      { key: 'bih', value: 'Bosnia and Herzegovina - BIH' },
      { key: 'bg', value: 'Bulgaria - BG' }
    ];
    const filteredArray = commonFunctionsService.searchFor(array, searchVal, ['key', 'value']);
    expect(filteredArray.length).toEqual(1);
  });

  it('should return the color name based on testResult', () => {
    let testResult = TEST_TYPE_RESULTS.PASS;
    let color = commonFunctionsService.getTestResultColor(testResult);
    expect(color).toMatch('secondary');
    testResult = TEST_TYPE_RESULTS.FAIL;
    color = commonFunctionsService.getTestResultColor(testResult);
    expect(color).toMatch('danger');
    testResult = TEST_TYPE_RESULTS.ABANDONED;
    color = commonFunctionsService.getTestResultColor(testResult);
    expect(color).toMatch('danger');
    testResult = TEST_TYPE_RESULTS.PRS;
    color = commonFunctionsService.getTestResultColor(testResult);
    expect(color).toMatch('tertiary');
  });

  it('should return an asc ordered array', () => {
    const array = CountryOfRegistrationData.CountryData;
    const sortedArray = array.sort(commonFunctionsService.orderBy('key', 'asc'));
    expect(sortedArray[0].key).toMatch('a');
  });

  it('should return an desc ordered array', () => {
    const array = CountryOfRegistrationData.CountryData;
    const sortedArray = array.sort(commonFunctionsService.orderBy('key'));
    expect(sortedArray[0].key).toMatch('a');
  });

  it('should return array in same order', () => {
    const array = CountryOfRegistrationData.CountryData;
    const sortedArray = array.sort(commonFunctionsService.orderBy('some'));
    expect(sortedArray[0].key).toMatch(array[0].key);
  });

  it('should return an array ordered by stringId, order given', () => {
    const array = TestTypesReferenceDataMock.TestTypesData;
    const sortedArray = array.sort(commonFunctionsService.orderByStringId('id', 'asc'));
    expect(sortedArray[0].id).toMatch('1');
  });

  it('should return an array ordered by stringId, order not given', () => {
    const array = TestTypesReferenceDataMock.TestTypesData;
    const sortedArray = array.sort(commonFunctionsService.orderByStringId('id'));
    expect(sortedArray[0].id).toMatch('1');
  });

  it('should return array in same order', () => {
    const array = TestTypesReferenceDataMock.TestTypesData;
    const sortedArray = array.sort(commonFunctionsService.orderByStringId('some'));
    expect(sortedArray[0].id).toMatch(array[0].id);
  });

  it('should return an array ordered by stringId, order given', () => {
    const array = TestTypesReferenceDataMock.TestTypesData;
    const sortedArray = array.sort(commonFunctionsService.orderByStringId('id', 'desc'));
    expect(sortedArray[0].id).toMatch('5');
  });

  it('should make a clone of an given object', () => {
    const object = {
      name: 'John Doe',
      age: 30
    };
    const objectClone = commonFunctionsService.cloneObject(object);
    objectClone.name = 'Ghita';
    expect(object.name).toMatch('John Doe');
  });

  it('should group elements of an array by given property', () => {
    const array = CountryOfRegistrationData.CountryData;
    const sortedArr = array.sort(commonFunctionsService.orderBy('value', 'asc'));
    const groupedArray = commonFunctionsService.groupArrayAlphabetically(sortedArr, 'value');
    expect(groupedArray[0][0].value).toMatch('Alderney - GBA');
  });

  it('should return the intersection of n arrays', () => {
    const someArray = [['2', '39', '40'], ['43', '2'], ['2']];
    expect(commonFunctionsService.intersection(someArray)[0]).toBe('2');
  });

  it('should order the dates of each test type if testTypeArray is not empty', () => {
    const testTypeArray = TestTypeArrayDataMock.TestTypeArrayData;
    commonFunctionsService.orderTestTypeArrayByDate(testTypeArray);
    const firstDate = +new Date(testTypeArray[0].testTypeStartTimestamp);
    const nextDate = +new Date(testTypeArray[1].testTypeStartTimestamp);
    expect(firstDate).toBeGreaterThan(nextDate);
  });

  it('should not order the dates if testTypeArray is empty', () => {
    const testTypeArray = [];
    commonFunctionsService.orderTestTypeArrayByDate(testTypeArray);
    expect(testTypeArray.length).toBeFalsy();
  });

  it('should getCountryStringToBeDisplayed', () => {
    const vehicle = VehicleDataMock.VehicleData;
    expect(commonFunctionsService.getCountryStringToBeDisplayed(vehicle)).toEqual(
      'Great Britain and Northern Ireland'
    );
  });

  describe('getObfuscatedTesterOid', () => {
    it('should return empty string if no testerOid', () => {
      const result = commonFunctionsService.getObfuscatedTesterOid('');
      expect(result).toEqual('');
    });

    it('should return obfuscated testerOid if valid', () => {
      const testerOid = '562b3b3a-1a87-41fd-9dd1-9d65c344e554';
      const expectedOid = '562b3b3a-****-****-****-9d65c344e554';

      const result = commonFunctionsService.getObfuscatedTesterOid(testerOid);
      expect(result).toEqual(expectedOid);
    });

    it('should return empty string if testerOid is not valid', () => {
      const testerOid = '562b3b3a-41fd-9dd1-9d65c344e554';
      const result = commonFunctionsService.getObfuscatedTesterOid(testerOid);
      expect(result).toEqual('');
    });
  });
});
