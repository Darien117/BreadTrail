import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Web3Service } from '../../providers/web3-service/web3-service';
import { ContractProvider } from '../../providers/contract/contract';
import { Shipment } from '../create-shipment/shipment';
import { GenCodePage } from '../gencode/gencode';
import { ViewProduceChainPage } from '../view-produce-chain/view-produce-chain';


declare var testCrop
declare var testName
declare var testLocation
@Component({
  selector: 'page-trace',
  templateUrl: 'trace.html'
})
export class TracePage {

  userPw: string;
  userEmail: string;

  web3: any;
  contractInstance: any;
  feed = [];
  shipcount: number;
  ship: Shipment;
  shipment = {
    userID: 0,
    source: '',
    dest: '',
    details: '',
    loc: ''
  };

  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public _web3: Web3Service, public cp: ContractProvider) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();


    this.getFeed20();
    //console.log(this.contractInstance.events.allEvents());
  }
  getShipCount() {
    var shipCountPromise = new Promise((resolve, reject) => {
      var shipment = this.contractInstance.methods.getShipCount().call();
      resolve(shipment);
    });
    return shipCountPromise;
  }

  getFeed20() {
    var scountPromise = this.getShipCount();
    scountPromise.then((scount) => {
      console.log(scount);
      var feedPromises = [] //latest 20 shipment block data
      this.shipcount = this.web3.utils.hexToNumber(scount);
      var count = 0;
      for (let i = this.shipcount; i > this.shipcount - 20; i--) {
        if (i <= 0) break;
        feedPromises[count] = (this.contractInstance.methods.getShipment(i).call());
        count++;
      }
      Promise.all(feedPromises).then((shipments) => {

        for (let i = this.shipcount - 1; i > this.shipcount - 21; i--) {
          if (i < 0) break;
          let shipment = shipments[i];
          console.log(shipments);
          let timestamp_ms = this.web3.utils.hexToNumber(shipment[4]) * 1000;
          let shipmentObject = {
            userID: this.web3.utils.hexToUtf8(shipment[0]),
            shipmentID: this.web3.utils.hexToNumber(shipment[1]),
            source: this.web3.utils.hexToUtf8(shipment[2]),
            dest: this.web3.utils.hexToUtf8(shipment[3]),
            timestamp: new Date(timestamp_ms),
            location: this.web3.utils.hexToUtf8(shipment[5]),
            comment: this.web3.utils.hexToUtf8(shipment[6])
          };
          this.feed.push(shipmentObject);
        };

      });
    });
  }

  genQRCode(id) {
    console.log(id);
    this.navCtrl.push(GenCodePage, { shipId: id });
  }

  searchForChain() {
    this.navCtrl.push(ViewProduceChainPage);
  }

}