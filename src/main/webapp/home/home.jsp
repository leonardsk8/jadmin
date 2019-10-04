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
<div class="header">
    <div class="container">
        <div class="row">
            <div class="col-md-5">
                <!-- Logo -->
                <div class="logo">
                    <h1><a href="home.html">Jukebox Admin Bienvenido</a></h1>
                </div>
            </div>


        </div>
    </div>
</div>

<div class="page-content">
    <div id="registro" class="row">
        <div class="col-md-12 col-lg-12 col-sm-12 panel-danger">
            <div class="content-box-header panel-heading">
                <div class="panel-title">TU BAR NO APARECERA EN LOS MAPAS HASTA QUE COMPLETES TU REGISTRO
                    <a href="servletRegistro?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")))
                        ;%>&email=<%out.print(String.valueOf(request.getSession().getAttribute("Email")));
                        %>&tipo=registro">
                        CLIC AQUI PARA COMPLETAR REGISTRO</a>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-2">
            <div class="sidebar content-box" style="display: block;">
                <ul class="nav">
                    <li class="current"><a href="home.html"><i class="glyphicon glyphicon-home"></i> INICIO </a></li>
                    <li>
                        <a href="servletReloads?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>"
                           target="_blank"><i class="glyphicon-bitcoin"></i> RECARGAS </a></li>
                    <li><a href="servletPromociones?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")))
                        ;%>" target="_blank"><i class="glyphicon-calendar"></i> PROMOCIONES </a></li>
                    <li><a target="_blank" href="servletRegistro?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")))
                        ;%>&email=<%out.print(String.valueOf(request.getSession().getAttribute("Email")));
                        %>&tipo=modificacion"><i class="glyphicon-stats"></i> EDITAR PERFIL </a></li>
                    <li><a target="_blank"
                           href="servletMenu?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>"><i
                            class="glyphicon-list"></i> EDITAR MENÚ </a></li>
                    <li><a target="_blank" href="servletReportes?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")))
                        ;%>">
                        <i class="glyphicon-list"></i> REPORTES </a></li>
                    <li><a href="https://qrcode.tec-it.com/API/QRCode?data=<%out.print(String.valueOf(
                            request.getSession().getAttribute("UID")));%>&backcolor=%23ffffff&method=download">
                        <i class="glyphicon-list"></i>DESCARGAR MI QR</a></li>
                    <li><a target="_blank" href="servletRedeem?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
                        <i class="glyphicon-list"></i>REDIMIR PROMO</a></li>
                    <li><a href="servletIndex">
                        <i class="glyphicon-list"></i>SALIR</a></li>

                </ul>

            </div>
        </div>
        <div class="col-md-10">
            <div class="row">
                <div class="col-md-6 panel-danger">

                    <div class="content-box-header panel-heading">
                        <div class="panel-title">YOUTUBE</div>
                    </div>
                    <div class="content-box-large box-with-header">
                        <div id="player"></div>
                        <div style="text-align: center;">
                            <button id="btnPlay" type="button" class="btn btn-info">Reproducir Lista</button>
                            <button id="btnNext" type="button" class="btn btn-info">Siguiente Canción</button>
                        </div>
                    </div>

                </div>

                <div id="divSongs" class="col-md-6 panel-title">

                    <div class="content-box-header panel-heading">
                        <div class="panel-title">Siguientes canciones por sonar</div>
                    </div>
                    <div id="listSongs" class="content-box-large box-with-header">
                        <ul id="columnsSongs">

                        </ul>
                    </div>


                </div>
            </div>

            <div class="row">

                <div class="col-md-6 panel-warning">
                    <div class="content-box-header panel-heading">
                        <div class="panel-title "><a onClick="limpiarUsuarios()">USUARIOS</a></div>
                        <a style="float: right;" onclick="unVetoedUser()">UsuariosVetado</a>

                    </div>
                    <div class="content-box-large box-with-header">
                        <p id="columnsUsers" class="noList">

                        </p>
                    </div>
                </div>
                <div class="col-md-6 panel-warning">
                    <div id="listaAprobar" class="content-box-header panel-heading">
                        <div class="panel-title" > CANCIONES POR APROBAR</div>
                        <div style="float: right">
                            <div class="checkbox">
                                <label class="checkbox-inline">
                                    <input id="aprobacion" type="checkbox" data-toggle="toggle">
                                    Aprobación
                                </label>
                            </div>

                        </div>
                    </div>
                    <div class="content-box-large box-with-header">
                        <p id="columnsSongsToApproved" class="noList">

                        </p>
                    </div>
                </div>
            </div>
            <div id="items" class="row">
                <div class="col-md-12 panel-warning">
                    <div class="content-box-header panel-heading">
                        <div class="panel-title ">BUSCAR EN YOUTUBE</div>
                    </div>
                    <div class="content-box-large box-with-header">
                        <form id="searchYoutubeForm" action="#">
                            <p><input type="text" id="search" placeholder="Escribe el nombre de la canción" autocomplete="off"
                                      class="form-control"/></p>
                            <p><input type="submit" value="Search" class="form-control btn btn-primary w100"></p>
                            <input id="idEstablishment" type="hidden"
                                   value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
                            <input id="nameEstablishment" type="hidden"
                                   value="<%out.print(String.valueOf(request.getSession().getAttribute("email")));%>">
                        </form>
                        <div id="results"></div>
                    </div>
                </div>
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

<script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
<script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<!--    <script src="../assets/js/auth.js"></script>-->
<script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
<script src="/JukeboxAdministrator/assets/js/app.js"></script>
<script src="/JukeboxAdministrator/assets/js/item.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
<script src="https://apis.google.com/js/client.js?onload=init"></script>


</body>
</html>
