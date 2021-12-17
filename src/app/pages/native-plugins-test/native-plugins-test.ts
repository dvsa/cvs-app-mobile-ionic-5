import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';
import { AlertController } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';
import { SocialSharing } from '@ionic-enterprise/social-sharing/ngx';
import { Network } from '@ionic-native/network/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

declare let cordova: any;
@Component({
    selector: 'native-plugins-test',
    templateUrl: 'native-plugins-test.html',
    styleUrls: ['native-plugins-test.scss'],
})
export class NativePluginsTestPage implements OnInit {

  screenOrientationLocked = false;
  statusBarShowing = true;

    constructor(
        private screenOrientation: ScreenOrientation,
        private ga: GoogleAnalytics,
        private openNativeSettings: OpenNativeSettings,
        private alertCtrl: AlertController,
        private socialSharing: SocialSharing,
        private network: Network,
        private http: HTTP,
    ) { }

    async ngOnInit(): Promise<void> {

        await this.startGa();

        this.screenOrientation.onChange().subscribe(
          () => {
              console.log('### Orientation Changed');
          }
       );
    }

    async showAlert(header: string, message: string): Promise<any> {

      const alert = await this.alertCtrl.create({
        cssClass: 'my-custom-class',
        header,
        message,
        buttons: ['OK']
      });

      await alert.present();
    }

    printCordovaFile() {
      console.log(cordova.file);
    }

    nativeSettings() {
        this.openNativeSettings.open('settings');
    }

    testSocialSharing() {
        this.socialSharing.shareViaEmail('another test', 'test', ['thomas.crawley@dvsa.gov.uk',]);
    }

    testHttpPlugin() {
      this.http.get('http://ionic.io', {}, {})
        .then(data => {

        console.log(data.status);
        console.log(data.data); // data received by server
        console.log(data.headers);
      })
      .catch(error => {
        console.log(error.status);
        console.log(error.error); // error message as string
        console.log(error.headers);
      });
    }

    async toggleScreenOrientationLock() {
      console.log(this.screenOrientation.type); // logs the current orientation, example: 'landscape'
      if (this.screenOrientationLocked) {
          this.screenOrientation.unlock();
      } else {
          this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      this.screenOrientationLocked = !this.screenOrientationLocked;
      await this.showAlert('toggleScreenOrientationLock', this.screenOrientationLocked.toString());
    }

    toggleStatusBar() {
      if (this.statusBarShowing) {
          StatusBar.hide();
       } else {
         StatusBar.show();
        }
      this.statusBarShowing = !this.statusBarShowing;
    }

    async startGa(): Promise<void> {
        try {
            await this.ga.startTrackerWithId('YOUR_TRACKER_ID');
            console.log('Google analytics is ready now');
            this.ga.trackView('test');
            // Tracker is ready
            // You can now track pages or set additional information such as AppVersion or UserId
          } catch (err) {
            console.log('Error starting GoogleAnalytics', err);
          }
    }

    async printNetworkStatus() {
      const status = this.network.type;
      await this.showAlert('printNetworkStatus', JSON.stringify(status));
    }

    exitApp() {
      cordova.plugins.exit();
    }

}
