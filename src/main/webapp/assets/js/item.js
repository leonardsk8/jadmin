/* global firebase, YT, fetch */


var establishmentObject;
var numeroCancion = 0;
var player;
var array = [];
var auxArray = [];
var establishment;
var actualSongID;
var numSong = 1;
var indice = 0;
var Approved = [];
var arrayUsers = [];
var arrayUsersVetoed = [];
var uidUserSelected = "";
var aprobacion = true;
$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyD7-bVTa9iV2NNrlFqWqUMk-VQx9H4LnFs",
        authDomain: "dispositivo1-202101.firebaseapp.com",
        databaseURL: "https://dispositivo1-202101.firebaseio.com",
        projectId: "dispositivo1-202101",
        storageBucket: "dispositivo1-202101.appspot.com",
        messagingSenderId: "629911785392"
    };
    firebase.initializeApp(config);

    iniciar($("#idEstablishment").val());
    iniciarUsuarios($("#idEstablishment").val());
    establishment = $("#idEstablishment").val();
    getInfoBar(establishment);
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    $('#aprobacion').bootstrapToggle({
        on: 'SI',
        off: 'NO'
    });
    $('#registro').hide();
    verificarRegistro(establishment);
});

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '470',
        videoId: 'AXb3nrNL-v8',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    //event.target.mute();
    console.log("Listo el reproductorr");
    //event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING && !done) {
        //setTimeout(stopVideo, 6000);
        //done = true;
        console.log("reproduciendo");
    }
    if (event.data === YT.PlayerState.ENDED) {
        console.log("VIDEO FINALIZADO");
        if (array.length === 0)
            alert("nada que reproducir");
        else {
            removeSong(actualSongID, false, "");
            indice = 1;
            playVideo();
        }
    }
}

function stopVideo() {
    player.stopVideo();
    console.log("Video STOP");

}


function iniciarUsuarios(establishmentId) {
    var starCountRef = firebase.database().ref('session/establishment/' + establishmentId + '/users/');
    starCountRef.on('value', function (snapshot) {
        var songs = JSON.stringify(snapshot);
        var obj = JSON.parse(songs);
        var numUsers = 0;
        arrayUsers = [];
        for (let i in obj) {
            var user = {};
            user.sessionDateStart = obj[i].sessionDateStart;
            user.sessionState = obj[i].sessionState;
            user.sessionUserId = obj[i].sessionUserId;
            user.sessionUserToken = obj[i].sessionUserToken;
            user.sessionUserName = obj[i].sessionUserName;
            user.sessionUserImage = obj[i].sessionUserImage;
            user.sessionUserEmail = obj[i].sessionUserEmail;
            if (user.sessionState === "active" & user.sessionUserName !== "Admin")
                arrayUsers.push(user);
            else if (user.sessionState === "vetoed")
                arrayUsersVetoed.push(user);
        }

        console.log(arrayUsers);
        console.log(arrayUsersVetoed);
        var json = JSON.stringify(arrayUsers);
        $.post('servletItem', {
            json: json,
            option: 3
        }, function (responseText) {
            $("#columnsUsers").html(responseText);
        });
    });
}

$(function () {
    $('#aprobacion').change(function () {
        aprobacion = $(this).prop('checked');
        updateAprobacion(aprobacion);
    })
});

function limpiarUsuarios() {
    console.log("Limpiando usuarios");
    firebase.database().ref('session/establishment/' + establishment).remove();
}

function updateSessionUser(sessionDateStart, sessionState, sessionUserId, sessionUserName, sessionUserToken, sessionUserImage
    , sessionUserEmail) {
    var user = {};
    user.sessionDateStart = sessionDateStart;
    user.sessionState = sessionState;
    user.sessionUserId = sessionUserId;
    user.sessionUserName = sessionUserName;
    user.sessionUserImage = sessionUserImage;
    user.sessionUserToken = sessionUserToken;
    user.sessionUserEmail = sessionUserEmail;
    firebase.database().ref('session/establishment/' + establishment + '/users/' + sessionUserId + '/').set(user)
        .then(function (result) {
            alert("Usuario " + sessionUserName + " Vetado");
        }).catch(function (error) {
        alert("Error");
    });
}

function messageUser(uidBar, idUser, token) {
    var opciones = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=screen.width,height=screen.height,top=85,left=140";
    window.open("/JukeboxAdministrator/servletChat?id=" + uidBar + "&idUser=" + idUser + "&token=" + token, "JUKEBOX CHAT", opciones);
}

