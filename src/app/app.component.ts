import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { CodePush, SyncStatus, InstallMode } from '@ionic-native/code-push';
import { OneSignal } from '@ionic-native/onesignal/ngx';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  ProgressStatus = '';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private codePush: CodePush, private ngZone: NgZone,private oneSignal: OneSignal) {
    console.log('browser')
    if (platform.is('cordova')) {
     console.log('is cordova')
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();

        this.checkCodePush(); //Use the plugin always after platform.ready()


         if (platform.is('cordova'))
             { var notificationOpenedCallback = function(jsonData) {
              console.log('hurray',JSON.stringify(jsonData))
              };

              window["plugins"].OneSignal
              .startInit("35e4f494-3ebe-47da-91a7-18aea40c4a6b")
              .handleNotificationOpened(notificationOpenedCallback)
              .endInit();

             }
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
