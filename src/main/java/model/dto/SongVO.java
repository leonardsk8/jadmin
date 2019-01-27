/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package model.dto;

import java.util.Map;

/**
 *
 * @author leona
 */
public class SongVO implements Comparable<SongVO>{

    private String name;
    private String user;
    private String thumbnail;
    private String video_id;
    private String token;
    private boolean reproducing;
    private int likes;
    private int num;
    private String userId;
    private boolean approved;
    private Map<String, UserLikeVO> listLikes;
    
    
    @Override
    public int compareTo(SongVO o) {
        if (num < o.num) {
                return -1;
            }
        if (num > o.num ) {
                return 1;
        }
            return 0;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

  

    
    
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    public boolean isReproducing() {
        return reproducing;
    
    }


    public void setReproducing(boolean reproducing) {
        this.reproducing = reproducing;
    }

    public int getLikes() {
        if(isReproducing())
            likes = 1000;
        if(getListLikes()!=null)
            likes = getListLikes().size();
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getVideo_id() {
        return video_id;
    }

    public void setVideo_id(String video_id) {
        this.video_id = video_id;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public Map<String, UserLikeVO> getListLikes() {
        return listLikes;
    }

    public void setListLikes(Map<String, UserLikeVO> listLikes) {
        this.listLikes = listLikes;
    }
    
}
