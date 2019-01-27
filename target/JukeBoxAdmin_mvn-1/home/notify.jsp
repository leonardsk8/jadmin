<%-- 
    Document   : notify
    Created on : Jun 25, 2018, 9:50:55 AM
    Author     : leona
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        <script src="https://www.gstatic.com/firebasejs/3.6.1/firebase.js"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        
        <input id="answer" type="hidden" value="">
        <input id="sessionUserId" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionUserId")));%>">
        <input id="sessionState" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionState")));%>">
        <input id="sessionDateStart" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionDateStart")));%>">
        <input id="sessionUserToken" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionUserToken")));%>">
        <input id="sessionUserName" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionUserName")));%>">
        <input id="sessionUserBar" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionUserBar")));%>">
        <input id="sessionUserImage" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("sessionUserImage")));%>">
        <input id="title" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("title")));%>">
        <input id="body" type="hidden" value="<%out.print(String.valueOf(request.getSession().getAttribute("body")));%>">
        <script src="/JukeboxAdministrator/assets/js/notify.js"></script>
        
    </body>
</html>
