package com.Programing_Project1_Backend.springboot.springbootfirstapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler
    public final ResponseEntity<Object> handleDuplicateUserException(DuplicateUserExceptionHandler ex, WebRequest web) {
        DuplicateUserExceptionResponse duplicateUserExceptionResponse = new DuplicateUserExceptionResponse(ex.getMessage());
        return new ResponseEntity(duplicateUserExceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest web) {
        ResourceNotFoundReponse resourceNotFoundReponse = new ResourceNotFoundReponse(ex.getMessage());
        return new ResponseEntity(resourceNotFoundReponse, HttpStatus.BAD_REQUEST);
    }

}
