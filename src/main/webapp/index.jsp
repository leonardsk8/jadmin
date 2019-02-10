<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<f:view>
   <html lang="en">

    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>JUKEBOX ADMIN</title>

        <!-- CSS -->
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="assets/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="assets/css/form-elements.css">
        <link rel="stylesheet" href="assets/css/style.css">

        <link rel="shortcut icon" href="assets/ico/favicon.png">
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">

    </head>

    <div class="form">

        <ul class="tab-group">
            <li class="tab "><a href="#signup">Registrarse</a></li>
            <li class="tab active"><a href="#login">Iniciar sesion</a></li>
        </ul>

        <div class="tab-content">
            <div id="login">
                <h1>Bienvenido</h1>

                <form id="form-login" action="/JukeboxAdministrator/servletHome" method="post">

                    <div class="field-wrap">
                        <label>
                            Correo electronico<span class="req">*</span>
                        </label>
                        <input id="form-username" type="email"required autocomplete="off"/>
                    </div>

                    <div class="field-wrap">
                        <label>
                            Contraseña<span class="req">*</span>
                        </label>
                        <input id="form-password" type="password"required autocomplete="off"/>
                    </div>

                    <p class="forgot"><a href="#">¿Olvidaste tu contraseña?</a></p>

                    <button  class="button button-block"/>Iniciar Sesión</button>

                </form>

            </div>
            <div id="signup">
                <h1>Registrate</h1>

                <form id="formRegister" action="" method="post">


                    <div class="field-wrap">
                        <label>
                            Correo<span class="req">*</span>
                        </label>
                        <input id="email-register" type="email"required autocomplete="off"/>
                    </div>

                    <div class="field-wrap">
                        <label>
                            Contraseña<span class="req">*</span>
                        </label>
                        <input id="password-register" type="password"required autocomplete="off"/>
                    </div>

                    <div class="field-wrap">
                        <label>
                            Repetir Contraseña<span class="req">*</span>
                        </label>
                        <input id="repassword-register" type="password"required autocomplete="off"/>
                    </div>

                    <button type="submit" class="button button-block"/>Registrar</button>

                </form>



            </div>

        </div><!-- tab-content -->

    </div> <!-- /form -->
       

        
        <script src="assets/js/jquery-1.11.1.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/jquery.backstretch.min.js"></script>
        <script src="assets/js/scriptLogIn.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
        
        
    </body>

</html>
</f:view>

