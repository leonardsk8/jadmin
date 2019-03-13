<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Bootstrap Admin Theme v3</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/JukeboxAdministrator/assets/css/bootstrap.css" rel="stylesheet">
    <!-- styles -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="/JukeboxAdministrator/assets/css/styles.css" rel="stylesheet">

</head>
<body >
<input id="idEstablishment" type="hidden"
       value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
<div class="header">
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <!-- Logo -->
                <div class="logo">
                    <h1><a href="#">Jukebox Admin Bienvenido</a></h1>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="page-content">
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-12 panel-danger">
                    <div style="text-align: center;">
                    <div id="graficoVisitas" ></div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <div class="row">
                <div  class="col-md-12 panel-title">
                    <div style="text-align: center;">
                        <div id="graficoConectados"></div>
                    </div>
                </div>
            </div>
            <br/><br/><br/>
            <div class="row">
                <div class="col-md-12 panel-warning">
                    <div style="text-align: center;">
                    <div id="graficoCanciones"></div>
                    </div>
                </div>
            </div>
            <div id="items" class="row">

            </div>

        </div>
    </div>
</div>

<footer>
    <div class="container">
        <div class="copy text-center">
            Copyright 2019 <a href='#'>JUKEBOX</a>
        </div>
    </div>
</footer>

<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
<script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<!--    <script src="../assets/js/auth.js"></script>-->
<script src="/JukeboxAdministrator/assets/js/reports.js"></script>
<script src="/JukeboxAdministrator/assets/js/fusionchart/fusioncharts.charts.js"></script>
<script src="/JukeboxAdministrator/assets/js/fusionchart/fusioncharts.js"></script>
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>


</body>
</html>
