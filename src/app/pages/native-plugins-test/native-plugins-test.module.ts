import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import { NativePluginsTestPage } from './native-plugins-test';
import { NativePluginsTestRoutingModule } from './native-plugins-test-routing.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

@NgModule({
  declarations: [NativePluginsTestPage],
  imports: [
    CommonModule,
    IonicModule,
    NativePluginsTestRoutingModule,
  ],
  providers: [
    SocialSharing,
    HTTP,
  ],
})
export class NativePluginsTestPageModule {}
