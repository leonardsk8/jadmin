
/* global firebase */

var usersVotoed = [];
var establishment;
$(document).ready(function() {
    var config = {
            apiKey: "AIzaSyD7-bVTa9iV2NNrlFqWqUMk-VQx9H4LnFs",
            authDomain: "dispositivo1-202101.firebaseapp.com",
            databaseURL: "https://dispositivo1-202101.firebaseio.com",
            projectId: "dispositivo1-202101",
            storageBucket: "dispositivo1-202101.appspot.com",
            messagingSenderId: "629911785392"
          };
  firebase.initializeApp(config);
  establishment =$("#idEstablishment").val();
    listusers();
     
});
function listusers(){
    var ref = 'session/establishment/' +establishment+ '/users/';
  var userRef= firebase.database().ref(ref);
    userRef.on('value', function(snapshot) {
         var users = JSON.stringify(snapshot.val());
          var obj = JSON.parse(users);
          console.log(obj);
           usersVotoed = [];
           for(let i in obj){
               var user = new Object();
               user.sessionDateStart = obj[i].sessionDateStart;
               user.sessionState = obj[i].sessionState;
               user.sessionUserEmail = obj[i].sessionUserEmail;
               user.sessionUserId = obj[i].sessionUserId;
               user.sessionUserToken = obj[i].sessionUserToken;
               user.sessionUserName = obj[i].sessionUserName;
               user.sessionUserImage = obj[i].sessionUserImage;

               if(user.sessionState === "vetoed")
                   usersVotoed.push(user);
           }
           console.log(usersVotoed)
           var json = JSON.stringify(usersVotoed);
        console.log(json)
           $.post('servletItem', {
		        json:json,
                option:5
            }, function(responseText) {
                $("#columnsUsers").html(responseText);
            });
  });
}
function updateSessionUser(sessionDateStart,sessionState,sessionUserId,sessionUserName,sessionUserToken,sessionUserImage
    ,sessionUserEmail){
      var user = {};
      user.sessionDateStart = sessionDateStart;
      user.sessionState = sessionState;
      user.sessionUserId = sessionUserId;
      user.sessionUserName = sessionUserName;
      user.sessionUserImage = sessionUserImage;
      user.sessionUserToken =sessionUserToken;
    user.sessionUserEmail = sessionUserEmail;
    firebase.database().ref('session/establishment/' + establishment + '/users/'+sessionUserId+'/').set(user)
    .then(function(result) {
        alert("Usuario "+sessionUserName+" desvetado");
                
    }).catch(function (error) {
        alert("Error");
    });
}

