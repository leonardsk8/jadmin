/* global firebase */

var map;
var markers = [];
var storageService;
var storageRef;
var establishment;
var numPhotos=0;
var numPhotosUpload=0;
var photos = [];
//dayCheck
var mondayC = 0;
var tuesdayC= 0;
var wednesdayC= 0;
var thursdayC= 0;
var fridayC= 0;
var saturdayC= 0;
var sundayC= 0;
//dayStart
var mondayS;
var tuesdayS;
var wednesdayS;
var thursdayS;
var fridayS;
var saturdayS;
var sundayS;
//dayEnd
var mondayE;
var tuesdayE;
var wednesdayE;
var thursdayE;
var fridayE;
var saturdayE;
var sundayE;


//Variables para guardar en Firebase
var address = "";
var description = "";
var email = "";
var genders = "";
var id = "";
var images = "";
var latitude =0 ;
var lenght =0;
var name = "";
var phone = "";
var qrcontent = "";
var raiting = 0;
var schedules = "";
var schedulesHours = "";
//fin variables

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
    storageService = firebase.storage();
    storageRef = storageService.ref();
    establishment = $("#idEstablishment").val();
    getRating(establishment);
    $('.genders').select2();

    $(".genders").select2({
        maximumSelectionLength: 3
    });
    $('#selectMondayStart').prop('disabled', 'disabled');
    $('#selectMondayEnd').prop('disabled', 'disabled');
    $('#selectTuesdayStart').prop('disabled', 'disabled');
    $('#selectTuesdayEnd').prop('disabled', 'disabled');
    $('#selectWednesdayStart').prop('disabled', 'disabled');
    $('#selectWednesdayEnd').prop('disabled', 'disabled');
    $('#selectThursdayStart').prop('disabled', 'disabled');
    $('#selectThursdayEnd').prop('disabled', 'disabled');
    $('#selectFridayStart').prop('disabled', 'disabled');
    $('#selectFridayEnd').prop('disabled', 'disabled');
    $('#selectSaturdayStart').prop('disabled', 'disabled');
    $('#selectSaturdayEnd').prop('disabled', 'disabled');
    $('#selectSundayStart').prop('disabled', 'disabled');
    $('#selectSundayEnd').prop('disabled', 'disabled');

});

function setObject(bar) {
    firebase.database().ref('establishment/bares/' + establishment).set(bar).then(()=>{
        alert("Exito guardando");
        document.location.href = "/JukeboxAdministrator/servletHome?user=null"+"&email="+email+"&id="+establishment;
    });
}

$("#botonGuardar").click(function () {
    if(latitude === 0 & lenght === 0){
        alert("debe seleccionar una ubicación en el mapa");
        return;
    }
    if($("#nombreBar").val() === "" || $("#descripcionBar").val() === ""||$("#genders").val() === ""
        ||$("#direccionBar").val() === ""||$("#telefonoBar").val() === ""){
        alert("Faltan campos por diligenciar");
        return;
    }
    var tamano = photos.length;
    if(tamano === 0){
        alert("Debes subir almenos una foto");
        return;
    }
    photos.forEach( function(valor, indice, array) {
        images += valor;
        if(tamano!= indice-1)
            images += "~";
    });

    var gendersArray = $("#genders").val();
    id = establishment;
    name = $("#nombreBar").val();
    description = $("#descripcionBar").val();
    address = $("#direccionBar").val();
    phone = $("#telefonoBar").val();
    email = $("#emailBar").val();
    qrcontent = id;
    var tamano2 = gendersArray.length;
    gendersArray.forEach( function(valor, indice, array) {
        genders += valor;
        if(tamano2!= indice-1)
            genders += "-";
    });
    schedules = mondayC+"-"+tuesdayC+"-"+wednesdayC+"-"+thursdayC+"-"+fridayC+"-"+saturdayC+"-"+sundayC;
    if(mondayC === 0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectMondayStart" ).val()+" - "+$( "#selectMondayEnd" ).val()+"/";
    }
    if(tuesdayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectTuesdayStart" ).val()+" - "+$( "#selectTuesdayEnd" ).val()+"/";
    }
    if(wednesdayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectWednesdayStart" ).val()+" - "+$( "#selectWednesdayEnd" ).val()+"/";
    }
    if(tuesdayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectThursdayStart" ).val()+" - "+$( "#selectThursdayEnd" ).val()+"/";
    }
    if(fridayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectFridayStart" ).val()+" - "+$( "#selectFridayEnd" ).val()+"/";
    }
    if(saturdayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectSaturdayStart" ).val()+" - "+$( "#selectSaturdayEnd" ).val()+"/";
    }
    if(sundayC ===0){
        schedulesHours += "CERRADO/";
    }else{
        schedulesHours += $( "#selectSundayStart" ).val()+" - "+$( "#selectSundayEnd" ).val()+"/";
    }
    var bar = {};
    bar.id = id;
    bar.name = name;
    bar.description = description;
    bar.genders = genders;
    bar.address = address;
    bar.phone = phone;
    bar.qrcontent = qrcontent;
    bar.schedules = schedules;
    bar.latitude = latitude;
    bar.lenght = lenght;
    bar.email = email;
    bar.raiting = raiting;
    bar.schedulesHours = schedulesHours;
    bar.images = images;
    setObject(bar);
});


