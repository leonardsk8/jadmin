/* global firebase */

var establishmentObject;
var establishment;
var limit=0;
var usages=0;
var emailUser="";
var nameUser="";
var namePromo="";
var redeem = {};

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
    establishment = $("#idEstablishment").val();
    getInfoBar(establishment);
    $("#mostrarmodal").modal("hide");
    getRedeems(establishment);
});
function getRedeems(establishmentId) {
    var starCountRef = firebase.database().ref('promotions/establishment/'+establishmentId+'/redeem');
    starCountRef.on('value', function(snapshot) {
        var table = "<table class=\"table table-hover table-dark\">";
        table +="<thead> " +
            "<tr> " +
            "<th scope=\"col\">#</th> " +
            "<th scope=\"col\">Usuario </th> " +
            "<th scope=\"col\">Email </th> " +
            "<th scope=\"col\">Promocion </th> " +
            "<th scope=\"col\">Uso y Limite </th> " +
            "<th scope=\"col\">Hora y Fecha </th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>";
        const promotions = JSON.stringify(snapshot);
        const obj = JSON.parse(promotions);
        var concatenacion = "";
        var count = 1;
        for(let i in obj){
            table +="<tr>";
            const promotion = {};
            promotion.user=obj[i].user;
            promotion.email=obj[i].email;
            promotion.promotion=obj[i].promotion;
            promotion.limit=obj[i].limit;
            promotion.fecha=obj[i].fecha;
            table += "<th scope=\"row\">"+count+"</th>";
            table += "<td>"+promotion.user+"</td>";
            table += "<td>"+promotion.email+"</td>";
            table += "<td>"+promotion.promotion+"</td>";
            table += "<td>"+promotion.limit+"</td>";
            table += "<td>"+promotion.fecha+"</td>";
            table +="</tr>";
            count++;
        }
        table += "</tbody>";
        table +="</table>";
        $("#mainContent").html(table);
    });
}
function getInfoBar(establishmentId) {
    const starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
    starCountRef.once('value', function(snapshot) {
        const establishment = JSON.stringify(snapshot);
        const obj = JSON.parse(establishment);
        if(obj != null){
            establishmentObject = obj
        }
    });
}
$("form").on("submit", function(e) {
    e.preventDefault();
    const code = $("#txtCode").val();
    if(code.length < 7 || code.length >9){
        $("#mostrarmodal").modal("show");
        document.getElementById("contentMessage").innerHTML = "<h5>Error en el código</h5>";
        return;
    }
    console.log("Calculando promoción");
    const uidBar = code.substring(0, 3);
    const uidUser = code.substring(3, 6);
    const promotion = code.substring(6, code.length);
    console.log(uidBar);
    console.log(uidUser);
    console.log(promotion);
    updateProCountMain(promotion);
    updateProCountUser(code);
    redeem = {
        code:code
    };
});
function updateProCountMain(promotion) {
    const starCountRef = firebase.database().ref('promotions/establishment/' + establishment + '/create/' + promotion);
    starCountRef.once('value', function(snapshot) {

        const establish = JSON.stringify(snapshot);
        const obj = JSON.parse(establish);
        var count = 0;
        var existe = 0;
        if(obj != null){
            count = obj.pro_count;
            limit = obj.pro_limit;
            redeem.promotion = obj.pro_name;
            existe++;
            redeem.limit = limit
        }
        console.log("count: " + count);
        count++;

        if(existe===1){
        firebase.database().ref('promotions/establishment/' + establishment+"/create/"+promotion
            +'/pro_count').set(count);
        }
        else {
            $("#mostrarmodal").modal("show");
            document.getElementById("contentMessage").innerHTML = "<h5>Código incorrecto</h5>";
            return;
        }
    });
}
function updateProCountUser(promotion) {
    const starCountRef = firebase.database().ref('promotions/establishment/' + establishment +
        '/promoUser/' + promotion);
    starCountRef.once('value', function(snapshot) {
        const establish = JSON.stringify(snapshot);
        const obj = JSON.parse(establish);
        var count = 0;
        var existe = 0;
        var uid = "";
        if(obj != null){
            count = obj.proUTimes;
            uid = obj.proUUserId;
            existe++;
        }
        count++;
        usages = count;
        if(existe===1 && usages<=limit){
            firebase.database().ref('promotions/establishment/' + establishment+
                '/promoUser/'+promotion+'/proUTimes').set(count+"");
            getDataUser(uid);
        }
        else {
            let message = "Código Incorrecto";
            if(usages>=limit){
                message = "Se ha alcanzado el límite para este código";
            }
            $("#mostrarmodal").modal("show");
            document.getElementById("contentMessage").innerHTML = "<h5>"+message+"</h5>";
            $("#txtCode").val("");
            return;
        }
        console.log("limit: "+limit+" usos: "+usages+" : "+usages+"/"+limit);
    });
}
function getDataUser(uid) {
    const starCountRef = firebase.database().ref('user/' + uid);
    starCountRef.once('value', function(snapshot) {
        const establish = JSON.stringify(snapshot);
        var obj = JSON.parse(establish);
        if(obj != null){
            emailUser = obj.userEmail;
            nameUser = obj.userName;
        }
        else{
            $("#mostrarmodal").modal("show");
            document.getElementById("contentMessage").innerHTML = "<h5>No se pudo encontrar al usuario</h5>";
            return;
        }
        setPromoHistory();

    });
}
function setPromoHistory() {
    redeem.user =nameUser;
    redeem.email =emailUser;
    redeem.limit = usages+"/"+limit;
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-"
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes();
    redeem.fecha=datetime;
    firebase.database().ref('promotions/establishment/' + establishment+'/redeem/'+redeem.code).set(redeem).then(()=>{
        document.getElementById("contentMessage").innerHTML = "<h5>Promoción redimida con exito</h5>";
    });
}

/*
*CONSULTA
* var starCountRef = firebase.database().ref('promotions/establishment/' + establishment+
        '/promoUser/'+promotion);
    starCountRef.once('value', function(snapshot) {
        var establish = JSON.stringify(snapshot);
        var obj = JSON.parse(establish);
        if(obj != null){
        }

    });
* */

