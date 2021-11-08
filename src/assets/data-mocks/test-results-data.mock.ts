export class TestResultsDataMock {
  public static get TestResultsData() {
    return [
      {
        testResultId: '123D',
        vrm: 'BQ91YHQ',
        vin: '3456968DFC594S',
        testStationName: 'Test Station Name',
        testStationPNumber: 'P12345678',
        testStationType: 'ATF',
        testerName: 'John Smith',
        testerStaffId: 'ABC123',
        testStartTimestamp: '2019-01-14T10:08:32.586Z',
        testEndTimestamp: '2019-01-14T10:09:32.586Z',
        testStatus: 'submitted',
        reasonForCancellation: '',
        vehicleClass: {
          code: '2',
          description: '(MotorBikes over 200cc or with a sidecar)'
        },
        vehicleType: 'PSV',
        numberOfSeats: 10,
        vehicleConfiguration: 'rigid',
        odometerReading: 400,
        odometerReadingUnits: 'kilometres',
        preparerId: 'QWE123',
        preparerName: 'Tom Jones',
        euVehicleCategory: 'M1',
        countryOfRegistration: 'UK',
        testTypes: [
          {
            createdAt: '2019-01-14T10:08:32.586Z',
            lastUpdatedAt: '2019-01-14T10:08:32.586Z',
            testCode: 'AB12',
            testTypeName: 'Paid retest with Class 6A seatbelt installation check',
            testTypeId: 'H23',
            certificateNumber: '23596FHG45',
            testExpiryDate: '2020-01-14',
            testTypeStartTimestamp: '2019-01-14T10:09:12.586Z',
            testTypeEndTimestamp: '2019-01-14T10:10:32.586Z',
            numberOfSeatbeltsFitted: 4,
            lastSeatbeltInstallationCheckDate: '2019-01-14',
            seatbeltInstallationCheckDate: true,
            testResult: 'Fail',
            prohibitionIssued: 'Yes',
            reasonForAbandoning: '',
            additionalCommentsForAbandon: 'Notes about the why the test was abandoned',
            additionalNotesRecorded: 'Additional notes recorded',
            reasons: [],
            defects: [
              {
                ref: '1.1.a',
                deficiencyCategory: 'major',
                deficiencyId: 'a',
                deficiencyText: 'missing.',
                metadata: {
                  category: {
                    imNumber: 1,
                    imDescription: 'Registration Plate',
                    additionalInfo: {
                      location: {
                        axleNumber: null,
                        horizontal: null,
                        vertical: null,
                        longitudinal: ['front', 'rear'],
                        rowNumber: null,
                        lateral: null,
                        seatNumber: null
                      },
                      notes: false
                    }
                  },
                  item: { itemNumber: 1, itemDescription: 'A registration plate:' }
                },
                prs: false,
                notes: '',
                location: {
                  vertical: '',
                  horizontal: '',
                  lateral: '',
                  longitudinal: 'front',
                  rowNumber: null,
                  seatNumber: null,
                  axleNumber: null
                }
              },
              {
                ref: '1.2',
                deficiencyCategory: 'advisory',
                deficiencyId: null,
                deficiencyText: '',
                metadata: {
                  category: {
                    imNumber: 1,
                    imDescription: 'Registration Plate',
                    additionalInfo: null
                  },
                  item: { itemNumber: 2, itemDescription: 'A registration mark:' }
                },
                prs: null,
                notes: 'test',
                location: null
              }
            ]
          },
          {
            createdAt: '2020-01-14T10:08:32.586Z',
            lastUpdatedAt: '2020-01-14T10:08:32.586Z',
            testCode: 'AB23',
            testTypeName: 'Paid prohibition clearance (retest without certificate)',
            testTypeId: 'H24',
            certificateNumber: '23596FHG45',
            testExpiryDate: '2021-01-14',
            testTypeStartTimestamp: '2019-01-14T10:09:12.586Z',
            testTypeEndTimestamp: '2019-01-14T10:10:32.586Z',
            numberOfSeatbeltsFitted: 4,
            lastSeatbeltInstallationCheckDate: '2019-01-14',
            seatbeltInstallationCheckDate: true,
            testResult: 'pass',
            prohibitionIssued: 'Yes',
            reasonForAbandoning: '',
            reasons: [],
            additionalNotesRecorded: 'Additional notes recorded',
            defects: [
              {
                imNumber: 3,
                imDescription: 'IM description',
                forVehicleType: ['psv'],
                additionalInformation: {
                  location: {
                    vertical: 'upper',
                    horizontal: 'inner',
                    lateral: 'nearside',
                    longitudinal: 'front',
                    rowNumber: 3,
                    seatNumber: 6,
                    axleNumber: 4
                  },
                  notes: 'Additional notes about defect'
                },
                item: {
                  itemNumber: 3,
                  itemDescription: 'Item description',
                  forVehicleType: ['psv'],
                  deficiency: {
                    ref: '3.3 D',
                    deficiencyId: 'D',
                    deficiencySubId: 'ii',
                    deficiencyCategory: 'advisory',
                    deficiencyText: 'Text about deficiency',
                    stdForProhibition: true,
                    prs: true,
                    forVehicleType: ['psv']
                  }
                }
              },
              {
                imNumber: 4,
                imDescription: 'IM description',
                forVehicleType: ['psv'],
                additionalInformation: {
                  location: {
                    vertical: 'upper',
                    horizontal: 'inner',
                    lateral: 'nearside',
                    longitudinal: 'front',
                    rowNumber: 4,
                    seatNumber: 2,
                    axleNumber: 7
                  },
                  notes: 'Additional notes about defect'
                },
                item: {
                  itemNumber: 3,
                  itemDescription: 'Item description',
                  forVehicleType: ['psv'],
                  deficiency: {
                    ref: '3.3 D',
                    deficiencyId: 'D',
                    deficiencySubId: 'ii',
                    deficiencyCategory: 'major',
                    deficiencyText: 'Text about deficiency',
                    stdForProhibition: true,
                    prs: false,
                    forVehicleType: ['psv']
                  }
                }
              }
            ]
          }
        ]
      }
    ];
  }
}
