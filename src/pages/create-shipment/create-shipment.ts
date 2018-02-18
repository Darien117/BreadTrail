import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shipment } from './shipment';
import { File } from '@ionic-native/file';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';


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
     userID: 0,
     source:'',
     dest:'',
     details:'',
     loc:''
   }
   itemRef: AngularFireObject<any>;
   item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, public db: AngularFireDatabase) { 
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
    this.ship = this.shipment;
    this.itemRef = this.db.object('/Create/'+ this.ship.userID);
    //if(this.itemRef.snapshotChanges.length == 0) console.log("Shivba"); //a way to check if uid exists already
    this.itemRef.set(this.ship); 
    //this.saveToJSONFile(this.ship);
    this.returnConfirm();
  }

  

}
