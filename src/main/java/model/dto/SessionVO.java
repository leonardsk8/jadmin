package model.dto;



public class SessionVO {

    private String sessionUserId;
    private String sessionState;
    private String sessionDateStart;
    private String sessionUserToken;
    private String sessionUserName;
    private String sessionUserImage;
    private String sessionUserEmail;

    public String getSessionUserEmail() {
        return sessionUserEmail;
    }

    public void setSessionUserEmail(String sessionUserEmail) {
        this.sessionUserEmail = sessionUserEmail;
    }

    public String getSessionUserImage() {
        return sessionUserImage;
    }

    public void setSessionUserImage(String sessionUserImage) {
        this.sessionUserImage = sessionUserImage;
    }

    

    public String getSessionUserName() {
        return sessionUserName;
    }

    public void setSessionUserName(String sessionUserName) {
        this.sessionUserName = sessionUserName;
    }

    public String getSessionUserToken() {
        return sessionUserToken;
    }

    public void setSessionUserToken(String sessionUserToken) {
        this.sessionUserToken = sessionUserToken;
    }

    public String getSessionUserId() {
        return sessionUserId;
    }

    public void setSessionUserId(String sessionUserId) {
        this.sessionUserId = sessionUserId;
    }

    public String getSessionState() {
        return sessionState;
    }

    public void setSessionState(String sessionState) {
        this.sessionState = sessionState;
    }

    public String getSessionDateStart() {
        return sessionDateStart;
    }

    public void setSessionDateStart(String sessionDateStart) {
        this.sessionDateStart = sessionDateStart;
    }
}
