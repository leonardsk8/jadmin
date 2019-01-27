<%-- 
    Document   : unvetoed
    Created on : Jun 25, 2018, 1:14:05 AM
    Author     : leona
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Jukebox User Vetoed</title>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" crossorigin="anonymous"></script>
       
       <!-- Estilos  bootstrap, chat-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="/JukeboxAdministrator/assets/css/css.css" >

      <!-- área de código Firebase y lectura de Mensajes-->
       <script src="https://www.gstatic.com/firebasejs/3.6.1/firebase.js"></script>
    </head>
    <body>
        <div class="header2">
	     <div class="container">
	        <div class="row">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="home.html">Jukebox User Vetoed</a></h1>
	              </div>
	           </div>
                   

	        </div>
	     </div>
       </div>
              <div class="container">
    <div class="row">
         <div class="col-md-12 panel-warning">
		  			<div class="content-box-header panel-heading">
                                            <div class="panel-title">USUARIOS</div>
					
		  			</div>
		  			<div class="content-box-large box-with-header">
                                            <ul id="columnsUsers">    
                                                
                                            </ul>
					</div>
	</div>
    </div>
</div>
        <input id="idEstablishment" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
        <script src="/JukeboxAdministrator/assets/js/unvetoed.js"></script>
    </body>
</html>
