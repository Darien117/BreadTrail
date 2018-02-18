import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyProducePage } from '../my-produce/my-produce';
import { CreateShipmentPage } from '../create-shipment/create-shipment';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToProducePage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(MyProducePage);
  }
  goToCreateShipmentPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(CreateShipmentPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduceChoicePage');
  }

}
