import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TracePage } from '../trace/trace';
import { AffirmShipmentPage } from '../affirm-shipment/affirm-shipment';
import { ProduceChoicePage } from '../produce-choice/produce-choice';
import { BrowsePartnersPage } from '../browse-partners/browse-partners';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = TracePage;
  tab2Root: any = ProduceChoicePage;
  tab3Root: any = BrowsePartnersPage;
  constructor(public navCtrl: NavController) {
  }
  
}
