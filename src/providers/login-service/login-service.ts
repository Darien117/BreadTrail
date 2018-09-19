import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { AlertController } from 'ionic-angular';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  newRegistree: any;
  user: any;
  constructor(private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
    console.log('Hello LoginServiceProvider Provider');
  }


  login(email: string, password: string) {
    try {
      this.user = this.afAuth.auth.signInWithEmailAndPassword(email, password);

      console.log("logged guy guy ", this.user);
    }
    catch (e) {
      console.error(e);
      this.presentAlert(e);
    }
  }

  async register(email: string, password: string) {
    try {
      this.newRegistree = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      console.log("new guy ", this.newRegistree);
    }
    catch (e) {
      console.error(e);
      this.presentAlert(e);
    }
  }

  presentAlert(e: any) {
    let alert = this.alertCtrl.create({
      title: 'Authentication Error',
      subTitle: e,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
