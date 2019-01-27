
/* global firebase, fetch */

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
  notify();
});
function notify(){
    var key = 'AAAAkqmrD7A:APA91bE12xZ3Vk6wh6-yPHl8J3rKUG7d2fjwu2CN4KJJe-s-DNs2-qOztqrsQTdroihH0AzXerWkfCVzpIpBAHvE9NAwVWa98r6FKZV2mwNc6aLcYcXf-XND0XRaxapnYAzmV0DpQek4';
    var to = $("#sessionUserToken").val();
    var notification = {
    'title': $("#title").val(),
    'body': $("#body").val()
    };
    var data = {
      'sessionUserId':$("#sessionUserId").val(),
      'sessionState':$("#sessionState").val(),
      'sessionDateStart':$("#sessionDateStart").val(),
      'sessionUserToken':$("#sessionUserToken").val(),
      'sessionUserName':$("#sessionUserName").val(),
      'sessionUserImage':$("#sessionUserImage").val(),
      'sessionUserBar':$("#sessionUserBar").val()
    };
    fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
        'Authorization': 'key=' + key,
        'Content-Type': 'application/json'
    },
    'body': JSON.stringify({
            'notification': notification,
            'to': to,
            'data' : data              
    })
    }).then(function(response) {
        $("#answer").val(response);
        console.log(response);
    }).catch(function(error) {
        console.error(error);
        $("#answer").val(error);
        console.error(error.message);
    });
}

