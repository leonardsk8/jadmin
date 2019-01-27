

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