function unVetoedUser() {
    var opciones = "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=420,height=500,top=85,left=140";
    window.open("/JukeboxAdministrator/servletUnVetoed?id=" + establishment, "JUKEBOX USERS VETOED", opciones);
}

function iniciar(establishmentId) {

    var starCountRef = firebase.database().ref('reproduction_list/establishment/' + establishmentId + '/songs');
    starCountRef.on('value', function (snapshot) {

        var songs = JSON.stringify(snapshot);
        var obj = JSON.parse(songs);
        var numSongs = 0;
        array = [];
        Approved = [];
        1;
        for (let i in obj) {
            var mySong = {};
            mySong.name = obj[i].name;
            mySong.video_id = obj[i].video_id;
            mySong.approved = obj[i].approved;
            mySong.num = obj[i].num;
            mySong.thumbnail = obj[i].thumbnail;
            mySong.user = obj[i].user;
            mySong.userId = obj[i].userId;
            mySong.likes = obj[i].likes;
            mySong.reproducing = obj[i].reproducing;
            mySong.token = obj[i].token;
            if (mySong.approved === true)
                array.push(mySong);
            else
                Approved.push(mySong);
            numSongs++;

        }
        // array = array.sort(function (a, b) {
        //     if (a.num > b.num) {
        //         return 1;
        //     }
        //     if (a.name < b.num) {
        //         return -1;
        //     }
        //     // a must be equal to b
        //     return 0;
        // });
        var json = JSON.stringify(array);
        $.post('servletItem', {
            json: json,
            option: 1
        }, function (responseText) {
            $("#columnsSongs").html(responseText);
            if (array.length === 1 || actualSongID === undefined)
                $('#btnNext').prop('disabled', true);
            else
                $('#btnNext').prop('disabled', false);
        });
        var toBeApproved = JSON.stringify(Approved);
        $.post('servletItem', {
            json: toBeApproved,
            option: 2
        }, function (responseText) {
            $("#columnsSongsToApproved").html(responseText);
        });

        $.get('servletItem', {
            json: JSON.stringify(array),
            option: 3
        }, function (responseText) {
            array = [];
            array = JSON.parse(responseText);
            auxArray = array;
        });
        getNumSong();

    });
}

function getNumSong() {
    $.get('servletItem', {
        json: JSON.stringify(array),
        option: 4
    }, function (responseText) {
        numeroCancion = responseText;

    });

}

function recargar(creditos) {
    var creditsObj = {};
    creditsObj.credits = String(creditos);
    creditsObj.idUser = uidUserSelected;
    firebase.database().ref('credits/' + $("#idEstablishment").val() + '/creditos/' + uidUserSelected).set(creditsObj)
        .then(function (result) {
            alert("Cancelada con exito Se ha devuelto 1 credito");
        }).catch(function (error) {
        alert("Error cancelando ");
    });

}

function selectUser(uidUser) {
    uidUserSelected = uidUser;
    var starCountRef = firebase.database().ref('credits/' + $("#idEstablishment").val() + '/creditos/' + uidUserSelected);
    starCountRef.once('value', function (snapshot) {
        var users = JSON.stringify(snapshot);
        var obj = JSON.parse(users);
        if (obj != null)
            creditosActuales = obj.credits;
        else
            creditosActuales = 0;
        var sum = parseInt(1) + parseInt(creditosActuales);
        recargar(sum)
    });
}

function setHistorySong(nameSong, state, idVideo, userId) {
    var mySongHistory = {};
    var f = new Date();
    var minutes = f.getMinutes() + "";
    minutes = minutes.length === 1 ? "0" + f.getMinutes() : "" + f.getMinutes();
    var date = f.getHours() + ":" + minutes + " " + f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    mySongHistory.idUser = userId;
    mySongHistory.idBar = $("#idEstablishment").val();
    mySongHistory.nameSong = nameSong;
    mySongHistory.dateSong = date;
    mySongHistory.stateSong = state;
    mySongHistory.thumnailSong = "https://img.youtube.com/vi/" + idVideo + "/mqdefault.jpg";
    mySongHistory.nameBar = establishmentObject.name;
    mySongHistory.videoIdSong = idVideo;
    firebase.database().ref('history/users/song/' + userId + "/" + idVideo).set(mySongHistory)
        .then(function (result) {
            console.log("Exito historial");
        }).catch(function (error) {
        console.log("Error historial");
    });
}

