export class VehicleLookupSearchCriteriaData {
  public static get DefaultVehicleLookupSearchCriteria() {
    return 'Registration number, VIN or trailer ID';
  }

  public static get DefaultVehicleLookupSearchCriteriaTrailersOnly() {
    return 'Trailer ID or VIN';
  }

  public static get VehicleLookupSearchCriteria() {
    return [
      'Registration number, VIN or trailer ID',
      'Registration number',
      'Full VIN',
      'Partial VIN (last 6 characters)',
      'Trailer ID'
    ];
  }

  public static get VehicleLookupSearchCriteriaTrailersOnly() {
    return ['Trailer ID or VIN', 'Full VIN', 'Partial VIN (last 6 characters)', 'Trailer ID'];
  }

  public static get VehicleLookupQueryParameters() {
    return [
      {
        text: 'Registration number, VIN or trailer ID',
        queryParam: 'all'
      },
      {
        text: 'Trailer ID or VIN',
        queryParam: 'all'
      },
      {
        text: 'Registration number',
        queryParam: 'vrm'
      },
      {
        text: 'Full VIN',
        queryParam: 'vin'
      },
      {
        text: 'Partial VIN (last 6 characters)',
        queryParam: 'partialVin'
      },
      {
        text: 'Trailer ID',
        queryParam: 'trailerId'
      }
    ];
  }
}
