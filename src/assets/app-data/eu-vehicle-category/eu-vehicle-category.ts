/* eslint-disable max-len */

export class EuVehicleCategoryData {
  public static get EuCategoryPsvSubtitleData() {
    return 'M - vehicles designed and constructed for the carriage of passengers and comprising:';
  }

  public static get EuCategoryHgvSubtitleData() {
    return 'N - vehicles designed and constructed for the carriage of goods and having a maximum mass:';
  }

  public static get EuCategoryTrlSubtitleData() {
    return 'O - trailers (including semi-trailers) with a maximum mass:';
  }

  public static get EuCategoryCarSubtitleData() {
    return EuVehicleCategoryData.EuCategoryPsvSubtitleData;
  }

  public static get EuCategoryLgvSubtitleData() {
    return EuVehicleCategoryData.EuCategoryHgvSubtitleData;
  }

  public static get EuCategoryMotorcycleSubtitleData() {
    return 'L - 2 and 3-wheel vehicles and quadricycles.';
  }

  public static get EuCategoryPsvData() {
    return [
      {
        key: 'm2',
        value:
          'more than eight seats in addition to the driver\'s seat, and having a maximum mass not exceeding 5 tonnes'
      },
      {
        key: 'm3',
        value:
          'more than eight seats in addition to the driver\'s seat, and having a maximum mass exceeding 5 tonnes'
      }
    ];
  }

  public static get EuCategoryHgvData() {
    return [
      {
        key: 'n2',
        value: 'exceeding 3.5 tonnes but not exceeding 12 tonnes'
      },
      {
        key: 'n3',
        value: 'exceeding 12 tonnes'
      }
    ];
  }

  public static get EuCategoryTrlData() {
    return [
      {
        key: 'o1',
        value: 'not exceeding 0.75 tonnes'
      },
      {
        key: 'o2',
        value: 'exceeding 0.75 tonnes but not exceeding 3.5 tonnes'
      },
      {
        key: 'o3',
        value: 'exceeding 3.5 tonnes but not exceeding 10 tonnes'
      },
      {
        key: 'o4',
        value: 'exceeding 10 tonnes'
      }
    ];
  }

  public static get EuCategoryCarData() {
    return [
      {
        key: 'm1',
        value: 'no more than eight seats in addition to the driver\'s seat'
      }
    ];
  }

  public static get EuCategoryLgvData() {
    return [
      {
        key: 'n1',
        value: 'not exceeding 3.5 tonnes'
      }
    ];
  }

  public static get EuCategoryMotorcycleData() {
    return [
      {
        key: 'l1e-a',
        value: 'Low Powered Moped'
      },
      {
        key: 'l1e',
        value:
          'Two-wheel vehicle with a maximum design speed of not more than 45 km/h and characterised by an engine whose cylinder capacity does not exceed 50 cm3 in the case of the internal combustion type, or maximum continuous rated power is no more than 4 kW in the case of an electric motor'
      },
      {
        key: 'l2e',
        value:
          'Three-wheel vehicle with a maximum design speed of not more than 45 km/h and characterised by an engine whose cylinder capacity does not exceed 50 cm3 if of the spark (positive) ignition type, or maximum net power output does not exceed 4 kW in the case of other internal combustion engines, or maximum continuous rated power does not exceed 4 kW in the case of an electric motor'
      },
      {
        key: 'l3e',
        value:
          'Two-wheel vehicle without a sidecar fitted with an engine having a cylinder capacity of more than 50 cm3 if of the internal combustion type and/or having a maximum design speed of more than 45 km/h'
      },
      {
        key: 'l4e',
        value:
          'Two-wheel vehicle with a sidecar fitted with an engine having a cylinder capacity of more than 50 cm3 if of the internal combustion type and/or having a maximum design speed of more than 45 km/h'
      },
      {
        key: 'l5e',
        value:
          'Vehicle with three symmetrically arranged wheels fitted with an engine having a cylinder capacity of more than 50 cm3 if of the internal combustion type and/or a maximum design speed of more than 45 km/h'
      },
      {
        key: 'l6e',
        value:
          'Quadricycle whose unladen mass is not more than 350 kg, not including the mass of the batteries in case of electric vehicles, whose maximum design speed is not more than 45 km/h, and whose engine cylinder capacity does not exceed 50 cm3 for spark (positive) ignition engines, or maximum net power output does not exceed 4 kW in the case of other internal combustion engines, or maximum continuous rated power does not exceed 4 kW in the case of an electric motor. This vehicle shall fulfill the technical requirements applicable to three-wheel mopeds of category L2e unless specified differently'
      },
      {
        key: 'l7e',
        value:
          'Quadricycle other than those referred to in category L6e, whose unladen mass is not more than 400 kg (550 kg for vehicles intended for carrying goods), not including the mass of batteries in the case of electric vehicles, and whose maximum net engine power does not exceed 15 kW. These vehicles shall be considered to be motor tricycles and shall fulfill the technical requirements applicable to motor tricycles of category L5e unless specified differently'
      }
    ];
  }
}
