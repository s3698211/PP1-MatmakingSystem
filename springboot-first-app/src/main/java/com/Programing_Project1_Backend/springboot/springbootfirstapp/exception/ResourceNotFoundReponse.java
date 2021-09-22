package com.Programing_Project1_Backend.springboot.springbootfirstapp.exception;

public class ResourceNotFoundReponse {
    private String resource;

    public ResourceNotFoundReponse(String resource) {this.resource = resource;}

    public String getResource() {
        return resource;
    }

    public void setResource(String resource) {
        this.resource = resource;
    }
}
