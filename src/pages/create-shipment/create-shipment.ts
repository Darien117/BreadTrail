import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Shipment } from './shipment';
import { File } from '@ionic-native/file';
import { Web3Service }        from '../../providers/web3-service/web3-service';
import { ContractProvider }        from '../../providers/contract/contract';
declare var require: any;
declare var Buffer: any;
/**
 * Generated class for the CreateShipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-shipment',
  templateUrl: 'create-shipment.html',
  providers: [Web3Service,ContractProvider],
})
export class CreateShipmentPage {
   ship: Shipment;
   shipment = {
     userID: 0,
     source:'',
     dest:'',
     details:'',
     loc:''
   };
   web3: any;
   contractInstance: any;
   item: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private file: File, 
    public _web3: Web3Service, public cp:ContractProvider) { 
        this.web3 = _web3.get();
        this.contractInstance = cp.returnContract();
        
      
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateShipmentPage');
    
    var shipCountPromise = this.getShipCount();
    shipCountPromise.then(function(shipment){
      //uint to int -> uint.toNumber()
      console.log(shipment);
      return shipment;
    });


  }

  getShipCount(){
    var shipCountPromise = new Promise((resolve,reject)=>{
      var shipment = this.contractInstance.methods.getShipCount().call();
      resolve( shipment);  
    });
    return shipCountPromise;
  }

  async createShipment(){
    // let ship = this.shipment;

    let ship = {
      userID : this.web3.utils.toHex(this.shipment.userID),
      source : this.web3.utils.toHex(this.shipment.source),
      dest : this.web3.utils.toHex(this.shipment.dest),
      details : this.web3.utils.toHex(this.shipment.details),
      loc : this.web3.utils.toHex(this.shipment.loc)
    }
    // console.log(ship);
    // this.contractInstance.methods.createShipment(ship.userID, ship.source, ship.dest, ship.details, ship.loc).estimateGas({
    //   gas:5000000}, function(error, gasAmount){
    //     if(gasAmount >= 500000)
    //         console.log('Method ran out of gas');
    //     else console.log('we aite chat');
    // });
    var Tx = require('ethereumjs-tx');
    var CryptoJS = require('crypto-js') ;
    
    var myPrivateKey = "7a924eaf963cd87f61df6b258f3d0bb4bff262b0cf60e117f67704d16624bcec";
    var privateKey = new Buffer(myPrivateKey, 'hex');

    var data = this.web3.eth.abi.encodeFunctionCall({
      name: 'createShipment',
      type: 'function',
      inputs: [{"name":"userID","type":"uint256"},
        {"name":"source","type":"bytes"},
        {"name":"dest","type":"bytes"},
        {"name":"details","type":"bytes"},
        {"name":"loc","type":"bytes"}
      ]
  }, [ship.userID,ship.source, ship.dest, ship.details, ship.loc]);

    console.log(data);
    console.log(99, data)

    var rawTx = {
      nonce: this.web3.utils.toHex(await this.web3.eth.getTransactionCount('0x7005Fa96d92B847043f0Ef87E47616a265C32349').then(data => data)),
      gasPrice: this.web3.utils.toHex(await this.web3.eth.getGasPrice().then(data => data)),
      gasLimit: this.web3.utils.toHex(4612388), // Web3.toHex(300000)
      from: '0x7005Fa96d92B847043f0Ef87E47616a265C32349',
      to: '0x072F945751d83765D72A04821C63C30c48D41691',
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
            console.log(101,"Created block: Shipment made, ", receipt)
            return receipt;
        })
        .on('confirmation', function (confirmationNumber, receipt) {
            // console.log(102, confirmationNumber, receipt)
        })
        .on('error', (e) => {
            console.log(103, e)
        })

    // this.contractInstance.methods.createShipment(ship.userID,ship.source,ship.dest,ship.details,ship.loc).send({
    //   from:'0x7005Fa96d92B847043f0Ef87E47616a265C32349'})
    //   .then(function(receipt){
    //     console.log("Created block: Shipment made, ",receipt);
    // });
  }

  saveToJSONFile(shipToFile:Shipment){
    
    const content = JSON.stringify(shipToFile);
    //var fs = require('write');
    //var file = new File();
    this.file.writeExistingFile("../../assets/", "app.json", content);

  }

  logForm(form){
    this.createShipment();
    this.navCtrl.pop();
  }

  

}
