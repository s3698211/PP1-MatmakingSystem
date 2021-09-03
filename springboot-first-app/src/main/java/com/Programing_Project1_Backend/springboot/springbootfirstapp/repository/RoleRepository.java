package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import java.util.Optional; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.ERole;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Role;

/*
 * The table is pre-filled with pre-defined roles to make it 
 * consistent for new user registration 
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByName(ERole name);
	
	
}
