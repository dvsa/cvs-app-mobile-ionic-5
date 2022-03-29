import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {VisitTimelinePage} from '@app/pages/visit/visit-timeline/visit-timeline';

const routes: Routes = [
  {
    path: '',
    component: VisitTimelinePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitTimelineRoutingModule {}
