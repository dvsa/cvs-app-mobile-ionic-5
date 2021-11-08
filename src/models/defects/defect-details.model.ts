import { LocationMetadataModel } from '../reference-data-models/defects.reference-model';

export interface DefectDetailsModel {
  imNumber: number;
  imDescription: string;
  additionalInformation: DefectAdditionalInformationModel;
  itemNumber: number;
  itemDescription: string;
  deficiencyRef: string;
  deficiencyId: string | null;
  deficiencySubId: string | null;
  deficiencyCategory: string;
  deficiencyText: string | null;
  stdForProhibition: boolean | null;
  prs: boolean | null;
  prohibitionIssued: boolean | null;
  /* -------- ONLY FOR FE -------- */
  metadata: DefectsMetadataModel;
}

export interface DefectAdditionalInformationModel {
  location: DefectLocationModel;
  notes: string;
}

export interface DefectsMetadataModel {
  category: {
    additionalInfo?: AdditionalInfoMetadataModel;
  };
}

export interface AdditionalInfoMetadataModel {
  location: LocationMetadataModel;
  notes: boolean;
}

export interface DefectLocationModel {
  vertical?: string | null;
  horizontal?: string | null;
  lateral?: string | null;
  longitudinal?: string | null;
  rowNumber?: number | null;
  seatNumber?: number | null;
  axleNumber?: number | null;
}

export interface SpecialistCustomDefectModel {
  referenceNumber: string;
  defectName: string;
  defectNotes: string;
  /* -------- ONLY FOR FE -------- */
  hasAllMandatoryFields?: boolean;
}
