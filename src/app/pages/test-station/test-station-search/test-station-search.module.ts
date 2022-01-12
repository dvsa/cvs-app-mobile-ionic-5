import { NgModule } from '@angular/core';
import { TestStationSearchPage } from './test-station-search';
import { PipesModule } from '@pipes/pipes.module';
import { DirectivesModule } from '@directives/directives.module';
import { TestStationService } from '@providers/test-station/test-station.service';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {TestingStationSearchRoutingModule} from '@app/pages/test-station/test-station-search/test-station-seach-routing.module';

@NgModule({
  declarations: [TestStationSearchPage],
  imports: [
    PipesModule,
    DirectivesModule,
    IonicModule,
    CommonModule,
    FormsModule,
    TestingStationSearchRoutingModule,
  ],
  providers: [TestStationService]
})
export class TestStationSearchModule {}
