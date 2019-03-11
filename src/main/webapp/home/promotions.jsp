<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>PROMOCIONES</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/JukeboxAdministrator/assets/css/bootstrap.css" rel="stylesheet">
    <!-- styles -->
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <link href="/JukeboxAdministrator/assets/css/promotions.css" rel="stylesheet">
    <link href="/JukeboxAdministrator/assets/css/styles.css" rel="stylesheet">
</head>

<div class="header">
    <div class="container">
        <div id="rowItems" class="row">
            <div class="col-md-5">
                <!-- Logo -->
                <div class="logo">
                    <h1><a href="#">Promociones</a></h1>
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
                        <h4>REGISTRANDO PROMO</h4>
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

        <div class="container">
            <div id="items" class="row">
                <div class="gallery col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h1 class="gallery-title">Tus promociones</h1>
                    <div align="center">
                        <button id="newPromotion" class="btn btn-default filter-button" >Nuevo</button>
                        <button class="btn btn-default filter-button filter-buttonC" data-filter="todo">Todas</button>
                        <button class="btn btn-default filter-button filter-buttonC" data-filter="vigente">Vigentes</button>
                        <button class="btn btn-default filter-button filter-buttonC" data-filter="vencido">Vencidas</button>
                    </div>
                </div>
                <br id="mainContent"/>
            </div>
            <div id="register">
                <h1>Registrar promoción</h1>

                <fieldset>
                    <legend><span class="number">1</span>Información basica</legend>
                    <label for="namePromo">Nombre de la promo</label>
                    <input type="text" id="namePromo" name="namePromo" required>

                    <label for="descriptionPromo">Descripción:</label>
                    <input type="text" id="descriptionPromo" name="descriptionPromo" required>

                    <label for="endDate">Fecha de expiración:</label>
                    <input type="date" id="endDate" name="trip-start"
                           value="2019-08-25"
                           min="2019-02-01" max="2019-12-31" >
                    <label for="endHour">Hora de expiración:</label>
                    <input type="time" id="endHour" name="trip-start"/>
                    <input type="file" class="file-select1" accept="image/*"/>
                    <button  class="file-submit">Subir</button>
                    <td><div id="result1"></div></td>
                    <a id="thumbnailPhoto1" class="thumbnail" data-image-id="" data-toggle="modal" data-title=""
                       data-target="#image-gallery">
                    </a>
                    <img id="img1">
                </fieldset>
                <fieldset>
                    <label for="limitPromo">Limite para redimir este código</label>
                    <input id="limitPromo" type="text"/>
                </fieldset>
                <button id="registrarPromo" class="registrarPromo">Guardar</button>
                <button id="cerrarPromo" class="cerrarPromo">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
<script src="/JukeboxAdministrator/assets/js/select2.js"></script>
<script src="/JukeboxAdministrator/assets/js/promociones.js"></script>
<script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>


</html>
