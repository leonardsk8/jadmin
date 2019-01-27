<!DOCTYPE HTML>
<html>
   <head>
<!-- Scripts jQuery, bootstrap -->
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" crossorigin="anonymous"></script>
       
       <!-- Estilos  bootstrap, chat-->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<link rel="stylesheet" href="/JukeboxAdministrator/assets/css/css.css" >

      <!-- área de código Firebase y lectura de Mensajes-->
       <script src="https://www.gstatic.com/firebasejs/3.6.1/firebase.js"></script>
<script>
 
    
    
</script>
       
   </head>
   <body>
       
	     <div class="container">
	        <div class="row">
                    <div class="header2">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="home.html">Jukebox Chat</a></h1>
	              </div>
                      </div>
	           </div>
	        </div>
	     </div>
       
       <div class="container">
    <div class="row">
        <!-- inicio de la caja de chat con bootstrap -->
        <div class="col-md-6">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-comment"></span>Chat
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-chevron-down"></span>
                        </button>
                        <ul class="dropdown-menu slidedown">
                            <li><a href="https://www.youtube.com/user/dimit28"><span class="glyphicon glyphicon-ok-sign">
                            </span>Youtube</a></li>
                        </ul>
                    </div>
                    <br/><br/>
                     <div class="input-group">
                        <input id="Mensaje" type="text" class="form-control input-sm" placeholder="Escribe un mensaje..." />
                        <span class="input-group-btn">
                            <button class="btn btn-warning btn-sm" id="btnEnviar" >
                                Enviar</button>
                        </span>
                    </div>
                </div>
                <div class="panel-body">
                    <ul class="chat"> </ul>
                </div>
                <div class="panel-footer">
                </div>
            </div>
        </div>
         <div class="col-md-6 panel-warning">
		  			<div class="content-box-header panel-heading">
	  					<div class="panel-title ">USUARIOS</div>
					
		  			</div>
		  			<div class="content-box-large box-with-header">
                                            <ul id="columnsUsers">    
                                                
                                            </ul>
					</div>
	</div>
        <!--  Fin de la caja de chat con bootstrap -->
    </div>
</div>
           <input id="idEstablishment" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
           <input id="idUser" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("idUser")));%>">
           <input id="token" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("token")));%>">
  <!-- template del item del chat (Oculto: para agarrar un clon y llenarlo e insertar en el chat)-->
       <li style="display:none" id="plantilla" class="left clearfix">
           <span class="chat-img pull-left">
               <img id="profileImg" width="50" height="50" src="http://placehold.it/50/55C1E7/fff&text=U" class="img-circle" />
           </span>
            <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font Nombre" >Leonardo Martinez</strong> 
                        <small class="pull-right text-muted">
                        <span class="glyphicon glyphicon-asterisk Tiempo">
                        </span> </small>
                    </div>
                        <p class="Mensaje">
                               Mensaje
                        </p>
                </div>
        </li>
       
       
    <!-- Scripts de acción al botón -->
 
     <script src="/JukeboxAdministrator/assets/js/chat.js"></script>
   </body>
</html>
