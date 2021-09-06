package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Employer;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.EmployerRepository;

/*
 * service responsible and used by the controllers
 * to communicate with the repositories
 * passes the details from the controller to the repositories
 */
@Service
public class EmployeerService {


	@Autowired
	private  EmployerRepository employerRepo ;

	public Employer saveJob(Employer job) {
		return employerRepo.save(job);
	}

	public  List<Employer> getAllJobs(String username)
	{
		return employerRepo.getAllJobs(username);
	}


	public List<Employer> getTop3Jobs(String username)
	{
		return employerRepo.getTop3Jobs(username);
	}

	


}