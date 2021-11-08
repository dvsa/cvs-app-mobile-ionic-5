import { VehicleModel } from '@models/vehicle/vehicle.model';

export class VehicleDataMock {
  public static get VehicleData(): VehicleModel {
    return {
      systemNumber: '10000000',
      vrm: 'BQ91YHQ',
      vin: '1B7GG36N12S678410',
      techRecord: {
        chassisMake: 'Volvo',
        chassisModel: 'Model',
        bodyMake: 'Sport',
        bodyModel: 'blanao',
        bodyType: {
          code: 'a',
          description: 'articulated'
        },
        manufactureYear: 1989,
        regnDate: '2018-12-19',
        coifDate: '2018-12-19',
        ntaNumber: '1234',
        conversionRefNo: 'stringao',
        seatsLowerDeck: 1,
        seatsUpperDeck: 2,
        standingCapacity: 0,
        speedRestriction: 100,
        speedLimiterMrk: true,
        tachoExemptMrk: true,
        dispensations: 'dsps',
        remarks: 'Thank you, Kanye, very cool',
        reasonForCreation: 'this car is very cool',
        statusCode: 'current',
        unladenWeight: 0,
        grossKerbWeight: 0,
        grossLadenWeight: 0,
        grossGbWeight: 0,
        grossDesignWeight: 0,
        grossUnladenWeight: 0,
        noOfAxles: 0,
        numberOfWheelsDriven: 0,
        vehicleSubclass: null,
        brakeCode: 'string',
        vehicleClass: {
          code: 's',
          description: 'single decker'
        },
        vehicleType: 'psv',
        euVehicleCategory: 'm1',
        vehicleSize: 'large',
        vehicleConfiguration: 'articulated',
        brakes: {
          brakeCode: 'brkCode',
          brakeCodeOriginal: '123',
          dataTrBrakeOne: 'random',
          dataTrBrakeTwo: 'string',
          dataTrBrakeThree: 'here',
          retarderBrakeOne: 'electric',
          retarderBrakeTwo: 'electric',
          brakeForceWheelsNotLocked: {
            serviceBrakeForce: 0,
            secondaryBrakeForce: 0,
            parkingBrakeForce: 0
          },
          brakeForceWheelsUpToHalfLocked: {
            serviceBrakeForce: 0,
            secondaryBrakeForce: 0,
            parkingBrakeForce: 0
          }
        },
        axles: [
          {
            axleNumber: 0,
            parkingBrakeMrk: false,
            weights: {
              kerbWeight: 0,
              ladenWeight: 0,
              gbWeight: 0,
              designWeight: 0
            },
            tyres: {
              tyreSize: 'big',
              plyRating: '10/10',
              fitmentCode: 'double',
              dataTrPsvAxles: 0,
              speedCategorySymbol: 'a7',
              tyreCode: 0
            }
          }
        ],
        notes: ''
      },
      testResultsHistory: [],
      countryOfRegistration: 'gb',
      euVehicleCategory: '',
      odometerReading: '',
      odometerMetric: '',
      preparerId: '',
      preparerName: '',
      testTypes: []
    };
  }
}
