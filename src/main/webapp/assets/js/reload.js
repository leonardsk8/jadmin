 /* global firebase */

var uidUserSelected="";
 var userNameSelected;
 var arrayUsers = [];
 var establishment;
 var establishmentObject;
var arrayUsersVetoed = [];
var creditosActuales = 0;
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
    iniciarUsuarios($("#idEstablishment").val());
    getInfoBar($("#idEstablishment").val())
    establishment = $("#idEstablishment").val();
});
$( "#btnReload" ).click(function() {

    var credits = $("#selectCredits").val();
    if (uidUserSelected !== "")
        recargar(credits);
    else
        alert("Seleccione un usuario");
});
function recargar(creditos){
    var creditsObj = new Object();
    var sum = parseInt(creditos)+parseInt(creditosActuales);
    console.log(creditos + " "+creditosActuales )
    creditsObj.credits = String(sum)
    creditsObj.idUser = uidUserSelected;
    var starCountRef = firebase.database().ref('credits/'+$("#idEstablishment").val()+'/creditos/'+ uidUserSelected ).set(creditsObj)
    .then(function(result) {
        alert("Recarga Exitosa");
    }).catch(function (error) {
        alert("Error Recargando ");
    });
    var myLoadHistory = new Object();
        var f = new Date();
        var photo = establishmentObject.images.slice(0, establishmentObject.images.indexOf('~'));
        var minutes = f.getMinutes()+"";
        minutes = minutes.length  === 1 ?"0"+f.getMinutes():""+f.getMinutes();
        var date = f.getHours()+":"+minutes+" "+f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
        var sum = $("#selectCredits").val();
        myLoadHistory.nameBar = establishmentObject.name;
        myLoadHistory.date = date;
        myLoadHistory.idBar = $("#idEstablishment").val();
        myLoadHistory.credits = sum;
        myLoadHistory.thumnailBar = photo;
        myLoadHistory.idUser = uidUserSelected
        var key = Math.floor(Math.random() * (100000000 - 1) + 0);
    
            firebase.database().ref('history/users/load/' + uidUserSelected + "/"+key).set(myLoadHistory)
            .then(function(result) {
               console.log("Exito");
            }).catch(function (error) {
               console.log("Error");
            });
    
}

function iniciarUsuarios(establishmentId){
    var starCountRef = firebase.database().ref('session/establishment/' + establishmentId + '/users/');
    starCountRef.on('value', function(snapshot) {
           var users = JSON.stringify(snapshot);
           var obj = JSON.parse(users);
           var numUsers=0;
           arrayUsers = [];
           for(let i in obj){
               var user = new Object();
               user.sessionDateStart = obj[i].sessionDateStart;
               user.sessionState = obj[i].sessionState;
               user.sessionUserId = obj[i].sessionUserId;
               user.sessionUserToken = obj[i].sessionUserToken;
               user.sessionUserName = obj[i].sessionUserName;
               user.sessionUserImage = obj[i].sessionUserImage;
               user.sessionUserEmail = obj[i].sessionUserEmail;
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
                                option:6
			}, function(responseText) {
				$("#columnsUsers").html(responseText);
			});
      });
}
 function getInfoBar(establishmentId) {
     var starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
     starCountRef.once('value', function(snapshot) {
         var establishment = JSON.stringify(snapshot);
         var obj = JSON.parse(establishment);
         if(obj != null)
             establishmentObject = obj

         console.log(establishmentObject)

     });
 }
function selectUser(uidUser,userName){
    uidUserSelected = uidUser;
    userNameSelected = userName;
    $("#userSelected").html("ESPERE POR FAVOR");
    var starCountRef = firebase.database().ref('credits/'+$("#idEstablishment").val()+'/creditos/'+ uidUserSelected );
    starCountRef.once('value', function(snapshot) {
        var users = JSON.stringify(snapshot);
        var obj = JSON.parse(users);
        if(obj != null)
            creditosActuales = obj.credits
        else
            creditosActuales = 0
        $("#userSelected").html("Usuario seleccionado: "+userNameSelected+"<br/> UID:"+uidUserSelected+"<br/>" +
            "Creditos actuales:  "+creditosActuales);
    });
} 
function unVetoedUser(){
     var opciones="toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=420,height=500,top=85,left=140";
    window.open("/JukeboxAdministrator/servletUnVetoed?id="+establishment,"JUKEBOX USERS VETOED",opciones);
}
        