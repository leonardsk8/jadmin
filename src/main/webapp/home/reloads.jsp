<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
    <link href="/JukeboxAdministrator/assets/css/styles.css" rel="stylesheet">

  </head>
  <body >
  	<div class="header">
	     <div class="container">
	        <div class="row">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="home.html">Jukebox Admin Welcome</a></h1>
	              </div>
	           </div>
                   

	        </div>
	     </div>
	</div>

    <div class="page-content">
    	<div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <div class="col-sm-12 col-md-12 col-lg-12 panel-danger">
                    <div class="content-box-header panel-heading">
                        <div class="panel-title">RECARGAS</div>
                    </div>
                    <div class="content-box-large box-with-header">
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-md-6 panel-danger">
                                <p class="buscador">
                                    <label>Buscar:</label>
                                    <input id="buscador" type="input" value="">
                                </p>
                                <input id="idEstablishment" type="hidden" value="<%out.print(String.valueOf(request.
                                getSession().getAttribute("UID")));%>">
                                <div class="content-box-header panel-heading">
                                    <div class="panel-title ">USUARIOS</div>
                                    <a style="float: right;" onclick="unVetoedUser()">UsuariosVetados</a>
                                    <div style="text-align: center;">
                                        <div class="content-box-large box-with-header">
                                            <ul id="columnsUsers" class="noList">
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6 col-md-6 panel-danger">
                                <div style="text-align: center;">
                                    <h5>Numero de creditos</h5>
                                    <select id="selectCredits">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <h5 id="userSelected"></h5>
                                    <button id="btnReload" type="button" class="btn btn-info" >RECARGAR</button>
                                </div>
                            </div>
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

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/JukeboxAdministrator/assets/js/bootstrap.js"></script>
<!--    <script src="../assets/js/auth.js"></script>-->
    <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
    <script src="/JukeboxAdministrator/assets/js/reload.js"></script>
   
   

  </body>
</html>
