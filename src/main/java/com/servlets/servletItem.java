/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.servlets;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Type;
import java.util.List;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import model.dto.SessionVO;
import model.dto.SongVO;
/**
 *
 * @author leona
 */
public class servletItem extends HttpServlet {

    
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String option = request.getParameter("json");
        int val = Integer.parseInt(request.getParameter("option"));
        Type type = new TypeToken<List<SongVO>>()
        {}.getType();
        List<SongVO> listaCanciones = new Gson().fromJson(option, type);
        Collections.sort(listaCanciones);
        Collections.sort(listaCanciones, (SongVO p1, SongVO p2) -> new Integer(p2.getLikes()).compareTo(p1.getLikes()));
        switch (val) {
            case 1:
                int x = listaCanciones.get(listaCanciones.size()-1).getNum()+1;
                out.print(x);
                break;
            case 2:
                out.print(listaCanciones.get(0).getNum());
                break;
            case 3:
                out.print(new Gson().toJson(listaCanciones));
                break;
            default:
                break;
        }
       
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
         
         String option = request.getParameter("json");
         int val = Integer.parseInt(request.getParameter("option"));
         Type type=null;
         if(val == 1 || val == 2)
         type = new TypeToken<List<SongVO>>(){}.getType();
         else if (val == 3 || val == 4 || val == 5 || val == 6)
             type = new TypeToken<List<SessionVO>>(){}.getType();
          String var="";
          
         switch(val){
             case 1://LISTA DE REPRODUCCIÓN
                 List<SongVO> listaCanciones = new Gson().fromJson(option, type);
                 Collections.sort(listaCanciones);
                 Collections.sort(listaCanciones, (SongVO p1, SongVO p2) -> new Integer(p2.getLikes()).compareTo(p1.getLikes()));   
                 if(listaCanciones.size()>0){
                 var = listaCanciones.stream().map((s) -> "<li class='column' draggable='true'><header>"+s.getName()+"</header></li>\n").reduce(var, String::concat);
                 out.print(var);
                 }
                 break;
             case 2://LISTA CANCIONES POR APROBAR
                 List<SongVO> listToApproved = new Gson().fromJson(option, type);
                 for (SongVO s:listToApproved){
                     int x = (s.getName().length()>28)?28:s.getName().length();
                     var += ""
                         + "<li id='listHeaderToApproved' draggable='true'>"
                         + "<a class='nameSong' href='https://www.youtube.com/watch?v="+s.getVideo_id()+"' target=\"_blank\">"
                         + ""+s.getName().substring(0, x).toLowerCase()+".4..</a><button type=\"button\" class=\"btn btn-warning btn1A\""
                         + "onclick=\"toReproductionList('"+s.getName().replace("\"", "").replace("'","")+"','"+s.getVideo_id()
                         + "','"+ request.getSession().getAttribute("UID") +"','"+s.getThumbnail()+"','"+s.getUser()+"','"+s.getToken()
                         +"','"+s.getUserId()+"',true)\""
                         + "'>Aprobar</button><button type=\"button\" class=\"btn btn-danger btn1A\""
                                 + "onclick=\"removeSong('"+s.getVideo_id()+"',"+true+",'"+s.getToken()+"','"+s.getName()+"','"+s.getUserId()+"')\">Rechazar</button></li>"
                         + "\n"+s.getUser();
                 }
              
                 out.print(var);
                 break;
             case 3://LISTA USUARIOS
                 List<SessionVO> listUsers = new Gson().fromJson(option, type);
                 for (SessionVO s:listUsers) {
                     var +="<li id='listHeaderToApproved' draggable='true'>"
                         + "<a class='nameSong'>"
                         + ""+s.getSessionUserName()+"<br/>"+s.getSessionUserEmail()+"</a><button type=\"button\" class=\"btn btn-danger btn1A\""
                         + "onclick=\"updateSessionUser('"+s.getSessionDateStart()+"','vetoed',"
                         + "'"+s.getSessionUserId()+"','"+s.getSessionUserName()+"','"+s.getSessionUserToken()+"','"+s.getSessionUserImage()
                             +"','"+s.getSessionUserEmail()+"')\""
                         + "'>Vetar</button><button type=\"button\" class=\"btn btn-info btn1A\""
                                 + "onclick=\"messageUser('"+request.getSession().getAttribute("UID")+"','"+s.getSessionUserId()+"','"+s.getSessionUserToken()+"')\">Mensaje</button></li>";
                         
                 }
                 out.print(var);
                 break;
             case 4:
                  List<SessionVO> users = new Gson().fromJson(option, type);
                 for (SessionVO s:users) {
                     var +="<li id='listHeaderToApproved' draggable='true'>"
                         + "<a class='nameSong'>"+s.getSessionUserName()+"</a>"
                         + "<button type=\"button\" class=\"btn btn-info btn1A\""
                         + "onclick=\"checkChannel('"+s.getSessionUserId()+"','"+s.getSessionUserToken()+"','"+s.getSessionUserName()+"'"
                             + ",'"+s.getSessionUserImage()+"','"+s.getSessionDateStart()+"','"+s.getSessionState()+"')\">Seleccionar</button></li>";      
                 }
                 out.print(var);
                 break;
             case 5:// USUARIOS VETADOS
                 List<SessionVO> listUsersVetoed = new Gson().fromJson(option, type);
                 for (SessionVO s:listUsersVetoed) {
                     var +="<li id='listHeaderToApproved' draggable='true'>"
                         + "<a class='nameSong'>"
                         + ""+s.getSessionUserName()+"</a><button type=\"button\" class=\"btn btn-danger btn1A\""
                         + "onclick=\"updateSessionUser('"+s.getSessionDateStart()+"','active',"
                         + "'"+s.getSessionUserId()+"','"+s.getSessionUserName()+"','"+s.getSessionUserToken()+"'," +
                             "'"+s.getSessionUserImage()+"','"+s.getSessionUserEmail()+"')\""
                         + "'>Des-Vetar</button></li>";
                         
                 }
                 out.print(var);
                 break;
             case 6: //SELECCION DE USUARIO EN RECARGAS
                 List<SessionVO> listUsersReload = new Gson().fromJson(option, type);
                 for (SessionVO s:listUsersReload) {
                     var +="<li id='listHeaderToApproved' draggable='true'>"
                         + "<a class='nameSong nombres'>"
                         + ""+s.getSessionUserName()+" - "+s.getSessionUserEmail()+"</a><button type=\"button\" class=\"btn btn-info btn1A\""
                                 + "onclick=\"selectUser('"+s.getSessionUserId()+"','"+s.getSessionUserName()+"-"+s.getSessionUserEmail()+"')\">Seleccionar</button></li>";
                         
                 }
                 out.print(var);
                 break;
         }
        
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
