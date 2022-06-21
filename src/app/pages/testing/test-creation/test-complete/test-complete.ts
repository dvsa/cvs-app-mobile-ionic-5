import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  DefectDetailsModel,
  SpecialistCustomDefectModel
} from '@models/defects/defect-details.model';
import { DefectsService } from '@providers/defects/defects.service';
import {
  ANALYTICS_EVENT_CATEGORIES,
  ANALYTICS_EVENTS,
  ANALYTICS_LABEL,
  ANALYTICS_SCREEN_NAMES,
  APP,
  DEFICIENCY_CATEGORY,
  MOD_TYPES,
  PAGE_NAMES,
  REG_EX_PATTERNS,
  TEST_TYPE_FIELDS,
  TEST_TYPE_INPUTS,
  TEST_TYPE_RESULTS,
  TEST_TYPE_SECTIONS,
  TIR_CERTIFICATE_NUMBER_PREFIXES,
  VEHICLE_TYPE
} from '@app/app.enums';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { TestTypeModel } from '@models/tests/test-type.model';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { VisitService } from '@providers/visit/visit.service';
import { TestTypesFieldsMetadata } from '@assets/app-data/test-types-data/test-types-fields.metadata';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { DefectCategoryReferenceDataModel } from '@models/reference-data-models/defects.reference-model';
import { NotifiableAlterationTestTypesData } from '@assets/app-data/test-types-data/notifiable-alteration-test-types.data';
import { AnalyticsService } from '@providers/global';
import { Router } from '@angular/router';
import { EventsService } from '@providers/events/events.service';
import {
  TestTypeDetailsInputPage
} from '@app/pages/testing/test-creation/test-type-details-input/test-type-details-input';
import {
  DefectDetailsSpecialistTestingPage
} from '@app/pages/testing/defects/defect-details-specialist-testing/defect-details-specialist-testing';

@Component({
  selector: 'page-test-complete',
  styleUrls: ['test-complete.scss'],
  templateUrl: 'test-complete.html'
})
export class TestCompletePage implements OnInit {
  vehicle: VehicleModel;
  vehicleTest: TestTypeModel;
  testTypeDetails;
  testTypeInputs: typeof TEST_TYPE_INPUTS = TEST_TYPE_INPUTS;
  testTypeFields: typeof TEST_TYPE_FIELDS = TEST_TYPE_FIELDS;
  completedFields;
  fromTestReview;
  defectsCategories: DefectCategoryReferenceDataModel[];
  isCertificateNumberFocused: boolean;
  today: string;
  patterns: typeof REG_EX_PATTERNS = REG_EX_PATTERNS;
  changeBackground = false;
  notifiableAlterationTestTypesDataIds: string[] =
    NotifiableAlterationTestTypesData.NotifiableAlterationTestTypesDataIds;
  isNotifiableAlteration: boolean;
  isNotesIncompleteError: boolean;
  TEST_TYPE_RESULTS: typeof TEST_TYPE_RESULTS = TEST_TYPE_RESULTS;
  errorIncomplete: boolean;
  errorIncompleteCertificateNumber: boolean;
  blockTestResultSelection: boolean;
  vehicleTypes: typeof VEHICLE_TYPE = VEHICLE_TYPE;
  tirCertificateNumberPrefixes: typeof TIR_CERTIFICATE_NUMBER_PREFIXES = TIR_CERTIFICATE_NUMBER_PREFIXES;
  previousPageName: string;

  constructor(
    public navCtrl: NavController,
    public visitService: VisitService,
    public defectsService: DefectsService,
    private alertCtrl: AlertController,
    public testTypeService: TestTypeService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private cdRef: ChangeDetectorRef,
    private vehicleService: VehicleService,
    private analyticsService: AnalyticsService,
    public router: Router,
    public navController: NavController,
    public events: EventsService,
  ) {
    this.patterns = REG_EX_PATTERNS;
    this.isCertificateNumberFocused = false;
  }

