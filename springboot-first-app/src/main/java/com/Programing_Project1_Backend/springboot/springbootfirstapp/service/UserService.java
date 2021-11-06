package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import java.io.IOException;
import java.util.*;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.bucket.BucketName;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.filestore.FileStore;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.JobPost;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.BackgroundRepository;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;
import org.springframework.web.multipart.MultipartFile;

import static org.apache.http.entity.ContentType.*;
import static org.apache.http.entity.ContentType.IMAGE_JPEG;
import static org.apache.http.entity.ContentType.IMAGE_PNG;

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

	@Autowired
	private FileStore fileStore;

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
	 *     The job category and skills.
	 *
	 */

	public List<User>getPotentialCandidates(JobPost post) {
		String category = post.getCategory();
		String postCode = post.getLocationPincode();
		String jobType = post.getJobType();
		String salary = post.getSalary();
		String skills = post.getSkills();

		List<User> matchingCandidates = new ArrayList<>();
		Iterable<User> candidates = userRepo.findAll();
		for(User candidate : candidates) {
			Background background = backgroundRepository.findBackgroundByUser(candidate);
			if(background != null) {

				if(category.equals(background.getCategory()) && matchingSkills(background.getSkills(), skills)) {
					System.out.println("Found CANDIDATE: " + candidate.getEmail());
					matchingCandidates.add(candidate);
				}
			}
		}
		return matchingCandidates;


	}



	private boolean matchingSkills (String skills, String comparedSkills) {
		int matching = 0;
		String[] divided = skills.split(",");
		String[] compared = comparedSkills.split(",");

		for(String comparedSkill : compared) {
			for(String skill : divided  ) {
				comparedSkill.equals(skill);
				matching++;
			}
		}

		if(matching == compared.length || matching >= compared.length /2) {
			return true;
		}
		return false;
	}

	public void uploadUserProfileImage(Long userId, MultipartFile file) {
		//1.check if image is not empty
		isEmpty(file);
		//2. If file is an image
		isImage(file);
		//3. The user exists in our database.
		User user = userRepo.findById(userId).get();
		if(user == null) {
			throw new IllegalStateException("User does not exist");
		}
		//4. Grab some metadata from file if any
		Map<String, String> metadata = extractMetadata(file);
		//5. S tore the image in s3 and update database (userProfileImageLink) with s3 image link
		String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), String.valueOf(user.getId()));
		String filename = String.format("%s-%s", file.getOriginalFilename(), String.valueOf(user.getId()));
		try {
			fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
			user.setUserProfileImageLink(filename);
			userRepo.save(user);
		} catch (IOException e) {
			throw new IllegalStateException(e);
		}
	}

	public byte[] downloadUserProfileImage(Long userId) {
		User user = userRepo.findById(userId).get();
		if(user == null) {
			throw new IllegalStateException("User does not exist");
		}
		String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(),
				String.valueOf(user.getId()));
		return user.getUserProfileImageLink().map(key -> fileStore.download(path, key))
				.orElse(new byte[0]);

	}

	private Map<String, String> extractMetadata(MultipartFile file) {
		Map<String, String> metadata = new HashMap<>();
		metadata.put("Content-Type", file.getContentType());
		metadata.put("Content-Length", String.valueOf(file.getSize()));
		return metadata;
	}

	private void isImage(MultipartFile file) {

		if(Arrays.asList(IMAGE_JPEG, IMAGE_PNG, IMAGE_GIF).contains(file.getContentType())) {
			throw new IllegalStateException("File must be an image" + file.getContentType());
		}
	}

	private void isEmpty(MultipartFile file) {
		if(file.isEmpty()) {
			throw new IllegalStateException("Cannot upload empty fule [ " + file.getSize() + "]");
		}
	}
}