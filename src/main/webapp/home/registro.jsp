<%-- 
    Document   : Registro
    Created on : 20/10/2018, 02:24:50 PM
    Author     : User1
--%>



<!DOCTYPE html>
<html>
    <head>
        <title>Completar Registro</title>
        <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->

    <!-- styles -->
        <link href="/JukeboxAdministrator/assets/css/select2.css    " rel="stylesheet">
    <link href="/JukeboxAdministrator/assets/css/styles.css" rel="stylesheet">
        <%--<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css" rel="stylesheet" />--%>
        <link href="/JukeboxAdministrator/assets/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    
       <!-- CSS -->
        
    
    </head>
  
    <body>
        <div class="header">
	     <div class="container">
	        <div class="row">
	           <div class="col-md-5">
	              <!-- Logo -->
	              <div class="logo">
	                 <h1><a href="home.html">JukeBox Hero</a></h1>
	              </div>
	           </div>
                   

	        </div>
	     </div>
	</div>
        
    <div class="page-content"> 
             <img height="200px" width=100% src="/JukeboxAdministrator/assets/img/jukeboxFH.png" />

    </div>
    <div class="page-content">
        <input id="idEstablishment" type="hidden" value=
                "<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>">
    	<div class="row">
		  <div class="col-md-12">
		  	<div class="col-md-12 panel-danger">
		  			
		  				<div class="content-box-header panel-heading">
							<div class="panel-title">Completar Registro</div>
                                                </div>      
                            </div>
              <div class="content-box-large box-with-header">
                  <div class="row">
                      <div class="col-md-4 col-lg-4 col-sm-12">
                          <h4>Nombre del bar</h4>
                          <input type="text" id="nombreBar" required/>
                      </div>
                          <div class="col-md-4 col-lg-4 col-sm-12">
                              <h4>Descripción de tu bar</h4>
                              <textarea id="descripcionBar" required/>Ingresa aquí el texto</textarea>
                          </div>
                          <div class="col-md-4 col-lg-4 col-sm-12">
                              <h4>Principales generos de tu bar</h4>
                              <select required class="genders" id="genders" name="genders" multiple="multiple">
                                  <option value="Blues">Blues</option>
                                  <option value="Corrido">Corrido</option>
                                  <option value="Country">Country</option>
                                  <option value="Cumbia">Cumbia</option>
                                  <option value="Disco">Disco</option>
                                  <option value="Electrónica">Electrónica</option>
                                  <option value="Flamenco">Flamenco</option>
                                  <option value="Folk">Folk</option>
                                  <option value="Funk">Funk</option>
                                  <option value="Gospel">Gospel</option>
                                  <option value="Heavy Metal">Heavy Metal</option>
                                  <option value="Hip ">Hip Hop
                                  <option value="Indie?">Indie?</option>
                                  <option value="Jazz?">Jazz?</option>
                                  <option value="Merengue">Merengue</option>
                                  <option value="Pop">Pop</option>
                                  <option value="Punk">Punk</option>
                                  <option value="Ranchera">Ranchera</option>
                                  <option value="Rap">Rap</option>
                                  <option value="Reggae">Reggae</option>
                                  <option value="Reggaeton">Reggaeton</option>
                                  <option value="Rumba">Rumba</option>
                                  <option value="Rhythm and Blues">Rhythm and Blues
                                  <option value="Rock">Rock</option>
                                  <option value="Rock ">Rock and Roll
                                  <option value="Salsa">Salsa</option>
                                  <option value="Son">Son</option>
                                  <option value="Soul">Soul</option>
                                  <option value="Tango">Tango</option>
                                  <option value="Vallenato">Vallenato</option>
                              </select>
                          </div>
                  </div>
                  <div class="row">
                      <div class="col-md-4 col-lg-4 col-sm-12">
                          <h4>Dirección del bar</h4>
                          <input type="text" id="direccionBar" required />
                      </div>
                      <div class="col-md-4 col-lg-4 col-sm-12">
                          <h4>Teléfono</h4>
                          <input type="number" id="telefonoBar" required/>
                      </div>
                      <div class="col-md-4 col-lg-4 col-sm-12">
                          <h4>Correo electronico de contacto</h4>
                          <input disabled value="<%out.print(String.valueOf(request.getSession().getAttribute("Email")));%>"
                                 type="email" id="emailBar" required/>
                      </div>
                  </div>
                  <br/>
                  <div class="row">
                      <h3>Horarios en que atiendes</h3>
                      <div class="col-md-6 col-lg-6 col-sm-12">
                          <table>
                              <tr>
                                  <th>Días</th>
                                  <th>Abierto</th>
                                  <th style="text-align: center">Apertura</th>
                                  <th>Cierre</th>
                              </tr>
                              <tr>
                                  <td>Lunes</td>
                                  <td class="check"><input id="mondayChecked" type="checkbox" name="horario" value="Lunes"></td>
                                  <td><select class="selectHorarios" id="selectMondayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select  id="selectMondayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Martes</td>
                                  <td class="check"><input id="tuesdayChecked" type="checkbox" name="horario" value="Martes"></td>
                                  <td><select class="selectHorarios" id="selectTuesdayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectTuesdayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Miercoles</td>
                                  <td class="check"><input id="wednesdayChecked" type="checkbox" name="horario" value="Wednesday"></td>
                                  <td><select class="selectHorarios" id="selectWednesdayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectWednesdayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Jueves</td>
                                  <td class="check"><input id="thursdayChecked" type="checkbox" name="horario" value="Jueves"></td>
                                  <td><select class="selectHorarios" id="selectThursdayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectThursdayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Viernes</td>
                                  <td class="check"><input id="fridayChecked" type="checkbox" name="horario" value="Viernes"></td>
                                  <td><select  class="selectHorarios" id="selectFridayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectFridayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Sabado</td>
                                  <td class="check"><input id="saturdayChecked" type="checkbox" name="horario" value="Viernes"></td>
                                  <td><select class="selectHorarios" id="selectSaturdayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectSaturdayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                              <tr>
                                  <td>Domingo</td>
                                  <td class="check"><input id="sundayChecked" type="checkbox" name="horario" value="Domingo"></td>
                                  <td><select class="selectHorarios" id="selectSundayStart">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="10 PM">10 PM</option></select></td>
                                  <td><select id="selectSundayEnd">
                                      <option value="6 AM">6 AM</option>
                                      <option value="7 AM">7 AM</option>
                                      <option value="8 AM">8 AM</option>
                                      <option value="9 AM">9 AM</option>
                                      <option value="10 AM">10 AM</option>
                                      <option value="11 AM">11 AM</option>
                                      <option value="12 PM">12 PM</option>
                                      <option value="1 PM">1 PM</option>
                                      <option value="2 PM">2 PM</option>
                                      <option value="3 PM">3 PM</option>
                                      <option value="4 PM">4 PM</option>
                                      <option value="5 PM">5 PM</option>
                                      <option value="6 PM">6 PM</option>
                                      <option value="7 PM">7 PM</option>
                                      <option value="8 PM">8 PM</option>
                                      <option value="9 PM">9 PM</option>
                                      <option value="11 PM">10 PM</option>
                                      <option value="11 PM">11 PM</option>
                                      <option value="12 AM">00 AM</option>
                                      <option value="1 AM">1 AM</option>
                                      <option value="2 AM">2 AM</option>
                                      <option value="3 AM">3 AM</option>
                                  </select></td>
                              </tr>
                          <br/>
                          </table>
                      </div>
                      <div class="col-md-6 col-lg-6 col-sm-12">
                          <h3>Selecciona las fotos de tu bar</h3>
                          <div id="filesubmit">
                              <input type="file" class="file-select1" accept="image/*" multiple max="6"/><button class="file-submit">Subir</button>
                              <table>
                                  <th>Maximo 6 imagenes</th>
                                  <th style="text-align: right">Resultado</th>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result1"></h4></td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result2"></h4></td>
                                  </tr>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result3"></h4></td>
                                      </tr>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result4"></h4></td>
                                      </tr>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result5"></h4></td>
                                      </tr>
                                  <tr>
                                      <td></td>
                                      <td><h4 id="result6"></h4></td>
                                      </tr>
                              </table>


                          </div>
                      </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12" style="text-align: center;">
                        <h3>Selecciona la ubicación de tu bar</h3>
                      <div id="map">

                      </div>
                    </div>
                  </div>
                  <div class="row">

                    <div class="col-md-12 col-lg-12 col-sm-12" style="text-align: center;">
                        <button id="botonGuardar" type="button" class="btn btn-success">REGISTRAR</button>
                    </div>
                  </div>

              </div>
                      </div>
            </div>

    </div>
        <script src="/JukeboxAdministrator/assets/js/jquery-1.11.1.js"></script>
        <script src="/JukeboxAdministrator/assets/js/select2.js"></script>
        <%--<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js"></script>--%>
        <script src="/JukeboxAdministrator/assets/js/registro.js"></script>
        <script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA78DDXRBSSKiKs7elTIyWdwS7B-N5O9FQ&callback=initMap"
                async defer></script>


    </body>


</html>
