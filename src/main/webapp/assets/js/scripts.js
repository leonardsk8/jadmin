/* global firebase */

jQuery(document).ready(function() {
    
    // Initialize Firebase
          var config = {
            apiKey: "AIzaSyCDZi00XwcnAZtNscrre3yiguMuhFFNQdI",
            authDomain: "dispositivo1-202101.firebaseapp.com",
            databaseURL: "https://dispositivo1-202101.firebaseio.com",
            projectId: "dispositivo1-202101",
            storageBucket: "dispositivo1-202101.appspot.com",
            messagingSenderId: "629911785392"
          };

          firebase.initializeApp(config);
          
	
    /*
        Fullscreen background
    */
    /* $.backstretch("assets/img/backgrounds/1_1.jpg");*/

     /*
         Form validation
     */
    $('.login-form input[type="text"], .login-form input[type="password"], .login-form textarea').on('focus', function() {
    	$(this).removeClass('input-error');
    });
    
    $('.login-form').on('submit', function(e) {
    
    	$(this).find('input[type="text"], input[type="password"], textarea').each(function(){
    		if( $(this).val() == "" ) {
    			e.preventDefault();
    			$(this).addClass('input-error');
                        
    		}
    		else {
    			$(this).removeClass('input-error');
                        
    		}
    	});
        
        
//       firebase.auth().signInWithEmailAndPassword($("#").value, password).catch(function(error) {
//   Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  // ...
//});
    });


});

$( "#form-login" ).submit(function( event ) {
  if($("#form-username").val() !== "" & $("#form-password").val() !== ""){
      firebase.auth().signInWithEmailAndPassword($("#form-username").val(), $("#form-password").val()).then(function(result) {
          alert("Exito");
            
           var user = result.user;
           var ref = 'session/establishment/'+user.uid+'/users/'+user.uid;
           var db= firebase.database().ref(ref);
           var userDb = new Object();
           userDb.sessionDateStart="2018-06-25 00:18";
           userDb.sessionState = "active";
           userDb.sessionUserId =user.uid;
           userDb.sessionUserImage ="https://i1.wp.com/www.plumsteadbond.com/wp-content/uploads/2018/05/2hIOZ.gif?ssl=1";
           userDb.sessionUserName = "Admin";
           userDb.sessionUserToken = "1";
           
           db.set(userDb)
            .then(function(result) {
                console.log("Exito");
                   document.location.href = "/JukeboxAdministrator/servletHome?user="+user
                  .displayName+"&email="+user.email+"&id="+user.uid;

            }).catch(function (error) {
                alert(error);
                console.log("Error");
            });
      }
      ).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        
        alert("Error "+errorMessage);
        event.preventDefault();
});
event.preventDefault();
    //alert($("#form-username").val() + " "+ $("#form-password").val());  
  }
  event.preventDefault();
});

function signIn() {
    alert($("#form-username").val() + " "+ $("#form-password").val());
}

function signInGoogle(){
    if(!firebase.auth().currentUser){
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            alert("exito Google")
            console.log(user);
            //document.location.href = "/JukeboxAdministrator/servletHome?user="+user.displayName;
            
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            if(errorCode ==='')
                alert('Mismo usuario');
          });
    }else{
        firebase.auth().signOut();
    }
}
$('#btnGoogle').click(function() {
    signInGoogle();
    
});


