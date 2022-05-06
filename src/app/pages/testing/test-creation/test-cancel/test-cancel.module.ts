import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TestCancelPage } from './test-cancel';
import { TestService } from '@providers/test/test.service';
import { TestResultService } from '@providers/test-result/test-result.service';
import { TestTypeService } from '@providers/test-type/test-type.service';
import { CommonModule } from '@angular/common';
import { TestCancelRoutingModule } from '@app/pages/testing/test-creation/test-cancel/test-cancel-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TestCancelPage],
  imports: [
    CommonModule,
    IonicModule,
    TestCancelRoutingModule,
    FormsModule,
  ],
  providers: [
    TestService,
    TestResultService,
    TestTypeService
  ]
})
export class TestCancelModule {}
