import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Web3Service } from '../../providers/web3-service/web3-service';
import { ContractProvider } from '../../providers/contract/contract';
import { GenCodePage } from '../gencode/gencode';

/**
 * Generated class for the ViewProduceChainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-produce-chain',
  templateUrl: 'view-produce-chain.html',
})
export class ViewProduceChainPage {

  web3: any;
  contractInstance: any;
  chain = [];

  constructor(private zone: NgZone, public navCtrl: NavController, public navParams: NavParams,
    private qrScanner: QRScanner, public _web3: Web3Service, public cp: ContractProvider) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewProduceChainPage');
  }
  ionViewWillEnter() {
    this.showCamera();
    this.scan();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }

  scan() {
    // Optionally request the permission early

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log("scan start");

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((id: string) => {
            console.log('Scanned something', id);

            this.qrScanner.hide(); // hide camera preview
            this.hideCamera();
            this.getProduceChain(parseInt(id));
            scanSub.unsubscribe(); // stop scanning

          });
          this.qrScanner.show();


        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));

  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  getProduceChain(id: any) {
    var next;
    console.log(id);
    console.log(this.contractInstance);
    var shipCountPromise = new Promise((resolve, reject) => {
      var shipment = this.contractInstance.methods.getShipment(id).call();
      resolve(shipment);
    });
    shipCountPromise.then(ship => {
      //unpack shipment and store
      let timestamp_ms = this.web3.utils.hexToNumber(ship[4]) * 1000;
      let shipmentObject = {
        userID: this.web3.utils.hexToNumber(ship[0]),
        shipmentID: this.web3.utils.hexToNumber(ship[1]),
        source: this.web3.utils.hexToUtf8(ship[2]),
        dest: this.web3.utils.hexToUtf8(ship[3]),
        timestamp: new Date(timestamp_ms),
        location: this.web3.utils.hexToUtf8(ship[5]),
        comment: this.web3.utils.hexToUtf8(ship[6])
      };
      this.zone.run(() => {
        this.chain.push(shipmentObject);
        next = this.web3.utils.hexToNumber(ship[7]); //next shipment id
        if (next == 0) { console.log(this.chain); return };
        this.getProduceChain(next);

      });
    });

  }

  genQRCode(id) {
    console.log(id);
    this.navCtrl.push(GenCodePage, { shipId: id });
  }


}
