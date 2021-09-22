package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import  com.Programing_Project1_Backend.springboot.springbootfirstapp.model.JobPost;

/*
 * this repository stores all the details related to
 * job employer and stores them in the table 
 * to keep it updated
 */
@Repository
public interface JobPostRepository extends CrudRepository<JobPost, Long> {
	
	List<JobPost> findAllByEmployerId(Long employerId);
	Iterable<JobPost> findAll();
	Optional<JobPost> findById(Long id);

}
