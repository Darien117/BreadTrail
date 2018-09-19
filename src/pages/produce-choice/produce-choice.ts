import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AffirmShipmentPage } from '../affirm-shipment/affirm-shipment';
import { CreateShipmentPage } from '../create-shipment/create-shipment';
import { AngularFireAuth } from 'angularfire2/auth'
import { LoginServiceProvider } from '../../providers/login-service/login-service'
import { AlertController } from 'ionic-angular';
import { Web3Service } from '../../providers/web3-service/web3-service';
import { ContractProvider } from '../../providers/contract/contract';
import { GenCodePage } from '../gencode/gencode';

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

  userPw: string;
  userEmail: string;
  userID: any;
  web3: any;
  contractInstance: any;
  feed = [];
  shipcount: number;

  isLoggedIn: Boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private loginService: LoginServiceProvider,
    private alertCtrl: AlertController, public _web3: Web3Service, public cp: ContractProvider) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();


    // this.getUserFeed();
  }

  ionViewWillEnter() {
    this.afAuth.authState.subscribe(data => {
      console.log("user logged in?", data); //null if no logged in user
      if (data == null) {
        this.isLoggedIn = false;

      }
      else {
        this.isLoggedIn = true;
        this.userID = data.uid;
        this.getUserFeed();
      }
    })
  }
  ionViewDidLeave() {
    this.feed = [];
  }

  goToProducePage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(AffirmShipmentPage, { userID: (this.userID) });
  }
  goToCreateShipmentPage() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(CreateShipmentPage, { userID: (this.userID) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProduceChoicePage');
  }

  registerUser() {
    this.loginService.register(this.userEmail, this.userPw);
  }
  loginUser() {
    this.loginService.login(this.userEmail, this.userPw);
  }

  genQRCode(id) {
    console.log(id);
    this.navCtrl.push(GenCodePage, { shipId: id });
  }

  getShipCount() {
    var shipCountPromise = new Promise((resolve, reject) => {
      var shipment = this.contractInstance.methods.getShipCount().call();
      resolve(shipment);
    });
    return shipCountPromise;
  }

  getUserFeed() {
    var scountPromise = this.getShipCount();
    scountPromise.then((scount) => {
      console.log(scount);
      var feedPromises = [] //latest 20 shipment block data
      this.shipcount = this.web3.utils.hexToNumber(scount);
      var count = 0;
      for (let i = this.shipcount; i > 0; i--) {
        feedPromises[count] = (this.contractInstance.methods.getShipment(i).call());
        count++;
      }
      Promise.all(feedPromises).then((shipments) => {

        for (let i = this.shipcount - 1; i >= 0; i--) {
          let shipment = shipments[i];
          console.log(shipments);
          let user = this.web3.utils.hexToUtf8(shipment[0]);
          if (user == this.userID) {
            let timestamp_ms = this.web3.utils.hexToNumber(shipment[4]) * 1000;
            let shipmentObject = {
              userID: user,
              shipmentID: this.web3.utils.hexToNumber(shipment[1]),
              source: this.web3.utils.hexToUtf8(shipment[2]),
              dest: this.web3.utils.hexToUtf8(shipment[3]),
              timestamp: new Date(timestamp_ms),
              location: this.web3.utils.hexToUtf8(shipment[5]),
              comment: this.web3.utils.hexToUtf8(shipment[6])
            };
            this.feed.push(shipmentObject);
          }
        };
        console.log('usershit', this.feed);
      });
    });
  }
}
