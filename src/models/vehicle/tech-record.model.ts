export interface VehicleTechRecordModel {
  systemNumber: string;
  vrms: VrmModel[];
  vin: string;
  techRecord: TechRecordModel[];
  /* -------- ONLY FOR TRL -------- */
  trailerId?: string;
}

export interface TechRecordModel {
  bodyType: BodyTypeModel;
  manufactureYear: number;
  regnDate: string;
  ntaNumber: string;
  conversionRefNo: string;
  speedLimiterMrk: boolean;
  tachoExemptMrk: boolean;
  reasonForCreation: string;
  statusCode: string;
  grossKerbWeight: number;
  grossLadenWeight: number;
  noOfAxles: number;
  brakeCode: string;
  vehicleType: string;
  euVehicleCategory: string;
  axles: AxelsModel[];
  vehicleClass: VehicleClassModel;
  vehicleSubclass: string[];
  vehicleConfiguration: string;
  recordCompleteness?: string;
  /* -------- ONLY FOR PSV -------- */
  chassisMake?: string;
  chassisModel?: string;
  bodyMake?: string;
  bodyModel?: string;
  vehicleSize?: string;
  coifDate?: string;
  unladenWeight?: number;
  grossGbWeight?: number;
  grossDesignWeight?: number;
  grossUnladenWeight?: number;
  seatsLowerDeck?: number;
  seatsUpperDeck?: number;
  standingCapacity?: number;
  speedRestriction?: number;
  dispensations?: string;
  remarks?: string;
  brakes?: BrakeModel;
  /* -------- ONLY FOR HGV/TRL -------- */
  make?: string;
  model?: string;
  functionCode?: string;
  tyreUseCode?: string;
  roadFriendly?: boolean;
  drawbarCouplingFitted?: boolean;
  dimensions?: Dimensions;
  notes: string;
  adrDetails?: AdrDetails;
  /* -------- ONLY FOR HGV -------- */
  trainGbWeight?: number;
  trainDesignWeight?: number;
  maxTrainGbWeight?: number;
  maxTrainDesignWeight?: number;
  euroStandard?: number;
  frontAxleTo5thWheelMin?: number;
  frontAxleTo5thWheelMax?: number;
  frontAxleTo5thWheelCouplingMin?: number;
  frontAxleTo5thWheelCouplingMax?: number;
  /* -------- ONLY FOR TRL -------- */
  firstUseDate?: string;
  maxLoadOnCoupling?: number;
  suspensionType?: string;
  couplingType?: string;
  frontAxleToRearAxle?: number;
  rearAxleToRearTrl?: number;
  couplingCenterToRearAxleMin?: number;
  couplingCenterToRearAxleMax?: number;
  couplingCenterToRearTrlMin?: number;
  couplingCenterToRearTrlMax?: number;
  /* --- ONLY FOR SPECIAL VEHICLES --- */
  numberOfWheelsDriven?: number;
}

export interface Dimensions {
  length: number;
  width: number;
  /* -------- ONLY FOR TRL -------- */
  axleSpacing: [
    {
      axles: string;
      value: number;
    }
  ];
}

export interface VrmModel {
  vrm: string;
  isPrimary: boolean;
}

export interface BrakeForceWheelModel {
  serviceBrakeForce: number;
  secondaryBrakeForce: number;
  parkingBrakeForce: number;
}

export interface BrakeModel {
  brakeCode?: string;
  dataTrBrakeOne?: string;
  dataTrBrakeTwo?: string;
  dataTrBrakeThree?: string;
  retarderBrakeOne?: string;
  retarderBrakeTwo?: string;
  brakeCodeOriginal?: string;
  brakeForceWheelsNotLocked?: BrakeForceWheelModel;
  brakeForceWheelsUpToHalfLocked?: BrakeForceWheelModel;
  dtpNumber?: string;
  /* -------- ONLY FOR TRL -------- */
  loadSensingValve?: boolean;
  antilockBrakingSystem?: boolean;
}

export interface AxelsModel {
  parkingBrakeMrk?: boolean;
  axleNumber: number;
  weights?: WeightsModel;
  tyres: TyresModel;
  /* -------- ONLY FOR TRL -------- */
  brakes?: AxleBrakePropertiesModel;
}

export interface WeightsModel {
  kerbWeight?: number;
  ladenWeight?: number;
  gbWeight: number;
  designWeight: number;
}

export interface TyresModel {
  tyreSize: string;
  plyRating: string;
  fitmentCode: string;
  dataTrPsvAxles?: number;
  tyreCode: number;
  dataTrAxles?: number;
  /* -------- ONLY FOR PSV -------- */
  speedCategorySymbol?: string;
}

export interface BodyTypeModel {
  code: string;
  description: string;
}

export interface VehicleClassModel {
  code: string;
  description: string;
}

export interface AxleBrakePropertiesModel {
  brakeActuator: number;
  leverLength: number;
  springBrakeParking: boolean;
}

export interface AdrDetails {
  vehicleDetails?: VehicleDetails;
  listStatementApplicable?: boolean;
  batteryListNumber?: string;
  permittedDangerousGoods?: string[];
  additionalExaminerNotes?: string;
  applicantDetails?: ApplicantDetails;
  memosApply?: string[];
  additionalNotes?: AdditionalNotes;
  adrTypeApprovalNo?: string;
  compatibilityGroupJ?: boolean;
  tank?: Tank;
}

export interface VehicleDetails {
  type?: string;
  approvalDate?: string;
}

export interface ApplicantDetails {
  name?: string;
  street?: string;
  town?: string;
  city?: string;
  postcode?: string;
}

export interface AdditionalNotes {
  // eslint-disable-next-line id-blacklist
  number?: string[];
  guidanceNotes?: string[];
}

export interface Tank {
  tankDetails?: TankDetails;
  tankStatement?: TankStatement;
}

export interface TankDetails {
  tankManufacturer?: string;
  tc2Details?: TC2Details;
  tc3Details?: TC3Details[];
  yearOfManufacture?: string;
  tankCode?: string;
  specialProvisions?: string;
  tankManufacturerSerialNo?: string;
  tankTypeAppNo?: string;
}

export interface TankStatement {
  substancesPermitted?: string;
  statement?: string;
  productList?: string;
  productListRefNo?: string;
  productListUnNo?: string[];
}

export interface TC2Details {
  tc2Type?: string;
  tc2IntermediateApprovalNo?: string;
  tc2IntermediateExpiryDate?: string;
}

export interface TC3Details {
  tc3Type?: string;
  tc3PeriodicNumber?: string;
  tc3PeriodicExpiryDate?: string;
}
