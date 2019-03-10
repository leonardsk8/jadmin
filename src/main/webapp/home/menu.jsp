<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>MENÚ</title>
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
                    <h1><a href="#">Menú</a></h1>
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
                        <h4>MENÚ</h4>
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
                    <h1 class="gallery-title">Tu menú</h1>
                    <div align="center">
                        <button id="newProduct" class="btn btn-default filter-button" >Nuevo</button>
                    </div>
                </div>
                <br id="mainContent"/>
            </div>
            <div id="register">
                <h1>Registrar nuevo producto</h1>
                <fieldset>
                    <legend><span class="number">1</span>Información basica</legend>
                    <label for="nameProduct">Nombre del producto</label>
                    <input type="text" id="nameProduct" name="namePromo" required>
                    <label for="descriptionProduct">Descripción:</label>
                    <input type="text" id="descriptionProduct" name="descriptionPromo" required>
                    <input type="file" class="file-select1" accept="image/*"/>
                    <button  class="file-submit">Subir</button>
                    <td><div id="result1"></div></td>
                    <a id="thumbnailPhoto1" class="thumbnail" data-image-id="" data-toggle="modal" data-title=""
                       data-target="#image-gallery">
                    </a>
                    <img id="img1">
                </fieldset>
                <fieldset>
                    <label for="price">Precio </label>
                    <input id="price" type="text"/>
                </fieldset>
                <button id="registrarPromo" class="registrarPromo">Guardar</button>
                <button id="cerrarPromo" class="cerrarPromo">Cerrar</button>
            </div>
        </div>
    </div>
</div>

<script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
<script src="/JukeboxAdministrator/assets/js/select2.js"></script>
<script src="/JukeboxAdministrator/assets/js/menu.js"></script>
<script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>


</html>
