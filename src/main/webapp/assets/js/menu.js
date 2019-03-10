/* global firebase */

var establishmentObject;
var establishment;
var images = "";
var edit=false;
var code = 0;
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
    getInfoBar(establishment);
    $("#mostrarmodal").modal("hide");
    $("#items").show();
    $("#register").hide();
    getMenu(establishment);
});
document.querySelector('.file-select1').addEventListener('change', handleFileUploadChange);
document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);
let photo1;
function handleFileUploadChange(e){
    photo1 = e.target.files[0];
}
function handleFileUploadSubmit(){
    if(photo1 == null){
        alert("Debe seleccionar una imagen");
        return;
    }
    var photo1ext = photo1.name.split(".");
    document.getElementById("result1").innerHTML = "<h5>CARGANDO FOTO POR FAVOR ESPERE </h5>";
    const uploadTask = storageRef.child(`imagesBar/${establishment}/1.${photo1ext}`).put(photo1); //create a child directory called images, and place the file inside this directory
    uploadTask
        .then(snapshot =>
            snapshot.ref.getDownloadURL()).then((url) =>
    {
        document.getElementById("result1").innerHTML = "<h5>Foto cargada con exito </h5>";
        images = url;
        $('#img1').prop('src', url);
        $('#img1').prop('class', "img-thumbnail");
    })
        .catch(console.error);
}
$("#newProduct").on( "click", function () {
    $("#items").hide();
    $("#register").show();
    $("#descriptionProduct").val("");
    $("#nameProduct").val("");
    $("#price").val("");
    $("#img1").removeAttr("src");
    images = "";
    photo1 = "";
    edit=false;
} );
$("#registrarPromo").on("click",function () {
    $("#mostrarmodal").modal("show");
    if(photo1 == null || images===""){
        document.getElementById("contentMessage").innerHTML = "<h5>Debe subir una imagen</h5>";
        return;
    }
    document.getElementById("contentMessage").innerHTML = "<h5>Cargando</h5>";
    var menu_code;
    if(edit)
        menu_code = code;
    else
        menu_code = getRandomInt(1,50);
    var menu_description = $("#descriptionProduct").val();
    var menu_name = $("#nameProduct").val();
    var menu_image = images;
    var menu_price = $("#price").val();
    console.log(menu_price);
    if(menu_price===""){
        document.getElementById("contentMessage").innerHTML = "<h5>El campo precio no puede estar vacio</h5>";
        return;
    }
    var menu = {};
    console.log(menu_description)
    console.log(menu_name)
    console.log(menu_image)
    console.log(menu_code)
    if(menu_description === "" || menu_description === ""){
        document.getElementById("contentMessage").innerHTML = "<h5>Debe completar todos los campos</h5>";
        return;
    }
    menu.description=menu_description;
    menu.id=establishment;
    menu.idProduct=menu_code;
    menu.image=images;
    menu.name=menu_name;
    menu.price=parseInt(menu_price);
    setObject(menu)
});
function setObject(menu) {
    firebase.database().ref('menu/establishment/'+establishment+'/product/'+menu.idProduct).set(menu).then(()=>{
        document.getElementById("contentMessage").innerHTML = "<h5>Promoción guardada con exito</h5>";
        $("#items").show();
        $("#register").hide();
    });
}
function el(el) {
    return document.getElementById(el);
}
el('price').addEventListener('input',function() {
    var val = this.value;
    this.value = val.replace(/\D|\-/,'');
});
$("#cerrarPromo").on('click',function () {
    $("#items").show();
    $("#register").hide();
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function getMenu(establishmentId) {
    var starCountRef = firebase.database().ref('menu/establishment/'+establishmentId+'/product');
    starCountRef.on('value', function(snapshot) {
        var promotions = JSON.stringify(snapshot);
        var obj = JSON.parse(promotions);
        var concatenacion = "";
        $(".gallery_product").remove();
        for(let i in obj) {
            var menu = {};
            menu.description = obj[i].description;
            menu.id = obj[i].id;
            menu.idProduct = obj[i].idProduct;
            menu.image = obj[i].image;
            menu.name = obj[i].name;
            menu.price = obj[i].price;
            concatenacion += "<div style='text-align: center' class='gallery_product col-lg-4 col-md-4 col-sm-4 " +
                "col-xs-6'>" +
                "<img width='150px' height='250px' src='" + menu.image + "' class='img-responsive'>" +
                "<div style='text-align: center'>" +
                "<button class='btn btn-info' onclick='editPromo(" + menu.idProduct + ")'>Editar</button>" +
                "<button class='btn btn-danger' onclick='deletePromo(" + menu.idProduct + ")'>Eliminar</button>" +
                "</div></div>";
        }
        $("#mainContent").after(concatenacion);
    });
}
function editPromo(menu_code) {
    $("#register").show();
    $("#items").hide();
    $("#mostrarmodal").modal("show");
    document.getElementById("contentMessage").innerHTML = "<h5>Cargando</h5>";
    edit=true;
    code = menu_code;
    var starCountRef = firebase.database().ref('menu/establishment/'+establishment+'/product/'+menu_code);
    starCountRef.once('value', function(snapshot) {
        var products = JSON.stringify(snapshot);
        var obj = JSON.parse(products);
        $(".gallery_product").remove();
        if(obj!=null){
            var menu = {};
            menu.description=obj.description;
            menu.id=obj.id;
            menu.idProduct=obj.idProduct;
            menu.image=obj.image;
            menu.name=obj.name;
            menu.price=obj.price;
            $("#descriptionProduct").val(menu.description);
            $("#nameProduct").val(menu.name);
            $("#price").val(menu.price);
            images = menu.image;
            photo1 = ""
            document.getElementById("contentMessage").innerHTML = "<h5>Producto cargado<br/>Ya puede cerrar" +
                "la ventana</h5>";
            $('#img1').prop('src', images);
            $('#img1').prop('class', "img-thumbnail");
        }
    });
}
function deletePromo(menu_code) {
    firebase.database().ref('menu/establishment/'+establishment+'/product/'+menu_code).remove();
}
function getInfoBar(establishmentId) {
    var starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
    starCountRef.once('value', function(snapshot) {
        var establishment = JSON.stringify(snapshot);
        var obj = JSON.parse(establishment);
        if(obj != null){
            establishmentObject = obj
        }
        else{
            $("#message").html("TU BAR NO APARECERA HASTA COMPLETAR TU REGISTRO");
        }

    });
}