import {Injectable, NgZone} from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import 'rxjs/add/operator/map';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
    web3: any;
  constructor() {
      
    if (typeof this.web3 !== 'undefined') {
      this.web3 = new Web3(this.web3.currentProvider);
    } else {
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/NZUhsQBaUvgSLel9cL0V"));
    }
    console.log(this.web3);
  }

  get() {
    return this.web3;
  }
}