import { VisitModel } from '@models/visit/visit.model';
import { TestModel } from '@models/tests/test.model';
import { VisitDataMock } from '@assets/data-mocks/visit-data.mock';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

export class VisitServiceMock {
  visit: VisitModel = {} as VisitModel;

  public async createVisit(testStation) {
    this.visit.startTime = new Date().toISOString();
    this.visit.endTime = null;
    this.visit.testStationName = testStation.atfName;
    this.visit.testStationPNumber = testStation.atfNumber;
    this.visit.testStationType = testStation.atfType;
    this.visit.testerId = '';
    this.visit.testerName = '';
    this.visit.tests = [];
    await this.updateVisit();
    return this.visit;
  }

  public startVisit(): Observable<any> {
    return of({body: {id: '123'}});
  }

  public endVisit(isError) {
    this.visit.endTime = new Date().toISOString();
    if (isError) {
      return Observable.throw({error: {error: ''}});
    } else {
      return of(true);
    }
  }

  public async addTest(test: TestModel) {
    this.visit.tests.push(test);
    await this.updateVisit();
  }

  public removeTest(testToRemove: TestModel) {
    this.visit.tests.forEach((testReport, index) => {
      if (testReport === testToRemove) {
        this.visit.tests.splice(index, 1);
      }
    });
  }

  public getTests(): TestModel[] {
    return this.visit.tests;
  }

  getLatestTest(): TestModel {
    return VisitDataMock.VisitTestDataArray[VisitDataMock.VisitTestDataArray.length - 1];
  }

  public goToTestCreatePage() {}

  public updateVisit() {
    return new Promise((resolve) => (resolve(true)));
  }
}
