 /* global firebase, fetch */
var arrayUsers = [];
var arrayUsersVetoed = [];
var TablaDeBaseDatos;
var channels;
var channelId;
var imagen="https://i1.wp.com/www.plumsteadbond.com/wp-content/uploads/2018/05/2hIOZ.gif?ssl=1";
var idBar;
var token;
var userActive;
// Initialize Firebase
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
  var ref = 'chat/establishment/'+$("#idEstablishment").val()+'/users/'+$("#idUser").val()+'/';
  
  TablaDeBaseDatos= firebase.database().ref(ref);
  iniciarUsuarios($("#idEstablishment").val());
  checkChannel($("#idUser").val());
  idBar = $("#idEstablishment").val();
  Chat(TablaDeBaseDatos);
    
});
    
    //Variable con acceso a datos 
  function notify(token,body,title){
    var key = 'AAAAkqmrD7A:APA91bE12xZ3Vk6wh6-yPHl8J3rKUG7d2fjwu2CN4KJJe-s-DNs2-qOztqrsQTdroihH0AzXerWkfCVzpIpBAHvE9NAwVWa98r6FKZV2mwNc6aLcYcXf-XND0XRaxapnYAzmV0DpQek4';
    var to = token;
    var notification = {
    'title': title,
    'body': body
    };
    var data = {
      'sessionUserId':idBar,
      'sessionState':userActive.sessionState,
      'sessionDateStart':userActive.sessionDateStart,
      'sessionUserToken':"1",
      'sessionUserName':"Admin",
      'sessionUserImage':userActive.sessionUserImage,
      'sessionUserBar':userActive.sessionUserBar
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
        console.log(response);
    }).catch(function(error) {
        console.error(error);
        console.error(error.message);
    });
}
   function Chat(TablaDeBaseDatos){
        TablaDeBaseDatos.limitToLast(20).on('value',function(snapshot){
         $(".chat").html(""); // Limpiamos todo el contenido del chat
        
        // Leer todos los mensajes en firebase
        snapshot.forEach(function(e){
            var objeto=e.val(); // Asignar todos los valores a un objeto
            
            // Validar datos nulos y agregar contenido en forma de lista etiqueta <li>
             if((objeto.mensaje!==null)&&(objeto.nombre!==null)){
                 
                 // Copia el contenido al template y luego lo inserta en el chat
                 $( "#plantilla" ).clone().prependTo( ".chat" );
                 $('.chat #plantilla').show(10);
                 $("#profileImg").attr("src",objeto.imagen);
                 $('.chat #plantilla .Nombre').html(objeto.nombre);
                 $('.chat #plantilla .Mensaje').html(objeto.mensaje);
                 $('.chat #plantilla .Tiempo').html(objeto.fecha);
                 $('.chat #plantilla').attr("id","");
             }
            
        });
    });
   } 
   
   function messageUser(establishmentId){
       var ref = 'chat/establishment/'+establishmentId+'/users/'+channelId+'/';
       console.log("Referencia:   "+ref);
       TablaDeBaseDatos= firebase.database().ref(ref);
       Chat(TablaDeBaseDatos);
   }
   
   function checkChannel(userId,tokenUser,userName,userImage,userDateStart,userState){
       token = tokenUser;
       userActive = new Object();
       userActive.sessionUserId = userId;
       userActive.sessionState = userState;
       userActive.sessionDateStart = userDateStart;
       userActive.sessionUserToken = tokenUser;
       userActive.sessionUserName = userName;
       userActive.sessionUserImage = userImage;
       userActive.sessionUserBar = idBar;      
       
       var ref = firebase.database().ref('chat/channels/');
       ref.once('value',function(snapshot){
          var channel = JSON.stringify(snapshot.val());
          var obj = JSON.parse(channel);
          var array = [];
          var check = 0;
          console.log(obj);
           for(let i in obj){
               if((obj[i].user1 === idBar || obj[i].user1 === userId) && 
                       (obj[i].user2 === userId || obj[i].user2 === idBar) ){
                   channelId = obj[i].key;
                   console.log("Ya existe canal: "+obj[i].key);
                   check = 1;
                   break;
               }
           }
           if(obj===null || check === 0){
               generateChannel(userId);
               
           }
           console.log("Canal: "+channelId);
           messageUser(idBar);
       });
   }
   
   function generateChannel(idUser){
       var ref = 'chat/channels/';
       channels = firebase.database().ref(ref);
       var key = channels.push().key;
       channelId = key;
       channels.child(key).set({
           user1:idBar,
           user2:idUser,
           key:key
       });  
   }
   
    function iniciarUsuarios(establishmentId){
      var starCountRef = firebase.database().ref('session/establishment/' + establishmentId + '/users/');
      starCountRef.on('value', function(snapshot) {
         var songs = JSON.stringify(snapshot.val());
           var obj = JSON.parse(songs);
           var numUsers=0;
           arrayUsers = [];
           for(let i in obj){
               var user = new Object();
               user.sessionDateStart = obj[i].sessionDateStart;
               user.sessionState = obj[i].sessionState;
               user.sessionUserId = obj[i].sessionUserId;
               user.sessionUserImage = obj[i].sessionUserImage;
               user.sessionUserToken = obj[i].sessionUserToken;
               user.sessionUserName = obj[i].sessionUserName;
               if( user.sessionState === "active" & user.sessionUserName!=="Admin")
                   arrayUsers.push(user);
               else if(user.sessionState === "vetoed")
                   arrayUsersVetoed.push(user);
               
           }
           console.log(arrayUsers);
           console.log(arrayUsersVetoed);
           var json = JSON.stringify(arrayUsers);
      $.post('servletItem', {
        json:json,
        option:4
      }, function(responseText) {
        $("#columnsUsers").html(responseText);
      });
      });
}


  var Nombre = "Admin";   
       $('#btnEnviar').click(function(){
           var formatofecha= new Date(); 
           var d= formatofecha.getUTCDate();
           var m= formatofecha.getMonth()+1;
           var y= formatofecha.getFullYear();
           var h=formatofecha.getHours();
           var min= formatofecha.getMinutes();
           
           Fecha= d+"-"+m+"-"+y+" "+h+":"+min;
           
           TablaDeBaseDatos.push({
               nombre:Nombre,
               mensaje:$("#Mensaje").val(),
               fecha:Fecha,
               imagen:imagen
            }).then(function(result) {
                console.log("Exito");
                var title="Nuevo mensaje de: Admin";
                var body=$("#Mensaje").val();
                notify(token,body,title);
            }).catch(function (error) {
                console.log("Error: "+error.message);
            });
           
           
       });
