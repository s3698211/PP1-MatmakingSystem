package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import java.util.ArrayList;
import java.util.List;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.JobPost;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.BackgroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;

/*
 * service responsible and used by the controllers
 * to communicate with the repositories
 * passes the details from the controller to the repositories
 */
@Service
public class UserService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private BackgroundRepository backgroundRepository;
	//get only employee list form USER table
	public String getUserType(String username) {
		return userRepo.getUserType(username);
	}

	public int getAdminExistanceCount()
	{
		return userRepo.getAdminExistanceCount();
	}

	public int getId(String username)
	{
		return userRepo.getId(username);
	}

	public List<User> getAllBySeeker()
	{
		return userRepo.getAllUserBySeeker();
	}

	public List<User> getAllByEmployer()
	{
		return userRepo.getAllUserByEmployer();
	}

	public List<User> getAllByAdmin()
	{
		return userRepo.getAllUserByAdmin();
	}

	public User getAllUserByUsername(String username)
	{
		return userRepo.getAllUserByUsername(username);
	}

	public void deleteUser(String username)
	{
		userRepo.offKey();
		userRepo.deleteUser(username);
		userRepo.onKey();
	}

	/**	 * 	 *
	 * @param post
	 * @return
	 * List<User>
	 *     Description: Display potential candidates for a jobpost based on
	 *     its requirement
	 */

	public List<User>getPotentialCandidates(JobPost post) {
		String category = post.getCategory();
		String postCode = post.getLocationPincode();
		String jobType = post.getJobType();
		String salary = post.getSalary();

		List<User> matchingCandidates = new ArrayList<>();
		Iterable<User> candidates = userRepo.findAll();
		for(User candidate : candidates) {
			Background background = backgroundRepository.findBackgroundByUser(candidate);
			if(background != null) {
				if(category.equals(background.getCategory()) || postCode.equals(background.getPostCode())
						|| jobType.equals(background.getJobType()) || salary.equals(background.getSalary())) {
					matchingCandidates.add(candidate);
				}
			}

		}

		return matchingCandidates;
	}





}