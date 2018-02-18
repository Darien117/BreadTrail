

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC-PoZQNPCgc2IX-EbmrF2ypZZxpMisb1E",
    authDomain: "breadtrail-f1ae3.firebaseapp.com",
    databaseURL: "https://breadtrail-f1ae3.firebaseio.com",
    projectId: "breadtrail-f1ae3",
    storageBucket: "breadtrail-f1ae3.appspot.com",
    messagingSenderId: "57269197157"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
  var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  // ...
});