import { DefectDetailsModel, SpecialistCustomDefectModel } from '../defects/defect-details.model';

export interface TestTypeModel {
  testTypeName: string;
  name: string;
  testTypeId: string;
  certificateNumber: string | null;
  secondaryCertificateNumber: string | null;
  testTypeStartTimestamp: string;
  testTypeEndTimestamp: string | null;
  testResult: string | null;
  prohibitionIssued: boolean | null;
  reasonForAbandoning: string | null;
  additionalNotesRecorded: string | null;
  additionalCommentsForAbandon: string | null;
  numberOfSeatbeltsFitted?: number | null; // PSV
  lastSeatbeltInstallationCheckDate?: string | null; // PSV
  seatbeltInstallationCheckDate?: boolean | null; // PSV
  testExpiryDate?: string;
  modType?: string | { code: string; description: string } | null;
  emissionStandard?: string;
  fuelType?: string;
  modificationTypeUsed?: string;
  smokeTestKLimitApplied?: string;
  particulateTrapFitted?: string;
  particulateTrapSerialNumber?: string;
  defects: DefectDetailsModel[];
  customDefects?: SpecialistCustomDefectModel[];
  /* -------- ONLY FOR FE -------- */
  completionStatus?: string;
  testTypeCategoryName?: string;
  reasons?: string[];
  testNumber?: string;
  linkedIds?: string[] | null;
}