function getRating(establishmentId) {
    var starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
    starCountRef.once('value', function(snapshot) {
        var users = JSON.stringify(snapshot);
        var obj = JSON.parse(users);
        if(obj != null)
            raiting = obj.raiting;
        else
            raiting = 0;
    });
}
//SCHEDULE
var updateChecked = function(){
    if($('#mondayChecked').is(":checked")){
        $('#selectMondayStart').prop('disabled', false);
        $('#selectMondayEnd').prop('disabled', false);
        mondayC = 1;
    }
    else{
        $('#selectMondayStart').prop('disabled', 'disabled');
        $('#selectMondayEnd').prop('disabled', 'disabled');
        mondayC = 0;
    }
    if($('#tuesdayChecked').is(':checked')){
        $('#selectTuesdayStart').prop('disabled', false);
        $('#selectTuesdayEnd').prop('disabled', false);
        tuesdayC = 1;
    }else{
        $('#selectTuesdayStart').prop('disabled', 'disabled');
        $('#selectTuesdayEnd').prop('disabled', 'disabled');
        tuesdayC = 0;
    }
    if($('#wednesdayChecked').is(':checked')){
        $('#selectWednesdayStart').prop('disabled', false);
        $('#selectWednesdayEnd').prop('disabled', false);
        wednesdayC = 1;
    }else{
        $('#selectWednesdayStart').prop('disabled', 'disabled');
        $('#selectWednesdayEnd').prop('disabled', 'disabled');
        wednesdayC = 0;
    }
    if($('#thursdayChecked').is(':checked')){
        $('#selectThursdayStart').prop('disabled', false);
        $('#selectThursdayEnd').prop('disabled', false);
        thursdayC=1;
    }else{
        $('#selectThursdayStart').prop('disabled', 'disabled');
        $('#selectThursdayEnd').prop('disabled', 'disabled');
        thursdayC=0;
    }
    if($('#fridayChecked').is(':checked')){
        $('#selectFridayStart').prop('disabled', false);
        $('#selectFridayEnd').prop('disabled', false);
        fridayC = 1;
    }else{
        $('#selectFridayStart').prop('disabled', 'disabled');
        $('#selectFridayEnd').prop('disabled', 'disabled');
        fridayC = 0;
    }
    if($('#saturdayChecked').is(':checked')){
        $('#selectSaturdayStart').prop('disabled', false);
        $('#selectSaturdayEnd').prop('disabled', false);
        saturdayC=1;
    }else{
        $('#selectSaturdayStart').prop('disabled', 'disabled');
        $('#selectSaturdayEnd').prop('disabled', 'disabled');
        saturdayC=0;
    }
    if($('#sundayChecked').is(':checked')){
        $('#selectSundayStart').prop('disabled', false);
        $('#selectSundayEnd').prop('disabled', false);
        sundayC=1;
    }else{
        $('#selectSundayStart').prop('disabled', 'disabled');
        $('#selectSundayEnd').prop('disabled', 'disabled');
        sundayC=0;
    }
};

$(updateChecked)
$("#mondayChecked").change(updateChecked);
$("#tuesdayChecked").change(updateChecked);
$("#wednesdayChecked").change(updateChecked);
$("#thursdayChecked").change(updateChecked);
$("#fridayChecked").change(updateChecked);
$("#saturdayChecked").change(updateChecked);
$("#sundayChecked").change(updateChecked);

var map;
var markers = [];

//Map
function initMap() {
    var bogota = {lat: 4.6097102, lng: -74.081749};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: bogota
    });
    // This event listener will call addMarker() when the map is clicked.
    map.addListener('click', function(event) {
        addMarker(event.latLng);
        latitude =event.latLng.lat();
        lenght =event.latLng.lng();
    });

    addMarker(bogota);
}

