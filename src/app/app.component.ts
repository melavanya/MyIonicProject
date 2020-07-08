import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { CodePush, SyncStatus, InstallMode } from '@ionic-native/code-push';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  ProgressStatus = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private codePush: CodePush, private ngZone: NgZone) {
    console.log('browser')
    if (platform.is('cordova')) {
     console.log('is cordova')
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        this.checkCodePush(); //Use the plugin always after platform.ready()
      });
    }
  }
    checkCodePush() {
       this.codePush.sync({}, ()=>{console.log('in download progress')}).subscribe(
       (data) => {
        console.log('CODE PUSH SUCCESSFUL: ' + data);

       },
       (err) => {
        console.log('CODE PUSH ERROR: ' + err);

       });
    }
}
