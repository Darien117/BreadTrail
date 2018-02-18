import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shipment } from './shipment';
import { File } from '@ionic-native/file';



/**
 * Generated class for the CreateShipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shipment',
  templateUrl: 'create-shipment.html',
})
export class CreateShipmentPage {
   ship: Shipment;
   shipment = {
     id: 0,
     source:'',
     destination:'',
     details:'',
     location:''
   }
  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File) {
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShipmentPage');
  }

  returnConfirm() {
    this.navCtrl.pop();
  }

  saveToJSONFile(shipToFile:Shipment){
    
    const content = JSON.stringify(shipToFile);
    //var fs = require('write');
    //var file = new File();
    this.file.writeExistingFile("../../assets/", "app.json", content);

  }

  logForm(form){
    //this.shipment = form.value;
    this.ship = this.shipment;
    //this.ship = JSON.stringify(this.shipment);
    console.log(this.ship);
    console.log(JSON.stringify(this.ship));
    this.saveToJSONFile(this.ship);

    this.returnConfirm();
  }

  

}
