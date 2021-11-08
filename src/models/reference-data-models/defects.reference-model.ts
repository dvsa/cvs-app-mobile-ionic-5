import { DEFICIENCY_CATEGORY, VEHICLE_TYPE } from '@app/app.enums';

export interface DefectCategoryReferenceDataModel {
  imNumber: number;
  imDescription: string;
  forVehicleType: string[] | VEHICLE_TYPE;
  additionalInfo: AdditionalInfoModel;
  items: DefectItemReferenceDataModel[];
}

export interface DefectItemReferenceDataModel {
  itemNumber: number;
  itemDescription: string;
  forVehicleType: string[] | VEHICLE_TYPE;
  deficiencies: DefectDeficiencyReferenceDataModel[];
}

export interface DefectDeficiencyReferenceDataModel {
  ref: string;
  deficiencyId: string | null;
  deficiencySubId: string | null;
  deficiencyCategory: string | DEFICIENCY_CATEGORY;
  deficiencyText: string;
  stdForProhibition: boolean;
  forVehicleType: string[] | VEHICLE_TYPE;
}

export interface AdditionalInfoModel {
  psv: {
    location?: LocationMetadataModel;
    notes?: boolean;
  };
  hgv: {
    location?: LocationMetadataModel;
    notes?: boolean;
  };
  trl: {
    location?: LocationMetadataModel;
    notes?: boolean;
  };
}

export interface LocationMetadataModel {
  vertical?: string[] | null;
  horizontal?: string[] | null;
  lateral?: string[] | null;
  longitudinal?: string[] | null;
  rowNumber?: number[] | null;
  seatNumber?: number[] | null;
  axleNumber?: number[] | null;
}
