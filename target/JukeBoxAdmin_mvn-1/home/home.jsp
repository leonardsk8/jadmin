<%-- 
    Document   : home
    Created on : Jun 7, 2018, 6:19:36 PM
    Author     : leona
--%>
<!DOCTYPE html>
<html>
  <head>
    <title>Bootstrap Admin Theme v3</title>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
	<meta content="utf-8" http-equiv="encoding">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/JukeboxAdministrator/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">
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
		  <div class="col-md-2">
		  	<div class="sidebar content-box" style="display: block;">
                <ul class="nav">
                    <!-- Main menu -->
                    <li class="current"><a href="home.html"><i class="glyphicon glyphicon-home"></i> INICIO </a></li>
                    <li><a href="servletReloads?id=<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>" target="_blank"><i class="glyphicon glyphicon-bitcoin"></i> RECARGAS </a></li>
                    <li><a href=""><i class="glyphicon glyphicon-calendar"></i> PROMOCIONES </a></li>
                    <li><a href=""><i class="glyphicon glyphicon-stats"></i> PERFIL </a></li>
                    <li><a href=""><i class="glyphicon glyphicon-list"></i> SALIR </a></li>
                    
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
                                                <center>
                                                    <button id="btnPlay" type="button" class="btn btn-info" >PLAY LIST</button>
                                                </center>
                                                </div>
		  			
		  		</div>

                            <div id="divSongs" class="col-md-6 panel-title">
		  			
		  				<div class="content-box-header panel-heading">
							<div class="panel-title">SONGS</div>
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
                                            <div class="panel-title ">USUARIOS</div><a style="float: right;" onclick="unVetoedUser()">UsuariosVetado</a>
					
		  			</div>
		  			<div class="content-box-large box-with-header">
                                            <p id="columnsUsers" class="noList">
                                                
                                            </p>
					</div>
		  		</div>
                                <div class="col-md-6 panel-warning">
		  			<div class="content-box-header panel-heading">
	  					<div class="panel-title">CANCIONES POR APROBAR</div>
		  			</div>
		  			<div class="content-box-large box-with-header">
                                            <p id="columnsSongsToApproved" class="noList">
                                                
                                            </p>
					</div>
		  		</div>
		  	</div>
                      <div class="row">
                          <div class="col-md-12 panel-warning">
		  			<div class="content-box-header panel-heading">
	  					<div class="panel-title ">BUSCAR</div>
		  			</div>
		  			<div class="content-box-large box-with-header">
			  			<form action="#">
                                                    <p><input type="text" id="search" placeholder="Type something..." autocomplete="off" class="form-control" /></p>
                                                     <p><input type="submit" value="Search" class="form-control btn btn-primary w100"></p>
                                                     <input id="idEstablishment" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
                                                     <input id="nameEstablishment" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("email")));%>">
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
               Copyright 2018 <a href='#'>JUKEBOX</a>
            </div>
            
         </div>
      </footer>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="/JukeboxAdministrator/assets/bootstrap/js/bootstrap.min.js"></script>
<!--    <script src="../assets/js/auth.js"></script>-->
    <script src="/JukeboxAdministrator/assets/js/app.js"></script>
    <script src="/JukeboxAdministrator/assets/js/item.js"></script>
    <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
    <script src="https://apis.google.com/js/client.js?onload=init"></script>
   

  </body>
</html>
