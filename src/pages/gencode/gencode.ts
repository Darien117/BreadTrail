import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRCodeModule } from 'angularx-qrcode';

/**
 * Generated class for the GencodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gencode',
  templateUrl: 'gencode.html',
})
export class GenCodePage {
  shipId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shipId = this.navParams.get('shipId').toString();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenCodePage');
  }

}
