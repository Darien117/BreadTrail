pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Trail {

  struct shipment {
    uint userID;
    uint shipID;
    bytes32 source;
    bytes32 dest;
    uint timestamp;
    bytes32 location;
    bytes32 comment;
    uint next;
  }

  /* This is the constructor which will be called once when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  mapping (uint => shipment ) public userShipments;
  uint shipID;
  function Trail() public {
    shipID = 0;
  }
  

  function createShipment(uint userID, bytes32 source, bytes32 dest, bytes32 details, bytes32 loc) public {
    shipID += 1;

    // userShipments[shipID] = shipment(1,2,"grande bush","5lb baigan",block.timestamp, "na","2",2);
    userShipments[shipID] = shipment(userID,shipID,source,dest,block.timestamp, loc,details,0);
    userShipments[shipID].source = source;
    userShipments[shipID].dest = dest;
    userShipments[shipID].comment = details;
    userShipments[shipID].timestamp = block.timestamp;
    userShipments[shipID].location = loc;
    userShipments[shipID].shipID = shipID;
    userShipments[shipID].userID = userID;
    userShipments[shipID].next = 0;
  }

  function affirm (uint sid, bytes32 newd, bytes32 comment, bytes32 location, uint userID) public {
    shipID += 1;
    userShipments[sid].next = shipID;
    userShipments[shipID].source = userShipments[sid].source;
    userShipments[shipID].dest = newd;
    userShipments[shipID].comment = comment;
    userShipments[shipID].timestamp = block.timestamp;
    userShipments[shipID].location = location;
    userShipments[shipID].userID = userID;
  }

  function getShipCount() view public returns (uint) {
    return shipID;
  }

  function getShipment(uint id) view public returns (uint u,uint s,bytes32 so,bytes32 d,uint ts,bytes32 l,bytes32 c,uint n) {
     u = userShipments[id].userID;
     s = userShipments[id].shipID;
     so = userShipments[id].source;
     d = userShipments[id].dest;
     ts = userShipments[id].timestamp;
     l = userShipments[id].location;
     c = userShipments[id].comment;
     n = userShipments[id].next;
    return (u, s, so, d, ts, l,c,n);
  }

}