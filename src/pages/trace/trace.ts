import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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


  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  
}