function addMarker(location) {
    deleteMarkers()
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });

    markers.push(marker);
}

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
function clearMarkers() {
    setMapOnAll(null);
}

function deleteMarkers() {
    clearMarkers();
    markers = [];
}

//upload file

document.querySelector('.file-select1').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let photo1,photo2,photo3,photo4,photo5,photo6;
function handleFileUploadChange(e){
    photo1 = e.target.files[0];
    photo2 = e.target.files[1];
    photo3 = e.target.files[2];
    photo4 = e.target.files[3];
    photo5 = e.target.files[4];
    photo6 = e.target.files[5];
}

function handleFileUploadSubmit(){
    if(photo1 == null){
        alert("Debe seleccionar almenos una imagen");
        return;
    }
    if(photo2 != null)
    var photo1ext = photo1.name.split(".");
    if(photo2 != null)
    var photo2ext = photo2.name.split(".");
    if(photo3 != null)
    var photo3ext = photo3.name.split(".");
    if(photo4 != null)
    var photo4ext = photo4.name.split(".");
    if(photo5 != null)
    var photo5ext = photo5.name.split(".");
    if(photo6 != null)
    var photo6ext = photo6.name.split(".");

    if(photo1 != null){
        numPhotos++;
        const uploadTask = storageRef.child(`imagesBar/${establishment}/1.${photo1ext}`).put(photo1); //create a child directory called images, and place the file inside this directory
        uploadTask
            .then(snapshot =>
                snapshot.ref.getDownloadURL()).then((url) =>
                {
                    document.getElementById("result1").innerHTML = "<h5>Foto 1 cargada con exito </h5>";
                numPhotosUpload++;
                    photos.push(url);
            })
            .catch(console.error);
    }
    if(photo2 != null){
        numPhotos++;
        const uploadTask2 = storageRef.child(`imagesBar/${establishment}/2.${photo2ext}`).put(photo2); //create a child directory called images, and place the file inside this directory
        uploadTask2
            .then(snapshot =>
                snapshot.ref.getDownloadURL()).then((url) =>
        {
            document.getElementById("result2").innerHTML = "<h5>Foto 2 cargada con exito </h5>";
            numPhotosUpload++;
            photos.push(url);
        })
            .catch(console.error);
    }
    if(photo3 != null){
        numPhotos++;
            const uploadTask3 = storageRef.child(`imagesBar/${establishment}/3.${photo3ext}`).put(photo3); //create a child directory called images, and place the file inside this directory
        uploadTask3
            .then(snapshot =>
                snapshot.ref.getDownloadURL()).then((url) =>
        {
            numPhotosUpload++;
            photos.push(url);
            document.getElementById("result3").innerHTML = "<h5>Foto 3 cargada con exito </h5>";
        })
            .catch(console.error);
    }
    if(photo4 != null){
        numPhotos++;
            const uploadTask4 = storageRef.child(`imagesBar/${establishment}/4.${photo4ext}`).put(photo4); //create a child directory called images, and place the file inside this directory
        uploadTask4
            .then(snapshot =>
                snapshot.ref.getDownloadURL()).then((url) =>
        {
            numPhotosUpload++;
            photos.push(url);
            document.getElementById("result4").innerHTML = "<h5>Foto 4 cargada con exito </h5>";
        })
            .catch(console.error);
    }
    if(photo5 != null){
        numPhotos++;
            const uploadTask5 = storageRef.child(`imagesBar/${establishment}/5.${photo5ext}`).put(photo5); //create a child directory called images, and place the file inside this directory
        uploadTask5
            .then(snapshot =>
                snapshot.ref.getDownloadURL()).then((url) =>
        {
            document.getElementById("result5").innerHTML = "<h5>Foto 5 cargada con exito </h5>";
            numPhotosUpload++;
            photos.push(url);
        })
            .catch(console.error);
    }
    if(photo6 != null){
        numPhotos++;
        const uploadTask6 = storageRef.child(`imagesBar/${establishment}/6.${photo6ext}`).put(photo6); //create a child directory called images, and place the file inside this directory
    uploadTask6
        .then(snapshot =>
            snapshot.ref.getDownloadURL()).then((url) =>
    {
        document.getElementById("result6").innerHTML = "<h5>Foto 6 cargada con exito </h5>";
        numPhotosUpload++;
        photos.push(url);
    })
        .catch(console.error);
    }
}



