package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import java.util.List;  
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;

/*
 * Store and fetches user details for all
 * user over the application (Admin, employer and seeker)
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findById(Long id);
	Optional<User> findByUsername(String username);
	Boolean existsByUsername(String username);
	List<User> findAll();
	Boolean existsByEmail(String email);

//	Boolean existsByUsername(String username);
//
//	Boolean existsByEmail(String email);
//
	@Query(value = "SELECT * FROM Users WHERE user_type='JOB_SEEKER'; ", nativeQuery= true)
	List<User> getAllUserBySeeker();
	
	@Query(value = "SELECT * FROM Users WHERE id= :userid ", nativeQuery= true)
	User getUserById(@Param("userid") Long userid);

	@Query(value = "SELECT * FROM Users WHERE user_type='EMPLOYER'; ", nativeQuery= true)
	List<User> getAllUserByEmployer();

	@Query(value = "SELECT * FROM Users WHERE user_type='ADMIN'; ", nativeQuery= true)
	List<User> getAllUserByAdmin();

	@Query(value = "SELECT * FROM Users WHERE user_name= :username ", nativeQuery= true)
	User getAllUserByUsername(@Param("username") String username);

	@Query(value = "SELECT COUNT(user_type) FROM Users WHERE user_type='ADMIN'; ", nativeQuery= true)
	int getAdminExistanceCount();

	@Query(value = "SELECT id FROM USERS WHERE user_name= :username  ", nativeQuery= true)
	int getId(@Param("username") String username);        
//
	@Query(value = "SELECT user_type FROM USERS WHERE user_name= :username  ", nativeQuery= true)
	String getUserType(@Param("username") String username);

	@Transactional
	@Modifying
	@Query(value = " Delete u, r from Users u, user_roles r WHERE u.user_name = :username AND u.id=r.user_id", nativeQuery = true)
	void deleteUser(@Param("username") String username);

	@Transactional
	@Modifying
	@Query(value = "SET FOREIGN_KEY_CHECKS=1 ", nativeQuery= true)
	void onKey();

	@Transactional
	@Modifying
	@Query(value = "SET FOREIGN_KEY_CHECKS=0 ", nativeQuery= true)
	void offKey();

	@Query(value = "SELECT COUNT(*) FROM Users WHERE user_type='ADMIN'; ", nativeQuery= true)
	int getTotalAdminCount();

	@Query(value = "SELECT COUNT(*) FROM Users WHERE user_type='EMPLOYER'; ", nativeQuery= true)
	int getTotalEmployersCount();

	@Query(value = "SELECT COUNT(*) FROM Users WHERE user_type='JOB_SEEKER'; ", nativeQuery= true)
	int getTotalEmployeesCount();

}
