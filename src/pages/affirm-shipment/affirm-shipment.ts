import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Web3Service } from '../../providers/web3-service/web3-service';
import { ContractProvider } from '../../providers/contract/contract';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
declare var require: any;
declare var Buffer: any;

@Component({
  selector: 'page-affirm',
  templateUrl: 'affirm-shipment.html'
})

export class AffirmShipmentPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  affirm = {

    destination: '',
    comment: '',
    shipmentID: 0,
    location: '',
    userID: ''

  }
  item: any;
  web3: any;
  contractInstance: any;
  constructor(public navCtrl: NavController, public _web3: Web3Service, public cp: ContractProvider,
    private qrScanner: QRScanner, public navParams: NavParams) {
    this.web3 = _web3.get();
    this.contractInstance = cp.returnContract();
    this.affirm.userID = this.navParams.get('userID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');

  }
  ionViewWillEnter() {
    this.showCamera();
    this.scan();
  }
  ionViewWillLeave() {
    this.hideCamera();
  }
  async affirmShipment() {
    let affirmShipment = {
      shipID: this.web3.utils.toHex(this.affirm.shipmentID),
      newDest: this.web3.utils.toHex(this.affirm.destination),
      comment: this.web3.utils.toHex(this.affirm.comment),
      userID: this.web3.utils.toHex(this.affirm.userID),
      loc: this.web3.utils.toHex(this.affirm.location)
    }

    var Tx = require('ethereumjs-tx');
    var CryptoJS = require('crypto-js');

    var myPrivateKey = "7a924eaf963cd87f61df6b258f3d0bb4bff262b0cf60e117f67704d16624bcec";
    var privateKey = new Buffer(myPrivateKey, 'hex');

    var data = this.web3.eth.abi.encodeFunctionCall({
      name: 'affirm',
      type: 'function',
      inputs: [{ "name": "sid", "type": "uint256" },
      { "name": "newd", "type": "bytes" },
      { "name": "comment", "type": "bytes" },
      { "name": "location", "type": "bytes" },
      { "name": "userID", "type": "bytes" }
      ]
    }, [affirmShipment.shipID, affirmShipment.newDest, affirmShipment.comment, affirmShipment.loc,
    affirmShipment.userID]);

    console.log(data);
    console.log(99, data);

    var rawTx = {
      nonce: this.web3.utils.toHex(await this.web3.eth.getTransactionCount('0x7005Fa96d92B847043f0Ef87E47616a265C32349').then(data => data)),
      gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice().then(data => data)),
      gasLimit: this.web3.utils.toHex(4612388), // Web3.toHex(300000)
      from: '0x7005Fa96d92B847043f0Ef87E47616a265C32349',
      to: '0x90eaC6fbC3f8d4d0AE9A67987CFafb49A09e71C0',
      value: "0x0",
      data: data
    }

    var tx = new Tx(rawTx)
    tx.sign(privateKey)
    var serializedTx = '0x' + tx.serialize().toString('hex')

    const res = await this.web3.eth.sendSignedTransaction(serializedTx)
      .on('transactionHash', function (hash) {
        console.log(100, hash)
      })
      .on('receipt', function (receipt) {
        console.log(101, "Created block: Shipment made, ", receipt)
        return receipt;
      })
      .on('confirmation', function (confirmationNumber, receipt) {
        // console.log(102, confirmationNumber, receipt)
      })
      .on('error', (e) => {
        console.log(103, e)
      })
  }
  scan() {
    // Optionally request the permission early

    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          console.log("scan start");

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((text: string) => {
            console.log('Scanned something', text);

            this.qrScanner.hide(); // hide camera preview
            this.hideCamera();
            scanSub.unsubscribe(); // stop scanning
            this.affirm.shipmentID = parseInt(text);
            console.log(text, parseInt(text));
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


  logForm(form) {
    this.affirmShipment();
    this.navCtrl.pop();
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}
