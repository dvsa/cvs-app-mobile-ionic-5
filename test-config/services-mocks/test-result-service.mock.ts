import { TestResultModel } from '@models/tests/test-result.model';
import { TestResultsDataMock } from '@assets/data-mocks/test-results-data.mock';
import { of } from 'rxjs';

export class TestResultServiceMock {
  testResult: TestResultModel = {} as TestResultModel;

  createTestResult() {
    return TestResultsDataMock.TestResultsData[0];
  }

  submitTestResult() {
    return of(TestResultsDataMock.TestResultsData[0]);
  }

}
