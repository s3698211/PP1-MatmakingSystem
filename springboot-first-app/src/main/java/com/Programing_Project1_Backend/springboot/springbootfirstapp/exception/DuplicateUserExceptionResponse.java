package com.Programing_Project1_Backend.springboot.springbootfirstapp.exception;

public class DuplicateUserExceptionResponse {
    private String username;

    public DuplicateUserExceptionResponse(String username) {
        this.username =username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
