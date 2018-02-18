import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

declare var testCrop
declare var testName
declare var testLocation
@Component({
  selector: 'page-trace',
  templateUrl: 'trace.html'
})
export class TracePage {
  crop: any = testCrop;
  name: any = testName;
  location:any = testLocation;

  items: Observable<any[]>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, db: AngularFireDatabase) {
    this.items = db.list('Feed/Shipments/').valueChanges();
  }
  
}
