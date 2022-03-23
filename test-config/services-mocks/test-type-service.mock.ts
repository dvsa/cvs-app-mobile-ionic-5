import { TestTypeModel } from '@models/tests/test-type.model';
import { DefectDetailsModel, SpecialistCustomDefectModel } from '@models/defects/defect-details.model';
import { Observable } from 'rxjs';
import { DEFICIENCY_CATEGORY, TEST_TYPE_RESULTS } from '@app/app.enums';
import { of } from 'rxjs';
import { TestTypesReferenceDataModel } from '@models/reference-data-models/test-types.model';
import { TestTypesReferenceDataMock } from '@assets/data-mocks/reference-data-mocks/test-types.mock';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { AdrTestTypesData } from '@assets/app-data/test-types-data/adr-test-types.data';
import { LecTestTypesData } from '@assets/app-data/test-types-data/lec-test-types.data';
import { TirTestTypesData } from '@assets/app-data/test-types-data/tir-test-types.data';
import { SpecialistTestTypesData } from '@assets/app-data/test-types-data/specialist-test-types.data';
import { NotifiableAlterationTestTypesData } from '@assets/app-data/test-types-data/notifiable-alteration-test-types.data';

export class TestTypeServiceMock {
  createTestType(testType: TestTypesReferenceDataModel): TestTypeModel {
    const newTestType = {} as TestTypeModel;
    newTestType.name = testType.name;
    newTestType.testTypeName = testType.testTypeName;
    newTestType.testTypeId = testType.id;
    newTestType.certificateNumber = '';
    newTestType.testTypeStartTimestamp = new Date().toISOString();
    newTestType.testTypeEndTimestamp = '';
    newTestType.numberOfSeatbeltsFitted = null;
    newTestType.lastSeatbeltInstallationCheckDate = '';
    newTestType.seatbeltInstallationCheckDate = null;
    newTestType.testResult = null;
    newTestType.prohibitionIssued = null;
    newTestType.reasons = [];
    newTestType.reasonForAbandoning = '';
    newTestType.additionalCommentsForAbandon = '';
    newTestType.additionalNotesRecorded = '';
    newTestType.defects = [];
    return newTestType;
  }

  addDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    testType.defects.push(defect);
  }

  endTestType(testType: TestTypeModel) {
    testType.testTypeEndTimestamp = new Date().toISOString();
  }

  removeDefect(testType: TestTypeModel, defect: DefectDetailsModel) {
    const defIdx = testType.defects.map((e) => e.deficiencyRef).indexOf(defect.deficiencyRef);
    testType.defects.splice(defIdx, 1);
  }

  removeSpecialistCustomDefect(testType: TestTypeModel, index: number) {
    testType.customDefects.splice(index, 1);
  }

  getTestTypesFromStorage(): Observable<TestTypesReferenceDataModel[]> {
    return of(TestTypesReferenceDataMock.TestTypesData);
  }

  areSpecialistCustomDefectsCompleted(testType: TestTypeModel): boolean {
    return testType.customDefects.every((defect: SpecialistCustomDefectModel) => defect.hasAllMandatoryFields);
  }

  setTestResult(testType: TestTypeModel): TEST_TYPE_RESULTS {
    let result = TEST_TYPE_RESULTS.PASS;
    const criticalDeficienciesArr: DefectDetailsModel[] = [];
    if (testType.reasons.length) {return TEST_TYPE_RESULTS.ABANDONED;}
    testType.defects.forEach(
      (defect: DefectDetailsModel) => {
        switch (defect.deficiencyCategory.toLowerCase()) {
          case DEFICIENCY_CATEGORY.MAJOR:
          case DEFICIENCY_CATEGORY.DANGEROUS:
            criticalDeficienciesArr.push(defect);
            break;
          case DEFICIENCY_CATEGORY.MINOR:
          case DEFICIENCY_CATEGORY.ADVISORY:
            result = TEST_TYPE_RESULTS.PASS;
            break;
        }
      });
    if (criticalDeficienciesArr.length) {
      const criticalDefStatus = criticalDeficienciesArr.every(
        (defect) => defect.prs
      );
      result = criticalDefStatus ? TEST_TYPE_RESULTS.PRS : TEST_TYPE_RESULTS.FAIL;
    }
    return result;
  }

  orderTestTypesArray(array, key, order?) {
    return array.sort(this.orderByStringId(key, order));
  }

  orderByStringId(key, order: 'asc' | 'desc' = 'asc') {
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
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  updateLinkedTestResults(vehicle: VehicleModel, testType: TestTypeModel) {
    if (testType.testTypeId === '40' && testType.testResult === TEST_TYPE_RESULTS.FAIL) {
      for (const vehicleTestType of vehicle.testTypes) {
        if (AdrTestTypesData.AdrTestTypesDataIds.indexOf(vehicleTestType.testTypeId) !== -1
          && vehicleTestType.testResult !== TEST_TYPE_RESULTS.FAIL) {
          vehicleTestType.testResult = TEST_TYPE_RESULTS.FAIL;
          vehicleTestType.certificateNumber = null;
          vehicleTestType.testExpiryDate = null;
        }
      }
    }
  }

  isAdrTestType(testTypeId: string): boolean {
    return AdrTestTypesData.AdrTestTypesDataIds.indexOf(testTypeId) !== -1;
  }

  isLecTestType(testTypeId: string): boolean {
    return LecTestTypesData.LecTestTypesDataIds.indexOf(testTypeId) !== -1;
  }

  isTirTestType(testTypeId: string): boolean {
    return TirTestTypesData.TirTestTypesDataIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistTestType(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistTestTypesIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistIvaTestAndRetestTestType(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistIvaTestAndRetestTestTypeIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetestIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistPartOfCoifTestTypes(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistPartOfCoifTestTypesIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistCoifWithAnnualTest(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistCoifWithAnnualTestIds.indexOf(testTypeId) !== -1;
  }

  isPsvNotifiableAlterationTestType(testTypeId: string): boolean {
    return NotifiableAlterationTestTypesData.PsvNotifiableAlterationTestTypeDataIds.indexOf(testTypeId) !== -1;
  }

  isSpecialistWithoutCertificateNumberCapturedIds(testTypeId: string): boolean {
    return SpecialistTestTypesData.SpecialistWithoutCertificateNumberCapturedIds.indexOf(testTypeId) !== -1;
  }

  fixDateFormatting(testType: TestTypeModel) {
    // dates already fixed
  }
}
