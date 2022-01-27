import { NgModule } from '@angular/core';
import { ByVehicleTypePipe } from './by-vehicle-type/by-vehicle-type';
import { FilterTestTypeByVehiclePipe } from './filter-test-type-by-vehicle/filter-test-type-by-vehicle.pipe';
import { FormatBooleanPipe } from './format-boolean/format-boolean.pipe';
import { FormatVrmPipe } from './format-vrm/format-vrm.pipe';

const PIPES = [ByVehicleTypePipe, FilterTestTypeByVehiclePipe, FormatBooleanPipe, FormatVrmPipe];

@NgModule({
  declarations: [...PIPES],
  imports: [],
  exports: [...PIPES]
})
export class PipesModule {}
