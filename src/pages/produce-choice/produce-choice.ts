import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AffirmShipmentPage } from '../affirm-shipment/affirm-shipment';
import { CreateShipmentPage } from '../create-shipment/create-shipment';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginServiceProvider } from '../../providers/login-service/login-service'
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ProduceChoicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-produce-choice',
  templateUrl: 'produce-choice.html',
})
export class ProduceChoicePage {

  userPw: string;
  userEmail: string;

  isLoggedIn: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private loginService: LoginServiceProvider,
    private alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    this.afAuth.authState.subscribe(data => {
      console.log("user logged in?", data); //null if no logged in user
      if (data == null) {
        this.isLoggedIn = false;

      }
      else this.isLoggedIn = true;

    })
  }

  goToProducePage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(AffirmShipmentPage);
  }
  goToCreateShipmentPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(CreateShipmentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduceChoicePage');
  }

  registerUser() {
    this.loginService.register(this.userEmail, this.userPw);
  }
  loginUser() {
    this.loginService.login(this.userEmail, this.userPw);
  }


}
