import { TestResultModel } from '@models/tests/test-result.model';

export class TestResultsHistoryDataMock {
  public static get TestResultHistoryData(): TestResultModel[] {
    return [
      {
        systemNumber: '1000000',
        reasonForCancellation: null,
        testerStaffId: '123',
        testerName: 'test',
        euVehicleCategory: 'm1',
        testResultId: '',
        testStationName: 'Abshire-Kub',
        testStationPNumber: '09-4129632',
        testEndTimestamp: '2019-04-18T12:32:41.662Z',
        preparerId: 'No preparer ID given',
        vehicleConfiguration: 'rigid',
        vrm: 'BQ91YHQ',
        testerEmailAddress: 'test',
        vehicleClass: {
          description: 'small psv (ie: less than or equal to 22 seats)',
          code: 's'
        },
        odometerReadingUnits: 'kilometres',
        vehicleSize: 'small',
        testStartTimestamp: '2019-04-18T12:31:55.638Z',
        vehicleType: 'psv',
        odometerReading: 21,
        preparerName: null,
        noOfAxles: 2,
        numberOfWheelsDriven: null,
        testStationType: 'gvts',
        numberOfSeats: 50,
        vin: '1B7GG36N12S678410',
        countryOfRegistration: 'gb',
        testStatus: 'submitted',
        testTypes: [
          {
            prohibitionIssued: false,
            testNumber: '123',
            additionalCommentsForAbandon: null,
            numberOfSeatbeltsFitted: null,
            testTypeEndTimestamp: '2019-04-18T12:32:41.663Z',
            reasonForAbandoning: null,
            lastSeatbeltInstallationCheckDate: null,
            testExpiryDate: '2020-04-17T12:32:49.931Z',
            testTypeId: '1',
            testTypeStartTimestamp: '2019-04-18T12:32:33.365Z',
            certificateNumber: '123',
            secondaryCertificateNumber: null,
            testTypeName: 'Annual test',
            seatbeltInstallationCheckDate: false,
            additionalNotesRecorded: null,
            defects: [],
            name: 'Annual test',
            testResult: 'pass'
          }
        ]
      },
      {
        systemNumber: '1000000',
        reasonForCancellation: null,
        testerStaffId: '123',
        testerName: 'test',
        euVehicleCategory: 'm1',
        testResultId: '',
        testStationName: 'Abshire-Kub',
        testStationPNumber: '09-4129632',
        testEndTimestamp: '2019-01-21T12:36:35.532Z',
        preparerId: 'No preparer ID given',
        vehicleConfiguration: 'rigid',
        vrm: 'BQ91YHQ',
        testerEmailAddress: 'test',
        vehicleClass: {
          description: 'small psv (ie: less than or equal to 22 seats)',
          code: 's'
        },
        odometerReadingUnits: 'kilometres',
        vehicleSize: 'small',
        testStartTimestamp: '2019-01-21T12:36:09.258Z',
        vehicleType: 'psv',
        odometerReading: 12,
        preparerName: null,
        noOfAxles: 2,
        numberOfWheelsDriven: null,
        testStationType: 'gvts',
        numberOfSeats: 50,
        vin: '1B7GG36N12S678410',
        countryOfRegistration: 'gb',
        testStatus: 'submitted',
        testTypes: [
          {
            prohibitionIssued: false,
            testNumber: '123',
            additionalCommentsForAbandon: null,
            numberOfSeatbeltsFitted: null,
            testTypeEndTimestamp: '2019-04-18T12:36:35.533Z',
            reasonForAbandoning: null,
            lastSeatbeltInstallationCheckDate: null,
            testExpiryDate: '2020-04-17T12:36:38.121Z',
            testTypeId: '1',
            testTypeStartTimestamp: '2019-04-18T12:36:28.422Z',
            certificateNumber: '123',
            secondaryCertificateNumber: null,
            testTypeName: 'Annual test',
            seatbeltInstallationCheckDate: false,
            additionalNotesRecorded: null,
            defects: [],
            name: 'Annual test',
            testResult: 'pass'
          }
        ]
      }
    ];
  }
}
