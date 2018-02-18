import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'page-my-produce',
  templateUrl: 'my-produce.html'
})

export class MyProducePage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  affirm = {
    
    destination:'',
    comment:'',
    shipmentID:0,
    location:''
    
  }
  itemRef: AngularFireObject<any>;
   item: any;
  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
  }
  
  returnConfirm() {
    this.navCtrl.pop();
  }

  logForm(form){
    //this.shipment = form.value;
    this.itemRef = this.db.object('/Affirmations/' + this.affirm.shipmentID);
   // this.itemRef = this.db.object('/Shipments/999');
    if(this.itemRef.snapshotChanges.length == 0) console.log("Shivba");
    this.itemRef.set(this.affirm); 
    //this.ship = JSON.stringify(this.shipment);
    console.log(this.affirm);
    console.log(JSON.stringify(this.affirm));
   

    this.returnConfirm();
  }

}
