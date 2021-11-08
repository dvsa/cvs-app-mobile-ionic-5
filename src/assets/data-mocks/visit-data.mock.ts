export class VisitDataMock {
  public static get VisitTestData() {
    return VisitDataMock.VisitData.tests[0];
  }

  public static get VisitTestDataArray() {
    const testArr = [];
    for (let i = 0; i < 5; i++) {
      testArr[i] = VisitDataMock.VisitData.tests[0];
    }
    return testArr;
  }

  public static get VisitTestTypeData() {
    return VisitDataMock.VisitData.tests[0].vehicles[0].testTypes[0];
  }

  public static get VisitData(): any {
    return {
      id: '11',
      startTime: '2019-02-12T11:41:54.833Z',
      endTime: null,
      testStationName: 'Abshire-Kub',
      testStationPNumber: '09-4129632',
      testStationType: 'gvts',
      testStationEmail: 'someEmail@mail.com',
      testerId: '',
      testerName: '',
      testerEmail: '',
      tests: [
        {
          startTime: '2019-02-12T11:41:56.409Z',
          endTime: '2019-02-14T10:10:32.586Z',
          status: null,
          reasonForCancellation: '',
          vehicles: [
            {
              vrm: 'BQ91YHQ',
              vin: '1B7GG36N12S678410',
              techRecord: {
                bodyType: 'single Decker',
                grossKerbWeight: 13315,
                grossUnladenWeight: null,
                brakeCode: '171202',
                coifDate: '2010-12-20',
                seatsUpperDeck: 0,
                standingCapacity: 0,
                brakes: {
                  brakeCodeOriginal: '123',
                  brakeCode: '171202',
                  retarderBrakeOne: 'exhaust',
                  brakeForceWheelsNotLocked: {
                    parkingBrakeForceA: 2742,
                    serviceBrakeForceA: 7713,
                    secondaryBrakeForceA: 3857
                  },
                  dataTrBrakeTwo: 'None',
                  retarderBrakeTwo: 'exhaust',
                  dataTrBrakeOne: 'None',
                  dataTrBrakeThree: 'None',
                  brakeForceWheelsUpToHalfLocked: {
                    secondaryBrakeForceB: 3329,
                    parkingBrakeForceB: 2130,
                    serviceBrakeForceB: 6658
                  }
                },
                bodyModel: 'Tourismo',
                bodyMake: 'Plaxton',
                conversionRefNo: '2',
                grossLadenWeight: 17140,
                axles: [
                  {
                    axleNumber: 1,
                    parkingBrakeMrk: null,
                    weights: {
                      kerbWeight: 5018,
                      gbWeight: 7100,
                      ladenWeight: 7100,
                      designWeight: 7100
                    },
                    tyres: {
                      tyreSize: '295/80-22.5',
                      speedCategorySymbol: 'J',
                      fitmentCode: 'single',
                      dataTrAxles: 0,
                      plyRating: 'A',
                      tyreCode: 456
                    }
                  },
                  {
                    axleNumber: 2,
                    weights: {
                      kerbWeight: 8297,
                      gbWeight: 11500,
                      ladenWeight: 11500,
                      designWeight: 12600
                    },
                    tyres: {
                      tyreSize: '295/80-22.5',
                      speedCategorySymbol: 'J',
                      fitmentCode: 'double',
                      dataTrAxles: 0,
                      plyRating: 'A',
                      tyreCode: 456
                    }
                  }
                ],
                chassisModel: '632,01',
                grossGbWeight: 18000,
                dispensations: 'None',
                manufactureDate: 2010,
                vehicleClass: {
                  code: 'S',
                  description: ''
                },
                chassisMake: 'Mercedes',
                vehicleSize: 'small',
                noOfAxles: 2,
                grossDesignWeight: 19000,
                vehicleType: 'PSV',
                speedLimiterMrk: false,
                vehicleConfiguration: 'rigid',
                regnDate: '2011-01-05',
                seatsLowerDeck: 50,
                tachoExemptMrk: false,
                unladenWeight: 0,
                ntaNumber: '7',
                reasonForCreation: 'COIF',
                speedRestriction: 0,
                remarks: 'None',
                statusCode: 'current'
              },
              testResultsHistory: [],
              countryOfRegistration: 'gb',
              euVehicleCategory: 'm2',
              odometerReading: '623',
              odometerMetric: 'kilometres',
              preparerId: 'AK4434',
              preparerName: 'Durrell Vehicles Limited',
              testTypes: [
                {
                  name: 'Annual test',
                  testTypeName: 'Annual test',
                  testTypeId: '1',
                  certificateNumber: '',
                  testExpiryDate: '',
                  testTypeStartTimestamp: '2019-02-12T11:42:19.008Z',
                  testTypeEndTimestamp: '',
                  numberOfSeatbeltsFitted: 3,
                  lastSeatbeltInstallationCheckDate: '2019-02-12',
                  seatbeltInstallationCheckDate: false,
                  testResult: 'pass',
                  prohibitionIssued: null,
                  reasonForAbandoning: '',
                  reasons: [],
                  additionalCommentsForAbandon: '',
                  additionalNotesRecorded: 'n jjlkl',
                  defects: [
                    {
                      deficiencyRef: '54.1.d.i',
                      deficiencyCategory: 'minor',
                      deficiencyId: 'd',
                      deficiencyText: 'reservoir is below minimum level.',
                      imNumber: 54,
                      imDescription: 'Steering',
                      itemNumber: 1,
                      itemDescription: 'Power steering:',
                      additionalInformation: {
                        notes: '',
                        location: {
                          vertical: '',
                          horizontal: '',
                          lateral: '',
                          longitudinal: '',
                          rowNumber: null,
                          seatNumber: null,
                          axleNumber: null
                        }
                      },
                      metadata: {
                        category: {
                          additionalInfo: {
                            location: {
                              axleNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                              horizontal: ['inner', 'outer'],
                              vertical: null,
                              longitudinal: null,
                              rowNumber: null,
                              lateral: ['nearside', 'offside', 'centre'],
                              seatNumber: null
                            },
                            notes: true
                          }
                        }
                      },
                      prs: true
                    }
                  ],
                  testTypeCategoryName: 'Annual test',
                  completionStatus: 'edit'
                },
                {
                  name: 'LEC',
                  testTypeName: 'Low Emissions Certificate (LEC) with annual test',
                  testTypeId: '39',
                  certificateNumber: '78348',
                  testExpiryDate: '',
                  testTypeStartTimestamp: '2019-02-12T11:43:07.963Z',
                  testTypeEndTimestamp: '',
                  numberOfSeatbeltsFitted: null,
                  lastSeatbeltInstallationCheckDate: '',
                  seatbeltInstallationCheckDate: null,
                  testResult: 'pass',
                  prohibitionIssued: null,
                  reasonForAbandoning: '',
                  reasons: [],
                  additionalCommentsForAbandon: '',
                  additionalNotesRecorded: '',
                  defects: [],
                  testTypeCategoryName: 'Technical test',
                  completionStatus: 'edit'
                },
                {
                  name: 'Speed limiter check',
                  testTypeName: 'Voluntary speed limiter check',
                  testTypeId: '34',
                  certificateNumber: '',
                  testExpiryDate: '',
                  testTypeStartTimestamp: '2019-02-12T11:43:23.656Z',
                  testTypeEndTimestamp: '',
                  numberOfSeatbeltsFitted: null,
                  lastSeatbeltInstallationCheckDate: '',
                  seatbeltInstallationCheckDate: null,
                  testResult: 'abandoned',
                  prohibitionIssued: null,
                  reasonForAbandoning: '',
                  reasons: [
                    'The vehicle was not submitted for test at the appointed time',
                    'The relevant test fee has not been paid',
                    'Current Health and Safety legislation cannot be met in testing the vehicle'
                  ],
                  additionalCommentsForAbandon: 'wfdsewweewc',
                  additionalNotesRecorded: '',
                  defects: [],
                  testTypeCategoryName: 'Voluntary test',
                  completionStatus: 'edit'
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