  ngOnInit(): void {
    this.previousPageName = this.router.getCurrentNavigation().extras.state.previousPageName;
    this.vehicle = this.router.getCurrentNavigation().extras.state.vehicle;
    this.vehicleTest = this.router.getCurrentNavigation().extras.state.vehicleTest;
    this.completedFields = this.router.getCurrentNavigation().extras.state.completedFields;
    this.fromTestReview = this.router.getCurrentNavigation().extras.state.fromTestReview;
    this.errorIncomplete = this.router.getCurrentNavigation().extras.state.errorIncomplete;
    this.today = new Date().toISOString();
    this.testTypeFields = TEST_TYPE_FIELDS;
    this.testTypeDetails = this.getTestTypeDetails();
    this.updateTestType();
    this.getDefects();
    this.validateCertificateNumber();
  }

  getDefects() {
    this.defectsService
      .getDefectsFromStorage()
      .subscribe((defects: DefectCategoryReferenceDataModel[]) => {
        this.defectsCategories = defects;
      });
  }

  validateCertificateNumber() {
    if (this.vehicleTest.numberOfSeatbeltsFitted && this.testTypeDetails.category === 'B') {
      this.errorIncomplete = false;
    }
    if (
      (this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
        this.vehicleTest.certificateNumber &&
        this.vehicleTest.certificateNumber.length &&
        this.vehicleTest.certificateNumber.length < 6 &&
        this.errorIncomplete) ||
      (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
        this.vehicleTest.certificateNumber &&
        this.vehicleTest.certificateNumber.length &&
        this.vehicleTest.certificateNumber.length < 5 &&
        this.errorIncomplete)
    ) {
      this.errorIncompleteCertificateNumber = true;
    }
  }

  ionViewWillEnter() {
    this.isNotesIncompleteError = false;
    this.isNotifiableAlteration =
      this.notifiableAlterationTestTypesDataIds.indexOf(this.vehicleTest.testTypeId) !== -1;
    this.blockTestResultSelection = this.testTypeService.updateLinkedTestResults(
      this.vehicle,
      this.vehicleTest
    );
  }

  async ionViewDidEnter() {
    await this.analyticsService.setCurrentPage(ANALYTICS_SCREEN_NAMES.TEST_TYPE_DETAILS);

    if (this.fromTestReview && this.vehicleTest.testResult === TEST_TYPE_RESULTS.ABANDONED) {
      await this.modalCtrl.dismiss(this.vehicleTest);
    }
  }

  updateTestType() {
    for (const section of this.testTypeDetails.sections) {
      for (const input of section.inputs) {
        if (this.completedFields.hasOwnProperty(input.testTypePropertyName)) {
          this.vehicleTest[input.testTypePropertyName] = this.completedFields[
            input.testTypePropertyName
          ];
        } else {
          if (
            input.defaultValue &&
            input.values &&
            !this.vehicleTest[input.testTypePropertyName]
          ) {
            for (const inputValue of input.values) {
              if (input.defaultValue === inputValue.text) {
                this.completedFields[input.testTypePropertyName] = this.vehicleTest[
                  input.testTypePropertyName
                ] = inputValue.value;
              }
            }
          }
        }
        if (
          this.testTypeDetails.category === 'B' &&
          input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT
        ) {
          this.completedFields[input.testTypePropertyName] = this.vehicleTest[
            input.testTypePropertyName
          ] = true;
        }
      }
    }
  }

  getTestTypeDetails() {
    const testTypesFieldsMetadata = TestTypesFieldsMetadata.FieldsMetadata;
    for (const testTypeFieldMetadata of testTypesFieldsMetadata) {
      if (this.vehicleTest.testTypeId === testTypeFieldMetadata.testTypeId) {
        return testTypeFieldMetadata;
      }
    }
  }

