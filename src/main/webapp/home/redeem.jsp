<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Redimir Promociones</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/JukeboxAdministrator/assets/css/bootstrap.css" rel="stylesheet">
    <!-- styles -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="/JukeboxAdministrator/assets/css/styles.css" rel="stylesheet">
</head>

<div class="header">
    <div class="container">
        <div id="rowItems" class="row">
            <div class="col-md-5">
                <!-- Logo -->
                <div class="logo">
                    <h1><a href="#">Redimir Promociones</a></h1>
                    <input id="idEstablishment" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
                </div>
            </div>
        </div>
        <div class="modal fade" id="mostrarmodal" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div id="contentMessage" class="modal-body">
                        <h4>PROMOCION REDIMIDA CON EXITO</h4>
                    </div>
                    <div class="modal-footer">
                        <a href="#" data-dismiss="modal" class="btn btn-danger">Cerrar</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12 col-sm-12 panel-danger">
                <div id="message" class="content-box-header panel-heading">

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 panel-warning">
                <div class="content-box-header panel-heading">
                    <div class="panel-title ">Redimir código</div>
                </div>
                <div class="content-box-large box-with-header">
                    <form id="searchYoutubeForm" action="#">
                        <p><input type="text" id="txtCode" placeholder="Escribe aquí el código" autocomplete="off"
                                  class="form-control" style="text-align:center"/></p>
                        <p><input type="submit" value="Redimir" class="form-control btn btn-danger w100"></p>
                    </form>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 panel-warning">
                <div class="content-box-header panel-heading">
                    <div class="panel-title ">Promociones redimidas</div>
                </div>
                <div class="content-box-large box-with-header">
                   <div id="Resultados">
                       <div id="mainContent"></div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
<script src="/JukeboxAdministrator/assets/js/select2.js"></script>
<script src="/JukeboxAdministrator/assets/js/redeem.js"></script>
<script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>


</html>
