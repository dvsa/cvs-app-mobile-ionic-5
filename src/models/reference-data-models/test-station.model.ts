import { TEST_STATION_TYPE } from '@app/app.enums';

export interface TestStationReferenceDataModel {
  testStationId: string;
  testStationPNumber: string;
  testStationName: string;
  testStationContactNumber: string;
  testStationAccessNotes: string;
  testStationGeneralNotes: string;
  testStationTown: string;
  testStationAddress: string;
  testStationPostcode: string;
  testStationLongitude: number;
  testStationLatitude: number;
  testStationType: string | TEST_STATION_TYPE;
  testStationEmails: string[];
  searchProperty?: string;
}
