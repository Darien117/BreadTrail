import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Web3Service }        from '../../providers/web3-service/web3-service';
import { ContractProvider }        from '../../providers/contract/contract';

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
  pastEvents: any;
  web3: any;
   contractInstance: any;
  items: Observable<any[]>;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public _web3: Web3Service, public cp:ContractProvider ) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();
    this.getPastEventsList();
    //console.log(this.contractInstance.events.allEvents());
  }

  getPastEventsList(){
    this.contractInstance.getPastEvents('allEvents',
      //filter: {userID : 0}
    function(error, events){ console.log(error); })
    .then(function(events){
        console.log(events) // same results as the optional callback above
    });
  }
  
}
