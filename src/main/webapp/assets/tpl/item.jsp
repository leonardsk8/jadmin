<%-- 
    Document   : item
    Created on : Jun 8, 2018, 9:44:04 PM
    Author     : leona
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>

<html>
    <body>
            <div class="contenedor">
        <h2>--title--</h2>
        <div id="--videoid--" class="reproductor" data-id="--videoid--">
            <img id="--videoid--img" data-id="--videoid--" class="imagen-previa" src="https://i.ytimg.com/vi/--videoid--/mqdefault.jpg"><div class="youtube-play"></div>
        </div>
        <div id="--videoid--tube"></div>
        <button id="--videoid--btn" type="button" class="btn btn-info btnList" onclick="toReproductionList('--title--','--videoid--','<%out.print(String.valueOf(request.getSession().getAttribute("UID")));%>','https://i.ytimg.com/vi/--videoid--/default.jpg','Admin','','',false)">A la lista de reproducción</button>
        
        </div>
        <script>
           $("#--videoid--").click(function (){
               var video = '<iframe class="video w100" width="300" height="200" src="//www.youtube.com/embed/--videoid--?autoplay=1" frameborder="0"></iframe>';
               $('#--videoid--').hide();
               $('#--videoid--tube').html(video);
            });
                      
        </script>
    </body>
    
    
</html>
