import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Web3Service }        from '../web3-service/web3-service';

/*
  Generated class for the ContractProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContractProvider {

  contractInstance : any;
  accountInstance : any;
  web3: any;
  abi = JSON.parse('[{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getShipment","outputs":[{"name":"u","type":"uint256"},{"name":"s","type":"uint256"},{"name":"so","type":"bytes"},{"name":"d","type":"bytes"},{"name":"ts","type":"uint256"},{"name":"l","type":"bytes"},{"name":"c","type":"bytes"},{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShipCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"source","type":"bytes"},{"name":"dest","type":"bytes"},{"name":"details","type":"bytes"},{"name":"loc","type":"bytes"}],"name":"createShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sid","type":"uint256"},{"name":"newd","type":"bytes"},{"name":"comment","type":"bytes"},{"name":"location","type":"bytes"},{"name":"userID","type":"uint256"}],"name":"affirm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userShipments","outputs":[{"name":"userID","type":"uint256"},{"name":"shipID","type":"uint256"},{"name":"source","type":"bytes"},{"name":"dest","type":"bytes"},{"name":"timestamp","type":"uint256"},{"name":"location","type":"bytes"},{"name":"comment","type":"bytes"},{"name":"next","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');

  constructor(public http: HttpClient,public _web3: Web3Service) {
    console.log('Hello ContractProvider Provider');
    this.web3 = _web3.get();
    this.contractInstance = new this.web3.eth.Contract(this.abi,'0x072F945751d83765D72A04821C63C30c48D41691',
      {
        from:'0x7005Fa96d92B847043f0Ef87E47616a265C32349'
      }); 
  }

  returnContract() : any {
    return this.contractInstance;
  }

  returnAccount(): any {
  }
  
}

