package com.Programing_Project1_Backend.springboot.springbootfirstapp.controller;


import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.service.BackgroundService;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.service.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@CrossOrigin(origins = "http://job-hunter.s3-website-ap-southeast-2.amazonaws.com")
@RestController
@RequestMapping("/api/background/")
public class BackgroundController {

    @Autowired
    private BackgroundService backgroundService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/")
    public ResponseEntity<?> postBackground(@Valid @RequestBody Background background, BindingResult result, Principal principal) {
        ResponseEntity<?>errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap !=null) return errorMap;

        Background returnBackground =  backgroundService.saveBackground(background, principal.getName());
        return new ResponseEntity<Background>(returnBackground,HttpStatus.CREATED);
    }



}
