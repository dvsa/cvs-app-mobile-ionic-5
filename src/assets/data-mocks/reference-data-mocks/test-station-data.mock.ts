export class TestStationDataMock {
  public static get TestStationData() {
    return [
      {
        testStationId: '123411',
        testStationName: 'An Test Station Name',
        testStationPNumber: '123',
        testStationContactNumber: '321',
        testStationAccessNotes: 'note',
        testStationGeneralNotes: 'gNote',
        testStationTown: 'town',
        testStationAddress: 'An Test Station Address',
        testStationPostcode: '0000',
        testStationLongitude: 1,
        testStationLatitude: 2,
        testStationType: 'gvts',
        testStationEmails: [
          'teststationname@dvsa.gov.uk',
          'teststationname1@dvsa.gov.uk',
          'teststationname2@dvsa.gov.uk'
        ]
      },
      {
        testStationId: '14111',
        testStationName: 'Other ATF Name',
        testStationPNumber: '456',
        testStationContactNumber: '654',
        testStationAccessNotes: 'note1',
        testStationGeneralNotes: 'gNote1',
        testStationTown: 'town1',
        testStationAddress: 'Other ATF Address',
        testStationPostcode: '1111',
        testStationLongitude: 3,
        testStationLatitude: 4,
        testStationType: 'atf',
        testStationEmails: ['teststationname@dvsa.gov.uk']
      },
      {
        testStationId: '124111',
        testStationName: 'That ATF Name',
        testStationPNumber: '789',
        testStationContactNumber: '987',
        testStationAccessNotes: 'note2',
        testStationGeneralNotes: 'gNote2',
        testStationTown: 'town2',
        testStationAddress: 'That ATF Address',
        testStationPostcode: '2222',
        testStationLongitude: 5,
        testStationLatitude: 6,
        testStationType: 'atf',
        testStationEmails: ['teststationname@dvsa.gov.uk']
      },
      {
        testStationId: '124112',
        testStationName: 'ATF without testStationAddress',
        testStationPNumber: '124112',
        testStationContactNumber: '124112',
        testStationAccessNotes: 'note2',
        testStationGeneralNotes: 'gNote2',
        testStationTown: 'town2',
        testStationAddress: null,
        testStationPostcode: '2222',
        testStationLongitude: 5,
        testStationLatitude: 6,
        testStationType: 'atf',
        testStationEmails: ['teststationname@dvsa.gov.uk']
      }
    ];
  }
}
