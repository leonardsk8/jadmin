

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
    // var user = firebase.auth().currentUser;
    // if(user){
    //     var name, email, uid;
    //     name = user.displayName;
    //     email = user.email;
    //     uid = user.uid;
    //     console.log("Sesión ya iniciada");
    //                 document.location.href = "/JukeboxAdministrator/servletHome?user="+name
    //                     +"&email="+email+"&id="+uid;
    // }

/*Inicio script logIn*/
console.log('INICIO JQUERY')
$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if( $this.val() === '' ) {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
            label.removeClass('highlight');
        }
        else if( $this.val() !== '' ) {
            label.addClass('highlight');
        }
    }

});




$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');


    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});

/* script logIn*/


});

function setEstadistics(uid) {
    var connect = {
        plot:{
            1:{
                label:"Lun",
                value:getRandomInt(0,20)
            },
            2:{
                label:"Mar",
                value:getRandomInt(0,15)
            },
            3:{
                label:"Mier",
                value:getRandomInt(10,20)
            },
            4:{
                label:"Juev",
                value:getRandomInt(10,30)
            },
            5:{
                label:"Vier",
                value:getRandomInt(30,70)
            },
            6:{
                label:"Saba",
                value:getRandomInt(0,20)
            },
            7:{
                label:"Domi",
                value:getRandomInt(0,20)
            }
        }
    };
    var visit = {
        plot:{
            1:{
                label:"Lun",
                value:getRandomInt(0,20)
            },
            2:{
                label:"Mar",
                value:getRandomInt(0,15)
            },
            3:{
                label:"Mier",
                value:getRandomInt(10,20)
            },
            4:{
                label:"Juev",
                value:getRandomInt(10,30)
            },
            5:{
                label:"Vier",
                value:getRandomInt(30,70)
            },
            6:{
                label:"Saba",
                value:getRandomInt(0,20)
            },
            7:{
                label:"Domi",
                value:getRandomInt(0,20)
            }
        }
    };
    var songs = {
        plot:{
            1:{
                label:"Enviadas",
                value:getRandomInt(40,60)
            },
            2:{
                label:"Aprobadas",
                value:getRandomInt(10,30)
            },
            3:{
                label:"Rechazadas",
                value:getRandomInt(0,10)
            }
        }
    };
    firebase.database().ref('reports/establishment/' + uid + '/connect').set(connect);
    firebase.database().ref('reports/establishment/' + uid + '/songs').set(songs);
    firebase.database().ref('reports/establishment/' + uid + '/visit').set(visit);
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

$( "#form-login" ).submit(function( event ) {

    if($("#form-username").val() !== "" & $("#form-password").val() !== ""){
        firebase.auth().signInWithEmailAndPassword($("#form-username").val(), $("#form-password").val()).then(function(result) {
                alert("Exito");

                var user = result.user;
                var ref = 'session/establishment/'+user.uid+'/users/'+user.uid;
                var db= firebase.database().ref(ref);
                var userDb = {};
                userDb.sessionDateStart="2018-06-25 00:18";
                userDb.sessionState = "active";
                userDb.sessionUserId =user.uid;
                userDb.sessionUserImage ="https://i1.wp.com/www.plumsteadbond.com/wp-content/uploads/2018/05/2hIOZ.gif?ssl=1";
                userDb.sessionUserName = "Admin";
                userDb.sessionUserToken = "1";
                user = firebase.auth().currentUser;
                if(user){
                    var name, email, photoUrl, uid, emailVerified;
                    name = user.displayName;
                    email = user.email;
                    photoUrl = user.photoURL;
                    emailVerified = user.emailVerified;
                    uid = user.uid;
                    if(emailVerified){
                        setEstadistics(uid);
                    db.set(userDb)
                    .then(function(result) {
                        console.log("Exito");
                        document.location.href = "/JukeboxAdministrator/servletHome?user="+name
                            +"&email="+email+"&id="+uid;

                    }).catch(function (error) {
                    alert(error);
                    console.log("Error");
                        });
                    }
                    else
                        alert("Se ha enviado un email para su verificación");
                }
                else
                    alert("Usuario = null");
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
$( "#formRegister" ).submit(function( event ) {

    if($("#email-register").val() !== "" & $("#password-register").val() !== ""
        & $("#repassword-register").val() !== ""){
        if($("#repassword-register").val() === $("#password-register").val()){
            firebase.auth().createUserWithEmailAndPassword($("#email-register").val(), $("#password-register").val()).then(function(result) {
                alert("Registro exitoso");
                var user = firebase.auth().currentUser;
                user.sendEmailVerification().then(function () {
                    alert("Se ha enviado un correo de verificación");
                }).catch(function (error) {
                    alert("Error: "+error.message);
                });
                console.log(result)
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert("Error: "+errorMessage)
                event.preventDefault();
            });
        }else {
            alert("LAS CONTRASEÑAS NO COINCIDEN");
            event.preventDefault();
        }
    }
    event.preventDefault();
});