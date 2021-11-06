package com.Programing_Project1_Backend.springboot.springbootfirstapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DuplicateUserExceptionHandler extends RuntimeException {
    public DuplicateUserExceptionHandler(String message) {
        super(message);
    }
}
