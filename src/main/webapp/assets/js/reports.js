/* global firebase */

var establishmentObject;
var establishment;
var images = "";
var edit=false;
var code = 0;
var visit = [];
var connect= [];
var songs= [];
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
});
function initReport() {

    var starCountRef = firebase.database()
        .ref('reports/establishment/' + establishment+'/visit/plot');
    starCountRef.once('value', function(snapshot) {
        var report = JSON.stringify(snapshot);
        var obj = JSON.parse(report);
        console.log('PLOT');
        for (let i in obj) {
            var v = {
                label: obj[i]['label'],
                value: obj[i]['value']
            }
            visit.push(v);
            console.log(v);
        }
        createChartVisit();
    });

    var starCountRef2 = firebase.database()
        .ref('reports/establishment/' + establishment+'/connect/plot');
    starCountRef2.once('value', function(snapshot) {
        var report = JSON.stringify(snapshot);
        var obj = JSON.parse(report);
        console.log('PLOT');
        for (let i in obj) {
            var v = {
                label: obj[i]['label'],
                value: obj[i]['value']
            }
            connect.push(v);
            console.log(v);
        }
        createChartConnect();
    });
    var starCountRef3 = firebase.database()
        .ref('reports/establishment/' + establishment+'/songs' +
            '');
    starCountRef3.once('value', function(snapshot) {
        var report = JSON.stringify(snapshot);
        var obj = JSON.parse(report);
        console.log('PLOT');
        for (let i in obj) {
            var v = {
                label: obj[i]['label'],
                value: obj[i]['value']
            }
            songs.push(v);
            console.log(v);
        }
        createChartSongs();
    });

}
function createChartSongs() {
    var firebaseChart = new FusionCharts({
        type: 'bar3d',
        renderAt: 'graficoCanciones',
        width: '650',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "theme": "candy",
                "caption": "Canciones",
                "subCaption": "Ultimos 7 días",
                "subCaptionFontBold": "0",
                "captionFontSize": "20",
                "subCaptionFontSize": "17",
                "captionPadding": "15",
                "captionFontColor": "#8C8C8C",
                "baseFontSize": "14",
                "baseFont": "Barlow",
                "canvasBgAlpha": "0",
                "bgColor": "#FFFFFF",
                "bgAlpha": "100",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "0",
                "showAlternateHGridColor": "0",
                "usePlotGradientColor": "0",
                "paletteColors": "#6AC1A5",
                "showValues": "0",
                "divLineAlpha": "5",
                "showAxisLines": "1",
                "drawAnchors": "0",
                "xAxisLineColor": "#8C8C8C",
                "xAxisLineThickness": "0.7",
                "xAxisLineAlpha": "50",
                "yAxisLineColor": "#8C8C8C",
                "yAxisLineThickness": "0.7",
                "yAxisLineAlpha": "50",
                "baseFontColor": "#8C8C8C",
                "toolTipBgColor": "#FA8D67",
                "toolTipPadding": "10",
                "toolTipColor": "#FFFFFF",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#8C8C8C",
                "crossLineAlpha": "60",
                "crossLineThickness": "0.7",
                "alignCaptionWithCanvas": "1"
            },
            "data": songs
        }
    });
    firebaseChart.render();
}
function createChartVisit() {
    var firebaseChart = new FusionCharts({
        type: 'area2d',
        renderAt: 'graficoVisitas',
        width: '650',
        height: '400',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Visitas a tu bar en la APP",
                "subCaption": "Ultimos 7 días",
                "subCaptionFontBold": "0",
                "captionFontSize": "20",
                "subCaptionFontSize": "17",
                "captionPadding": "15",
                "captionFontColor": "#8C8C8C",
                "baseFontSize": "14",
                "baseFont": "Barlow",
                "canvasBgAlpha": "0",
                "bgColor": "#FFFFFF",
                "bgAlpha": "100",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "0",
                "showAlternateHGridColor": "0",
                "usePlotGradientColor": "0",
                "paletteColors": "#6AC1A5",
                "showValues": "0",
                "divLineAlpha": "5",
                "showAxisLines": "1",
                "drawAnchors": "0",
                "xAxisLineColor": "#8C8C8C",
                "xAxisLineThickness": "0.7",
                "xAxisLineAlpha": "50",
                "yAxisLineColor": "#8C8C8C",
                "yAxisLineThickness": "0.7",
                "yAxisLineAlpha": "50",
                "baseFontColor": "#8C8C8C",
                "toolTipBgColor": "#FA8D67",
                "toolTipPadding": "10",
                "toolTipColor": "#FFFFFF",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#8C8C8C",
                "crossLineAlpha": "60",
                "crossLineThickness": "0.7",
                "alignCaptionWithCanvas": "1"
            },
            "data": visit
        }
    });
    firebaseChart.render();
}
function createChartConnect() {
    var firebaseChart = new FusionCharts({
        type: "spline",
        renderAt: "graficoConectados",
        width: "650",
        height: "400",
        dataFormat: "json",
        dataSource: {
            "chart": {
                "caption": "Conecciones a tu bar",
                "subCaption": "Ultimos 7 días",
                "subCaptionFontBold": "0",
                "captionFontSize": "20",
                "subCaptionFontSize": "17",
                "captionPadding": "15",
                "captionFontColor": "#8C8C8C",
                "baseFontSize": "14",
                "baseFont": "Barlow",
                "canvasBgAlpha": "0",
                "bgColor": "#FFFFFF",
                "bgAlpha": "100",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "showPlotBorder": "0",
                "showAlternateHGridColor": "0",
                "usePlotGradientColor": "0",
                "paletteColors": "#6AC1A5",
                "showValues": "0",
                "divLineAlpha": "5",
                "showAxisLines": "1",
                "drawAnchors": "0",
                "xAxisLineColor": "#8C8C8C",
                "xAxisLineThickness": "0.7",
                "xAxisLineAlpha": "50",
                "yAxisLineColor": "#8C8C8C",
                "yAxisLineThickness": "0.7",
                "yAxisLineAlpha": "50",
                "baseFontColor": "#8C8C8C",
                "toolTipBgColor": "#FA8D67",
                "toolTipPadding": "10",
                "toolTipColor": "#FFFFFF",
                "toolTipBorderRadius": "3",
                "toolTipBorderAlpha": "0",
                "drawCrossLine": "1",
                "crossLineColor": "#8C8C8C",
                "crossLineAlpha": "60",
                "crossLineThickness": "0.7",
                "alignCaptionWithCanvas": "1"
            },
            "data": connect
        }
    });
    firebaseChart.render();
}

function getInfoBar(establishmentId) {
    var starCountRef = firebase.database().ref('establishment/bares/' + establishmentId);
    starCountRef.once('value', function(snapshot) {
        var establishment = JSON.stringify(snapshot);
        var obj = JSON.parse(establishment);
        if(obj != null){
            establishmentObject = obj;
            console.log("BAR ENCONTRADO");
        }
        else{
            console.log("NO SE ENCUENTRA EL BAR");
        }
        initReport();
    });
}


