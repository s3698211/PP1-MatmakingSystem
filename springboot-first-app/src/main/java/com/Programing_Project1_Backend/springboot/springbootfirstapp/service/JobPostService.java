package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.BackgroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.exception.ResourceNotFoundException;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.JobPost;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.JobPostRepository;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;

/*
 * service responsible and used by the controllers
 * to communicate with the repositories
 * passes the details from the controller to the repositories
 */
@Service
public class JobPostService {


	@Autowired
	private  JobPostRepository jobPostRepo ;
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BackgroundRepository backgroundRepository;

	public JobPost saveJob(JobPost job, Long employerId) {
		Optional<User> userResponse = userRepository.findById(employerId);

		User user = userResponse.get();

		List<JobPost> tempList = user.getJobPosts();
		tempList.add(job);
		user.setJobPosts(tempList);
		job.setEmployer(user);
	
		return jobPostRepo.save(job);
	}

	public  List<JobPost> getAllJobsByEmployerId(Long employerId)
	{
		return jobPostRepo.findAllByEmployerId(employerId);
	}

	
	public JobPost getJobPostById(Long postId) {
		Optional<JobPost> jobPostReponse = jobPostRepo.findById(postId);	
		return jobPostReponse.get();
		
	}

	public Iterable<JobPost> getAllJobPost() {
		Iterable<JobPost> jobPostList = jobPostRepo.findAll();
		return jobPostList;
	}

	public List<JobPost> getJobPostByUserBackground(String username) {
		User user = userRepository.findByUsername(username).get();

		try {
			Background background = backgroundRepository.findBackgroundByUser(user);

			return getJobPostsByBackground(background);

		} catch(Exception er ) {

				throw new ResourceNotFoundException("Background does not exist/");

		}


	}

	public List <JobPost> getJobPostsByBackground(Background background) {


		String category = background.getCategory();

		List<JobPost> matchingPosts = new ArrayList<JobPost>();
		Iterable<JobPost> allPosts = jobPostRepo.findAll();
		for(JobPost post : allPosts) {
			if(category.equals(post.getCategory())) {
				matchingPosts.add(post);
			}
		}


		return matchingPosts;
	}
	
	
}