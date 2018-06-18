var Web3 = require("web3");
var admin = require('firebase-admin');

var serviceAccount = require('./breadtrail-aa113-firebase-adminsdk-h4ux4-a3087209ef.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://breadtrail-aa113.firebaseio.com'
});

// Get a database reference to our db
const db = admin.database();

// creating a starting path in our database



  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  abi = JSON.parse('[{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getShipment","outputs":[{"name":"u","type":"uint256"},{"name":"s","type":"uint256"},{"name":"so","type":"bytes32"},{"name":"d","type":"bytes32"},{"name":"ts","type":"uint256"},{"name":"l","type":"bytes32"},{"name":"c","type":"bytes32"},{"name":"n","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getShipCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userShipments","outputs":[{"name":"userID","type":"uint256"},{"name":"shipID","type":"uint256"},{"name":"source","type":"bytes32"},{"name":"dest","type":"bytes32"},{"name":"timestamp","type":"uint256"},{"name":"location","type":"bytes32"},{"name":"comment","type":"bytes32"},{"name":"next","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"userID","type":"uint256"},{"name":"source","type":"bytes32"},{"name":"dest","type":"bytes32"},{"name":"details","type":"bytes32"},{"name":"loc","type":"bytes32"}],"name":"createShipment","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"sid","type":"uint256"},{"name":"newd","type":"bytes32"},{"name":"comment","type":"bytes32"},{"name":"location","type":"bytes32"},{"name":"userID","type":"uint256"}],"name":"affirm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]');
  TrackingContract = 
   web3.eth.contract(abi);
  
  contractInstance = TrackingContract.at('0x4557a3615d301bc3f2b6357423c9eec2aef22ea3');
  
  
  function createShipment(userID, source, dest, details, loc){
    // userID = 1;
    // source = "Toco Farms";
    // dest = "Grande Market";
    // details = "5 pong baigan";
    // loc = "NA lul";
    contractInstance.createShipment(userID,source,dest,details,loc, {from: web3.eth.accounts[0], gas:4000000}, function(){
      console.log("Created block: Shipment made");
    });
  }
  
  function affirmShipment(shipID, newDest, comment, location, userID){
    contractInstance.affirmShipment(shipID,newDest,comment,location,userID);
    // contractInstance.createShipment(userID,source,dest,details,loc, {from: web3.eth.accounts[0], gas:4000000}, function(){

    //   console.log("Created block: Shipment updated");
    // });
  }
  function getShipment(shipID){
    var ShipmentPromise = new Promise((resolve,reject)=>{
      var shipment = contractInstance.getShipment.call(shipID);
      resolve( shipment);  
    });
    return ShipmentPromise;
    // ShipmentPromise.then(function(shipment){
    //   // [ userID, shipID, source, dest, timestamp, location, comment]
    //   timestamp_ms = (shipment[5].toNumber())*1000;
    //   let shipmentObject = {
    //     userID: shipment[0].toNumber(),
    //     shipmentID: shipment[1].toNumber(),
    //     source: web3.toUtf8(shipment[2].toString()),
    //     dest: web3.toUtf8(shipment[4].toString()),
    //     timestamp: new Date(timestamp_ms),
    //     location:web3.toUtf8(shipment[6].toString()),
    //     comment: web3.toUtf8(shipment[7].toString())
    //   };
    //   //uint to int -> uint.toNumber()
    //   return shipmentObject;
    // });
  }
  
  function getFeed20(){console.log('getting Feed');
    var scountPromise = getShipCount();
    scountPromise.then(function(scount){console.log(scount);
      var feedPromises = [] //latest 20 shipment block data
      scount = scount.toNumber(); var count = 0;
      for(let i=0; i<20;i++){
        feedPromises[count] = (getShipment(i));
        count++;
      }
      Promise.all(feedPromises).then(function(shipments){
        var feed = [];
        for(let i=0;i<20;i++){
            // [ userID, shipID, source, dest, timestamp, location, comment]
            shipment = shipments[i];
            timestamp_ms = (shipment[4].toNumber())*1000;
            let shipmentObject = {
              userID: shipment[0].toNumber(),
              shipmentID: shipment[1].toNumber(),
              source: web3.toUtf8(shipment[2].toString()),
              dest: web3.toUtf8(shipment[3].toString()),
              timestamp: new Date(timestamp_ms),
              location:web3.toUtf8(shipment[5].toString()),
              comment: web3.toUtf8(shipment[6].toString())
            };
            feed.push(shipmentObject);
        }
        //feed filled here
        var ref = db.ref('Feed/Shipments');
        console.log(feed);
        // const feedr = ref.child('Feed');
        for(let i=scount;i>(scount-20);i--){
          if(i>0){
            shipID = feed[i].shipmentID;
            ref.child(i.toString()).set(feed[i]);
          }
        }
      });
    });
    
  }
  
  
  function getShipCount(){
    var shipCountPromise = new Promise((resolve,reject)=>{
      var shipment = contractInstance.getShipCount.call();
      resolve( shipment);  
    });
    return shipCountPromise;
    // shipCountPromise.then(function(shipment){
    //   //uint to int -> uint.toNumber()
    //   console.log(shipment.toNumber());
    //   return shipment.toNumber();
    // });
  }
  
  
  // $(document).ready(function() {
    
  //   // contractInstance.getShipCount.call().then(function(shipment){
  //   //   let source = web3.toUtf8(shipment[2].toString());
  //   //   console.log(source);
  //   // });
  //   getFeed20();
    
  // });
  
  function bin2string(array){
    var result = "";
    for(var i = 0; i < array.length; ++i){
      result+= (String.fromCharCode(array[i]));
    }
    return result;
  }
  createShipment('','','','','');
// var ref = db.ref('Create').once('value').then(function(snap){
//   snap.val().forEach(function(el) {
//     console.log(el);
//     createShipment(el.userID,el.source,el.dest,el.details,el.loc);
    
//   }, this);console.log('wut');
//   let ref = snap.ref;
//   ref.remove();
  
//   setTimeout(function(){
//     getFeed20();
//   },2500);
// });

  