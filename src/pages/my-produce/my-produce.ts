import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Web3Service }        from '../../providers/web3-service/web3-service';
import { ContractProvider }        from '../../providers/contract/contract';
declare var require: any;
declare var Buffer: any;

@Component({
  selector: 'page-affirm',
  templateUrl: 'affirm.html'
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
   item: any;
   web3: any;
   contractInstance: any;
  constructor(public navCtrl: NavController, public _web3: Web3Service, public cp:ContractProvider) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();
  }

  async affirmShipment(){
    let affirmShipment = {
      shipID: this.affirm
    }
  }
  

  logForm(form){
    this.affirmShipment();
    this.navCtrl.pop();
  }

}
