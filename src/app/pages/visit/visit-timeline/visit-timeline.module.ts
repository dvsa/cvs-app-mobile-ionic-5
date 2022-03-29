import { NgModule } from '@angular/core';
import { VisitTimelinePage } from './visit-timeline';
import { TestService } from '@providers/test/test.service';
import { PipesModule } from '@pipes/pipes.module';
import { FormatVrmPipe } from '@pipes/format-vrm/format-vrm.pipe';
import { IonicModule } from '@ionic/angular';
import { VisitTimelineRoutingModule } from '@app/pages/visit/visit-timeline/visit-timeline-routing-module';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [VisitTimelinePage],
  imports: [
    IonicModule,
    PipesModule,
    VisitTimelineRoutingModule,
    CommonModule,
  ],
  providers: [
    TestService,
    FormatVrmPipe,
  ]
})
export class VisitTimelineModule {}