function removeSong(idVideo, notify, token, nameSong, idUser) {


    if (notify === true) {
        selectUser(idUser);
        setHistorySong(nameSong, "Rechazada", idVideo, idUser);
    }
    firebase.database().ref('reproduction_list/establishment/' + establishment + '/songs/' + idVideo).remove();
    console.log("FINALIZANDO");
    if (notify === true) {
        var key = 'AAAAkqmrD7A:APA91bE12xZ3Vk6wh6-yPHl8J3rKUG7d2fjwu2CN4KJJe-s-DNs2-qOztqrsQTdroihH0AzXerWkfCVzpIpBAHvE9NAwVWa98r6FKZV2mwNc6aLcYcXf-XND0XRaxapnYAzmV0DpQek4';
        var to = token;
        var message = {
            'title': 'CANCION NO APROBADA',
            'body': nameSong + ' NO APROBADA'
        };
        fetch('https://fcm.googleapis.com/fcm/send', {
            'method': 'POST',
            'headers': {
                'Authorization': 'key=' + key,
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                'notification': message,
                'to': to
            })
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.error(error);
        });
    }
}

function updateState(mySong) {
    firebase.database().ref('reproduction_list/establishment/' + establishment + '/songs/' + actualSongID).set(mySong);
}

function playVideo() {
    var songToPlay = "";
    var mySong;
    mySong = {};
    mySong.name = auxArray[indice].name;
    mySong.video_id = auxArray[indice].video_id;
    mySong.approved = auxArray[indice].approved;
    mySong.num = auxArray[indice].num + "";
    mySong.thumbnail = auxArray[indice].thumbnail;
    mySong.user = auxArray[indice].user;
    mySong.reproducing = true;
    mySong.likes = auxArray[indice].likes;
    actualSongID = mySong.video_id;
    songToPlay = mySong.video_id;
    updateState(mySong);
    player.loadVideoById(songToPlay, 0, "medium");
}

$("#btnPlay").click(function () {
    indice = 0;
    if (array.length === 0)
        alert("nada que reproducir");
    else
        playVideo();
});
$("#btnNext").click(function () {
    indice = 0;
    if (array.length === 0)
        alert("nada que reproducir");
    else {
        if (array.length === 1 || actualSongID === undefined) {
            indice = 0;
        }
        if (actualSongID !== undefined)
            removeSong(actualSongID, false, "");
        indice = 1;
        playVideo();
    }

});

function toReproductionList(nameSong, idSong, establishmentId, thumbnail, user, userToken, userId, history) {
    var mySong = {};
    var numeroCancion2 = parseInt(array.length) + parseInt(1);
    // if(numeroCancion2 !== numeroCancion)
    //     numeroCancion = auxArray.length;
    mySong.name = nameSong;
    mySong.video_id = idSong;
    mySong.approved = true;
    mySong.num = numeroCancion + "";
    mySong.thumbnail = thumbnail;
    mySong.user = user;
    mySong.reproducing = false;
    mySong.likes = 0;
    mySong.userToken = userToken;
    array.push(mySong);
    firebase.database().ref('reproduction_list/establishment/' + establishmentId + '/songs/' + idSong).set(mySong)
        .then(function (result) {
            $("#answer").val("true");
            //alert("Exito");
        }).catch(function (error) {
        alert("Error poniendo canción en lista de reproducción: " + error);
    });
    if (userId !== "")
        setHistorySong(nameSong, "Aprobada", idSong, userId)
}

function getInfoBar(establishmentId) {
    var starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
    starCountRef.once('value', function (snapshot) {
        var establishment = JSON.stringify(snapshot);
        var obj = JSON.parse(establishment);
        if (obj != null)
            establishmentObject = obj;
        if (establishmentObject.requestApproved === undefined || establishmentObject.requestApproved === false)
            $('#aprobacion').bootstrapToggle('off');
        else
            $('#aprobacion').bootstrapToggle('on')
    });
}

function updateAprobacion(flag) {
    firebase.database().ref('establishment/bares/' + establishmentObject.id + "/requestApproved").set(flag)
        .then(function (result) {
            console.log("Función aprobación actualizada")
        }).catch(function (error) {
        console.log("Error historial");
    });
}
function verificarRegistro(establishmentId){
    var starCountRef = firebase.database().ref('registry/establishment/' + establishmentId);
    starCountRef.once('value', function (snapshot) {
        var establishment = JSON.stringify(snapshot);
        var obj = JSON.parse(establishment);
        console.log("Buscando Registro ");
        if (obj != null)
            establishmentObject = obj;
        if(establishmentObject.value === undefined || establishmentObject.value === false){
            $('#registro').show();
            console.log("Registro Incompleto");
        }
        else{
            $('#registro').hide();
            console.log("Registro Completado");

        }
    });
}