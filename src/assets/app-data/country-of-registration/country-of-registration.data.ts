export class CountryOfRegistrationData {
  public static get DefaultCountryData() {
    return { key: 'gb', value: 'United Kingdom - GB' };
  }

  public static get CountryData() {
    return [
      { key: 'gb', value: 'Great Britain and Northern Ireland - GB' },
      { key: 'gba', value: 'Alderney - GBA' },
      { key: 'gbg', value: 'Guernsey - GBG' },
      { key: 'gbj', value: 'Jersey - GBJ' },
      { key: 'gbm', value: 'Isle of Man - GBM' },
      { key: 'gbz', value: 'Gibraltar - GBZ' },
      { key: 'a', value: 'Austria - A' },
      { key: 'b', value: 'Belgium - B' },
      { key: 'bih', value: 'Bosnia and Herzegovina - BIH' },
      { key: 'bg', value: 'Bulgaria - BG' },
      { key: 'hr', value: 'Croatia - HR' },
      { key: 'cy', value: 'Cyprus - CY' },
      { key: 'cz', value: 'Czech Republic - CZ' },
      { key: 'dk', value: 'Denmark - DK' },
      { key: 'est', value: 'Estonia - EST' },
      { key: 'fin', value: 'Finland - FIN' },
      { key: 'f', value: 'France - F' },
      { key: 'd', value: 'Germany - D' },
      { key: 'gr', value: 'Greece - GR' },
      { key: 'h', value: 'Hungary - H' },
      { key: 'irl', value: 'Ireland - IRL' },
      { key: 'i', value: 'Italy - I' },
      { key: 'lv', value: 'Latvia - LV' },
      { key: 'lt', value: 'Lithuania - LT' },
      { key: 'l', value: 'Luxembourg - L' },
      { key: 'm', value: 'Malta - M' },
      { key: 'nl', value: 'Netherlands - NL' },
      { key: 'n', value: 'Norway - N' },
      { key: 'pl', value: 'Poland - PL' },
      { key: 'p', value: 'Portugal - P' },
      { key: 'ro', value: 'Romania - RO' },
      { key: 'sk', value: 'Slovakia - SK' },
      { key: 'slo', value: 'Slovenia - SLO' },
      { key: 'e', value: 'Spain - E' },
      { key: 's', value: 'Sweden - S' },
      { key: 'ch', value: 'Switzerland - CH' },
      { key: 'non-eu', value: 'Non EU' },
      { key: 'not-known', value: 'Country Not Known' },
      { key: 'not-applicable', value: 'Not applicable' }
    ];
  }
}
