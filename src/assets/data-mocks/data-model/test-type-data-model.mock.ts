import { TEST_TYPE_RESULTS } from '@app/app.enums';
import { TestTypeModel } from '@models/tests/test-type.model';

export class TestTypeDataModelMock {
  public static get TestTypeData(): TestTypeModel {
    return {
      name: 'annual test',
      testTypeName: 'Annual test',
      testTypeId: '1',
      certificateNumber: null,
      secondaryCertificateNumber: null,
      testTypeStartTimestamp: '2018-12-19T00:00:00.000Z',
      testTypeEndTimestamp: null,
      numberOfSeatbeltsFitted: null,
      lastSeatbeltInstallationCheckDate: null,
      seatbeltInstallationCheckDate: null,
      prohibitionIssued: null,
      additionalNotesRecorded: null,
      testResult: TEST_TYPE_RESULTS.PASS,
      reasonForAbandoning: null,
      additionalCommentsForAbandon: null,
      defects: [],
      customDefects: [],
      reasons: [],
      linkedIds: ['38', '39']
    };
  }
}
