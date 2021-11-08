import { TestModel } from '@models/tests/test.model';

export class TestDataModelMock {
  public static get TestData(): TestModel {
    return {
      startTime: null,
      endTime: null,
      status: null,
      reasonForCancellation: '',
      vehicles: []
    };
  }
}
