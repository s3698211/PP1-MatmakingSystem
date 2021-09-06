package com.Programing_Project1_Backend.springboot.springbootfirstapp.controller;

import java.util.ArrayList;  
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Employer;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.request.EmployerRequest;


import com.Programing_Project1_Backend.springboot.springbootfirstapp.service.EmployeerService;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.service.UserService;

;

/*
 * this controller is responsible for executing all the requests 
 * made by an employer over the application
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/job/employer")
public class EmployeerController {

  @Autowired
  public EmployeerService JobEmployerService;

  @Autowired
   UserRepository userRepository;
  


  @Autowired
   EmployeerService employerService;

 

  @Autowired
   UserService userService;

  /*
   *  controller takes in the employer user name as parameter and 
   *  returns a list of all jobs created by an employer
   *  stored in the database
   */
  @PostMapping("/alljobs")
  public List < Employer > getAllJobs(@RequestBody EmployerRequest info) {
    return employerService.getAllJobs(info.getUsername());
  }
  @PostMapping("/top3")
  public List < Employer > getTop3Jobs(@RequestBody EmployerRequest info) {
    return employerService.getTop3Jobs(info.getUsername());
  }

  /*
   *  controller takes in the job details of a job posted
   *  by an employer and saves it in the database
   */
  @PostMapping("/postjob")
  public void saveJob(@RequestBody Employer info) {
	  employerService.saveJob(info);
  }

  
 
  
}

