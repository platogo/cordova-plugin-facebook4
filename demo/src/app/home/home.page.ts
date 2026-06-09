import { Component, inject } from '@angular/core';

import { Facebook, FacebookLoginResponse } from '@awesome-cordova-plugins/facebook/ngx';
import { Platform, isPlatform } from '@ionic/angular';
import '../../../node_modules/cordova-plugin-fbsdk/www/facebook-browser.js';

if (!isPlatform('cordova')) {
  window.exports = {};
  window.APP_ID = process.env['APP_ID'];
  window.FACEBOOK_BROWSER_SDK_VERSION = process.env['FACEBOOK_BROWSER_SDK_VERSION'];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private readonly facebook = inject(Facebook);
  private readonly platform = inject(Platform);

  async testLogin() {
    if (!this.platform.is('cordova')) {
      FB.login((response) => {
        console.log(response);
      })
      return
    }
    try {
      // https://github.com/danielsogl/awesome-cordova-plugins/pull/4921
      // @ts-ignore
      const res = await this.facebook.loginWithLimitedTracking(['public_profile', 'user_friends'], '123');
      console.log('Logged into Facebook!', JSON.stringify(res));
      alert('Login OK');
    } catch (error) {
      console.log('Error logging into Facebook', error);
      alert('Login ERROR');
    }
  }

  testShare() {

    if (!this.platform.is('cordova')) {
      FB.ui({
        method: 'share',
        href: 'https://developers.facebook.com/docs/',
      },  (response)=> {

      });
      return
    }

    const options = {
      method: 'share',
      href: 'https://pixael.com',
      share_feedBrowser: true,
    };

    this.facebook.showDialog(options).then((result) => {
      console.log('Shared with Facebook', JSON.stringify(result));
      alert('Shared OK');
    }).catch((e) => {
      console.log(e);
      alert('Share ERROR');
    });
  }

  testGameRequest() {

    if (!this.platform.is('cordova')) {
      FB.ui({method: 'apprequests',
        message: 'YOUR_MESSAGE_HERE'
      }, function(response){
        console.log(response);
      });
      return
    }

    const options = {
      method: "apprequests",
      message: "Come on man, check out my application.",
      data: 'data',
      title: 'title',
      actionType: 'askfor',
      objectID: 'YOUR_OBJECT_ID',
      filters: 'app_non_users'
    };

    this.facebook.showDialog(options).then((result) => {
      console.log('GameRequest', JSON.stringify(result));
      alert('GameRequest OK');
    }).catch((e) => {
      console.log(e);
      alert('GameRequest ERROR');
    });
  }

}
