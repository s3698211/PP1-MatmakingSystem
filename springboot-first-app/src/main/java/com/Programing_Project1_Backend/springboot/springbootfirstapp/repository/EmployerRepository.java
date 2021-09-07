package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import  com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Employer;

/*
 * this repository stores all the details related to
 * job employer and stores them in the table 
 * to keep it updated
 */
@Repository
public interface EmployerRepository extends JpaRepository < Employer, Long > {

	@Query(value = "SELECT * FROM All_JOBS WHERE  Employer_Username = :username ", nativeQuery = true)
	List <Employer> getAllJobs(@Param("username") String username);

	@Query(value = "SELECT * FROM All_jobs WHERE Employer_Username = :username ORDER BY id DESC Limit 0,3", nativeQuery = true)
	List <Employer> getTop3Jobs(@Param("username") String username);

	@Query(value = "SELECT * FROM All_JOBS", nativeQuery = true)
	List <Employer> viewAll();

	



}