  createDDLButtonHandler(input, inputValue) {
    this.vehicleTest[input.testTypePropertyName] = inputValue;
    if (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT) {
      if (inputValue) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = this.today;
      } else {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = null;
        this.completedFields[TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER
        ] = null;
      }
    }
    if (
      this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
      inputValue === TEST_TYPE_RESULTS.FAIL
    ) {
      this.vehicleTest.certificateNumber = null;
      this.vehicleTest.testExpiryDate = null;
    }
    if (this.testTypeService.isLecTestType(this.vehicleTest.testTypeId)) {
      if (inputValue === TEST_TYPE_RESULTS.FAIL) {
        this.vehicleTest.testExpiryDate = null;
        this.vehicleTest.modType = null;
        this.vehicleTest.emissionStandard = null;
        this.vehicleTest.fuelType = null;
        this.vehicleTest.smokeTestKLimitApplied = null;
        this.vehicleTest.particulateTrapFitted = null;
        this.vehicleTest.particulateTrapSerialNumber = null;
        this.vehicleTest.modificationTypeUsed = null;
      }
      if (inputValue === MOD_TYPES.P.toLowerCase()) {
        this.vehicleTest.modificationTypeUsed = null;
      }
      if (inputValue === MOD_TYPES.G.toLowerCase() || inputValue === MOD_TYPES.M.toLowerCase()) {
        this.vehicleTest.particulateTrapFitted = null;
        this.vehicleTest.particulateTrapSerialNumber = null;
        this.vehicleTest.modificationTypeUsed = null;
      }
    }
    if (
      this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
      inputValue === TEST_TYPE_RESULTS.FAIL
    ) {
      this.vehicleTest.certificateNumber = null;
    }
    if (
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT ||
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER ||
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE
    ) {
      this.completedFields[input.testTypePropertyName] = inputValue;
    }
  }

  createDDLButtons(input) {
    const buttons = [];
    for (const value of input.values) {
      const button = {
        text: value.text,
        cssClass: value.cssClass,
        handler: () => {
          this.createDDLButtonHandler(input, value.value);
        }
      };
      buttons.push(button);
    }
    buttons.push({ text: 'Cancel', role: 'cancel' });
    return buttons;
  }

  async openDDL(input) {
    if (input.testTypePropertyName === 'testResult' && this.blockTestResultSelection) {
      return;
    }
    const ACTION_SHEET = await this.actionSheetCtrl.create({
      header: input.title,
      buttons: this.createDDLButtons(input)
    });
    await ACTION_SHEET.present();
  }

  getDDLValueToDisplay(input) {
    for (const inputValue of input.values) {
      if (
        this.completedFields[input.testTypePropertyName] === inputValue.value ||
        this.vehicleTest[input.testTypePropertyName] === inputValue.value
      ) {
        if (input.testTypePropertyName === TEST_TYPE_INPUTS.MOD_TYPE) {
          return inputValue.text.split(' - ')[0];
        }
        return inputValue.text;
      }
    }
  }

  canDisplaySection(section) {
    // for ADR test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isAdrTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      (section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER ||
        section.inputs[0].type === TEST_TYPE_FIELDS.EXPIRY_DATE)
    ) {
      return false;
    }
    // -----TO HERE-----
    // for LEC test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isLecTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      (section.sectionName === TEST_TYPE_SECTIONS.EXPIRY_DATE ||
        section.sectionName === TEST_TYPE_SECTIONS.EMISSION_DETAILS ||
        section.sectionName === TEST_TYPE_SECTIONS.MODIFICATION)
    ) {
      return false;
    }
    // -----TO HERE-----
    // for TIR test-types
    // -----FROM HERE-----
    if (
      this.testTypeService.isTirTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER_CUSTOM
    ) {
      return false;
    }

    // Specialist Test IVA/Retest and vehicle failed.
    if (
      this.testTypeService.isSpecialistIvaTestAndRetestTestType(this.vehicleTest.testTypeId) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER
    ) {
      return true;
    }

    // -----TO HERE-----
    // for Specialist test-types with certificate number and Notifiable Alteration for PSVs
    // -----FROM HERE-----
    if (
      (this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        this.vehicleTest.testTypeId
      ) ||
        this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
        this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      section.inputs[0].type === TEST_TYPE_FIELDS.CERTIFICATE_NUMBER
    ) {
      return false;
    }
    // -----TO HERE-----
    if (section.dependentOn && section.dependentOn.length) {
      for (const index in section.dependentOn) {
        if (!this.vehicleTest[section.dependentOn[index]]) {
          return false;
        }
      }
    }
    return true;
  }

  canDisplayInput(input) {
    if (
      this.testTypeDetails.category === 'B' &&
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_CARRIED_OUT
    ) {
      return false;
    }
    if (
      this.completedFields[TEST_TYPE_INPUTS.SIC_CARRIED_OUT] &&
      input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_LAST_DATE
    ) {
      if (!this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE]) {
        this.completedFields[TEST_TYPE_INPUTS.SIC_LAST_DATE] = this.vehicleTest[
          TEST_TYPE_INPUTS.SIC_LAST_DATE
        ] = this.today;
      }
      return false;
    }
    if (input.dependentOn && input.dependentOn.length) {
      for (const dep of input.dependentOn) {
        if (
          !this.testTypeService.isSpecialistIvaTestAndRetestTestType(
            this.vehicleTest.testTypeId
          ) &&
          this.vehicleTest[dep.testTypePropertyName] === dep.valueToBeDifferentFrom
        ) {
          return false;
        }
      }
    }
    return true;
  }

  openInputModalDismissHandler(input, data) {
    if (data.inputValue) {
      this.vehicleTest[input.testTypePropertyName] = data.inputValue;
      if (input.testTypePropertyName === TEST_TYPE_INPUTS.SIC_SEATBELTS_NUMBER) {
        this.completedFields[input.testTypePropertyName] = data.inputValue;
      }
    } else {
      this.vehicleTest[input.testTypePropertyName] = null;
    }
    if (data.fromTestReview) {
      this.fromTestReview = data.fromTestReview;
    }
  }

  async openInputPage(section, input) {
    const INPUT_MODAL = await this.modalCtrl.create({
      component: TestTypeDetailsInputPage,
      componentProps: {
        vehicleCategory: this.testTypeDetails.category,
        sectionName: input.title || section.sectionName,
        input,
        existentValue:
          this.completedFields[input.testTypePropertyName] ||
          this.vehicleTest[input.testTypePropertyName] ||
          null,
        fromTestReview: this.fromTestReview,
        errorIncomplete: this.errorIncomplete
      }
    });
    await INPUT_MODAL.present();
    const { data } = await INPUT_MODAL.onDidDismiss();
    if (data) {
      this.openInputModalDismissHandler(input, data);
    };
  }

  onDatetimeChange(value, key) {
    this.cdRef.detectChanges();
    this.vehicleTest[key] = value;
  }

  async onSave() {
    this.isNotesIncompleteError = false;
    if (
      (this.isNotifiableAlteration ||
        this.testTypeService.isLecTestType(this.vehicleTest.testTypeId)) &&
      this.vehicleTest.testResult === TEST_TYPE_RESULTS.FAIL &&
      !this.vehicleTest.additionalNotesRecorded
    ) {
      this.isNotesIncompleteError = true;
      return;
    }
    this.vehicleTest.testResult = this.testTypeService.setTestResult(
      this.vehicleTest,
      this.testTypeDetails.hasDefects
    );
    await this.visitService.updateVisit();
    this.events.publish(APP.TEST_TYPES_UPDATE_COMPLETED_FIELDS, this.completedFields);
    if (this.fromTestReview) {
      await this.modalCtrl.dismiss(this.vehicleTest);
    } else {
      await this.navController.navigateBack(this.previousPageName);
    }
  }

  async addDefect(): Promise<void> {
    await this.router.navigate([PAGE_NAMES.ADD_DEFECT_CATEGORY_PAGE], {
      state: {
        vehicleType: this.vehicle.techRecord.vehicleType,
        vehicleTest: this.vehicleTest,
        defects: this.defectsCategories,
        fromTestReview: this.fromTestReview
      }
    });
  }

  async openDefect(defect: DefectDetailsModel): Promise<void> {
    if (defect.deficiencyCategory.toLowerCase() !== DEFICIENCY_CATEGORY.ADVISORY.toLowerCase()) {
      await this.router.navigate([PAGE_NAMES.DEFECT_DETAILS_PAGE], {
        state: {
          vehicleTest: this.vehicleTest,
          deficiency: defect,
          isEdit: true,
          fromTestReview: this.fromTestReview
        }
      });
    } else {
      await this.router.navigate([PAGE_NAMES.ADVISORY_DETAILS_PAGE], {
        state: {
          vehicleTest: this.vehicleTest,
          advisory: defect,
          isEdit: true
        }
      });
    }
  }

  public convertToNumber(event): number {
    return +event;
  }

  async showAlert(item, defect, specialistCustomDefectIndex?: number) {
    const confirm = await this.alertCtrl.create({
      header: 'Remove defect',
      message: 'This action will remove this defect.',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            item.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            if (this.testTypeService.isSpecialistTestType(this.vehicleTest.testTypeId)) {
              this.removeSpecialistCustomDefect(specialistCustomDefectIndex);
            } else {
              this.removeDefect(defect);
            }
          }
        }
      ]
    });
    await confirm.present();
  }

  async onRemoveTestType(vehicle, vehicleTest) {
    this.changeBackground = true;
    const confirm = await this.alertCtrl.create({
      header: 'Remove test type',
      message: 'This action will remove this test type from the vehicle.',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Remove',
          handler: () => {
            this.removeTestType(vehicle, vehicleTest);
          }
        }
      ]
    });
    await confirm.present();
    const onDidDismiss = await confirm.onDidDismiss();
    if(onDidDismiss){
      this.changeBackground = false;
    }
  }

  async removeDefect(defect) {
    await this.testTypeService.removeDefect(this.vehicleTest, defect);
  }

  async removeSpecialistCustomDefect(index: number) {
    await this.testTypeService.removeSpecialistCustomDefect(this.vehicleTest, index);
  }

  async removeTestType(vehicle: VehicleModel, vehicleTest: TestTypeModel) {
    await this.analyticsService.logEvent({
      category: ANALYTICS_EVENT_CATEGORIES.TEST_TYPES,
      event: ANALYTICS_EVENTS.REMOVE_TEST_TYPE,
      label: ANALYTICS_LABEL.TEST_TYPE_NAME
    });

    await this.analyticsService.addCustomDimension(
      Object.keys(ANALYTICS_LABEL).indexOf('TEST_TYPE_NAME') + 1,
      this.vehicleTest.testTypeName
    );

    this.vehicleService.removeSicFields(vehicle, this.completedFields);
    await this.vehicleService.removeTestType(vehicle, vehicleTest);
    await this.navController.navigateBack(this.previousPageName);
  }

  async abandonTestType(vehicleType: string, vehicleTest: TestTypeModel) {
    await this.router.navigate([PAGE_NAMES.REASONS_SELECTION_PAGE], {
      state: {
        vehicleTest,
        vehicleType,
        fromTestReview: this.fromTestReview
      },
    });
  }

  certificateNumberInputChange(value) {
    this.cdRef.detectChanges();
    if (this.testTypeService.isTirTestType(this.vehicleTest.testTypeId)) {
      this.vehicleTest.certificateNumber = value.length > 5 ? value.substring(0, 5) : value;
    } else if (
      this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
        this.vehicleTest.testTypeId
      ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
    ) {
      const formattedValue = value.replace(/[^a-zA-Z0-9]/gi, '');
      this.vehicleTest.certificateNumber =
        formattedValue.length > 20 ? formattedValue.substring(0, 20) : formattedValue;
    } else {
      this.vehicleTest.certificateNumber = value.length > 6 ? value.substring(0, 6) : value;
    }
  }

  getTypeForCertificateNumberField(): string {
    return this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
      this.vehicleTest.testTypeId
    ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
      ? 'text'
      : 'number';
  }

  getPatternForCertificateNumberField(): string {
    return this.testTypeService.isSpecialistTestTypesExceptForCoifAndVoluntaryIvaTestAndRetest(
      this.vehicleTest.testTypeId
    ) ||
      this.testTypeService.isSpecialistPartOfCoifTestTypes(this.vehicleTest.testTypeId) ||
      this.testTypeService.isPsvNotifiableAlterationTestType(this.vehicleTest.testTypeId)
      ? ''
      : this.patterns.NUMERIC;
  }

  async toSpecialistDefectDetailsPage(
    isEditMode: boolean,
    defectIndex?: number,
    defect?: SpecialistCustomDefectModel
  ): Promise<void> {
    const MODAL = await this.modalCtrl.create({
      component: DefectDetailsSpecialistTestingPage,
      componentProps: {
        isEdit: isEditMode,
        defectIndex: isEditMode ? defectIndex : null,
        defect: isEditMode ? defect : ({} as SpecialistCustomDefectModel),
        testType: this.vehicleTest,
        errorIncomplete: this.errorIncomplete
      }
    });
    await MODAL.present();
  }
}
