import { Component, Input, OnInit } from '@angular/core';
import { EuVehicleCategoryData } from '@assets/app-data/eu-vehicle-category/eu-vehicle-category';
import { VehicleModel } from '@models/vehicle/vehicle.model';
import { VisitService } from '@providers/visit/visit.service';
import { VEHICLE_TYPE } from '@app/app.enums';
import { VehicleService } from '@providers/vehicle/vehicle.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'page-eu-vehicle-category',
  templateUrl: 'eu-vehicle-category.html',
  styleUrls: ['eu-vehicle-category.scss']
})
export class EuVehicleCategoryPage implements OnInit {
  @Input() vehicle: VehicleModel;
  @Input() errorIncomplete: boolean;
  vehicleType: string;
  categorySubtitle = '';
  categoriesArr = [];


  constructor(
    private visitService: VisitService,
    private modalCtrl: ModalController,
    private vehicleService: VehicleService,
  ) {}

  ngOnInit(): void {
    if (this.vehicle.euVehicleCategory) {
      this.errorIncomplete = false;
    }
    this.vehicleType = this.vehicle.techRecord.vehicleType;
    this.getSpecificDataBasedOnVehicleType();
  }

  getSpecificDataBasedOnVehicleType() {
    switch (this.vehicleType) {
      case VEHICLE_TYPE.PSV:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryPsvSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryPsvData;
        break;
      case VEHICLE_TYPE.HGV:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryHgvSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryHgvData;
        break;
      case VEHICLE_TYPE.TRL:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryTrlSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryTrlData;
        break;
      case VEHICLE_TYPE.CAR:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryCarSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryCarData;
        break;
      case VEHICLE_TYPE.LGV:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryLgvSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryLgvData;
        break;
      case VEHICLE_TYPE.MOTORCYCLE:
        this.categorySubtitle = EuVehicleCategoryData.EuCategoryMotorcycleSubtitleData;
        this.categoriesArr = EuVehicleCategoryData.EuCategoryMotorcycleData;
        break;
    }
  }

  displayVehicleCategoryKey(key: string): string {
    return this.vehicleService.displayVehicleCategoryKey(key);
  }

  async setVehicleCategory(category) {
    this.vehicle.euVehicleCategory = category;
    await this.visitService.updateVisit();
    this.errorIncomplete = false;
  }

  async onSave() {
    await this.modalCtrl.dismiss();
  }
}
