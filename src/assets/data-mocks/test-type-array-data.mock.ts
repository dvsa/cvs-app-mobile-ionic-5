export class TestTypeArrayDataMock {
  public static get TestTypeArrayData() {
    return [
      {
        testIndex: 0,
        testTypeIndex: 1,
        prohibitionIssued: false,
        testCode: 'abc',
        testNumber: '1',
        lastUpdatedAt: '2019-02-22T08:50:16.706Z',
        additionalCommentsForAbandon: 'none',
        numberOfSeatbeltsFitted: 2,
        testTypeEndTimestamp: '2019-01-14T10:36:33.987Z',
        reasonForAbandoning: 'none',
        lastSeatbeltInstallationCheckDate: '2019-01-14',
        createdAt: '2019-02-22T08:50:16.706Z',
        testTypeId: '12',
        testTypeStartTimestamp: '2019-01-14T10:36:33.987Z',
        certificateNumber: '12334',
        secondaryCertificateNumber: null,
        testTypeName: 'Annual test',
        seatbeltInstallationCheckDate: true,
        additionalNotesRecorded: 'VEHICLE FRONT ROW SECOND SEAT HAS MISSING SEATBELT',
        defects: [],
        name: 'Annual test',
        certificateLink: 'url',
        testResult: 'fail'
      },
      {
        testIndex: 0,
        testTypeIndex: 2,
        prohibitionIssued: false,
        testNumber: '1',
        additionalCommentsForAbandon: 'none',
        numberOfSeatbeltsFitted: 2,
        testTypeEndTimestamp: '2019-01-15T10:36:33.987Z',
        reasonForAbandoning: 'none',
        lastSeatbeltInstallationCheckDate: '2019-01-14',
        testExpiryDate: '2020-02-21T08:47:59.749Z',
        testTypeId: '1',
        testTypeStartTimestamp: '2019-01-15T10:36:33.987Z',
        certificateNumber: '1234',
        secondaryCertificateNumber: null,
        testTypeName: 'Annual test',
        seatbeltInstallationCheckDate: true,
        additionalNotesRecorded: 'VEHICLE FRONT REGISTRATION PLATE MISSING',
        defects: [],
        name: 'Annual test',
        testResult: 'pass'
      }
    ];
  }
}
