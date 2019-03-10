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
    $(".filter-buttonC").click(function(){
        var value = $(this).attr('data-filter');

        if(value == "todo")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('1000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('3000');
            $('.filter').filter('.'+value).show('3000');

        }
    });

    if ($(".filter-button").removeClass("active")) {
        $(this).removeClass("active");
    }
    $(this).addClass("active");

    $("#items").show();
    $("#register").hide();


    getPromotions(establishment);
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
$("#newPromotion").on( "click", function () {
    $("#items").hide();
    $("#register").show();
    $("#descriptionPromo").val("");
    $("#namePromo").val("");
    $("#endDate").val("");
    $("#endHour").val("");
    $("#limitPromo").val("");
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
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var HH = today.getHours();
    var MM = today.getMinutes();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var fechaExp = $("#endDate").val();
    var horaExp = $("#endHour").val();
    console.log(fechaExp)
    console.log(horaExp)
    if(fechaExp==="" ){
        document.getElementById("contentMessage").innerHTML = "<h5>El campo fecha no puede estar vacio</h5>";
        return;
    }if(horaExp===""){
        document.getElementById("contentMessage").innerHTML = "<h5>El campo hora no puede estar vacio</h5>";
        return;
    }

    var pro_creation_day = yyyy + '-' + mm + '-' + dd +' ' + HH + ':' + MM;
    var pro_code;
    if(edit)
        pro_code = code;
    else
        pro_code = getRandomInt(1,1000);
    var pro_count = 0;
    var pro_description = $("#descriptionPromo").val();
    var pro_name = $("#namePromo").val();
    var pro_expiration_date = fechaExp+" "+horaExp;
    var pro_image = images;
    var pro_limit = $("#limitPromo").val();
    console.log(pro_limit);
    if(pro_limit===""){
        document.getElementById("contentMessage").innerHTML = "<h5>El campo limite no puede estar vacio</h5>";
        return;
    }
    var promo = {};
    console.log(pro_description)
    console.log(pro_name)
    console.log(pro_expiration_date)
    console.log(pro_image)
    console.log(pro_code)
    if(pro_description === "" || pro_name === ""){
        document.getElementById("contentMessage").innerHTML = "<h5>Debe completar todos los campos</h5>";
        return;
    }
    var val = fechasDif(pro_creation_day,pro_expiration_date)
    console.log(val);
    if(val < 0 ){
        document.getElementById("contentMessage").innerHTML = "<h5>Error en la fecha de vencimiento</h5>";
        return;
    }
    promo.pro_creation_day = pro_creation_day;
    promo.pro_code = pro_code+"";
    promo.pro_count = pro_count;
    promo.pro_description = pro_description;
    promo.pro_name = pro_name;
    promo.pro_expiration_date = pro_expiration_date;
    promo.pro_image = pro_image;
    promo.pro_limit = pro_limit;
    setObject(promo)
});
function setObject(promo) {
    firebase.database().ref('promotions/establishment/' + establishment+"/create/"+promo.pro_code).set(promo).then(()=>{
        document.getElementById("contentMessage").innerHTML = "<h5>Promoción guardada con exito</h5>";
        $("#items").show();
        $("#register").hide();
    });
}
function el(el) {
    return document.getElementById(el);
}
el('limitPromo').addEventListener('input',function() {
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
function getPromotions(establishmentId) {
    var starCountRef = firebase.database().ref('promotions/establishment/'+establishmentId+'/create');
    starCountRef.on('value', function(snapshot) {
        var promotions = JSON.stringify(snapshot);
        var obj = JSON.parse(promotions);
        var concatenacion = "";
        $(".gallery_product").remove();
        for(let i in obj){
            var promotion = {};
            promotion.pro_code=obj[i].pro_code;
            promotion.pro_count=obj[i].pro_count;
            promotion.pro_creation_date=obj[i].pro_creation_date;
            promotion.pro_description=obj[i].pro_description;
            promotion.pro_expiration_date=obj[i].pro_expiration_date;
            promotion.pro_image=obj[i].pro_image;
            promotion.pro_limit=obj[i].pro_limit;
            promotion.pro_name=obj[i].pro_name;
            var currentdate = new Date();
            var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-"
                + currentdate.getDate() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes();
            console.log(promotion.pro_name);
            var val = fechasDif(datetime,promotion.pro_expiration_date);
            var filtro = "todo";
            if(val===1){
                filtro ="vigente";
            }
            else{
                filtro ="vencido";
            }
            concatenacion +="<div style='text-align: center' class='gallery_product col-lg-4 col-md-4 col-sm-4 " +
                "col-xs-6 filter "+filtro+"'>" +
                "<img width='150px' height='250px' src='"+promotion.pro_image+"' class='img-responsive'>" +
                "<div style='text-align: center'>" +
                "<button class='btn btn-info' onclick='editPromo("+promotion.pro_code+")'>Editar</button>" +
                "<button class='btn btn-danger' onclick='deletePromo("+promotion.pro_code+")'>Eliminar</button>" +
                "</div></div>"
        }
        $("#mainContent").after(concatenacion);
    });
}
function editPromo(pro_code) {
    $("#register").show();
    $("#items").hide();
    $("#mostrarmodal").modal("show");
    document.getElementById("contentMessage").innerHTML = "<h5>Cargando</h5>";
    edit=true;
    code = pro_code;
    var starCountRef = firebase.database().ref('promotions/establishment/' + establishment+'/create/'+pro_code);
    starCountRef.once('value', function(snapshot) {
        var promotions = JSON.stringify(snapshot);
        var obj = JSON.parse(promotions);
        var concatenacion = "";
        $(".gallery_product").remove();
        if(obj!=null){
            var promotion = {};
            promotion.pro_code = obj.pro_code;
            promotion.pro_description = obj.pro_description;
            promotion.pro_expiration_date = obj.pro_expiration_date;
            promotion.pro_image = obj.pro_image;
            promotion.pro_limit = obj.pro_limit;
            promotion.pro_name = obj.pro_name;
            code = promotion.pro_code;
            $("#descriptionPromo").val(promotion.pro_description);
            var fechaVen = promotion.pro_expiration_date.split(" ")[0];
            var hourVen = promotion.pro_expiration_date.split(" ")[1];
            $("#namePromo").val(promotion.pro_name);
            $("#endDate").val(fechaVen);
            $("#endHour").val(hourVen);
            $("#limitPromo").val(promotion.pro_limit);
            images = promotion.pro_image;
            photo1 = ""
            document.getElementById("contentMessage").innerHTML = "<h5>Promoción cargada<br/>Ya puede cerrar" +
                "la ventana</h5>";
            $('#img1').prop('src', images);
            $('#img1').prop('class', "img-thumbnail");

        }

    });


}
function fechasDif(date1,date2) {
    var fechaInicio = new Date(date1).getTime();
    var fechaFin    = new Date(date2).getTime();
    var diff = fechaFin - fechaInicio;
    console.log(diff);
    if(diff>0)
        return 1;
    else if(diff===0)
        return 0;
    else
        return -1;

}
function deletePromo(idPromo) {
    firebase.database().ref('promotions/establishment/' + establishment + '/create/'+idPromo).remove();
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


