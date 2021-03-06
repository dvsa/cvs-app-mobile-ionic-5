import { NgModule } from '@angular/core';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TestAbandonPage } from '@app/pages/testing/test-abandonment/test-abandon/test-abandon';
import { TestAbandonRoutingModule } from '@app/pages/testing/test-abandonment/test-abandon/test-abandon-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestAbandonPage],
  imports: [
    CommonModule,
    IonicModule,
    TestAbandonRoutingModule,
    FormsModule
  ],
  providers: [TestTypeService]
})
export class TestAbandonModule {}
