package com.Programing_Project1_Backend.springboot.springbootfirstapp.model;

import javax.persistence.Column; 
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


/* 
 the table created from the employee to post the job
 */
@Entity
@Table(name = "AllJobs")

public class Employer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "Job_Title")
	private String jobTitle;

	@Column(name = "Pincode")
	private int locationPincode;

	@Column(name = "Pay_Type")
	private String payType;

	@Column(name = "Category")
	private String category;

	@Column(name = "Job_Description")
	private String jobDescription;

	@Column(name = "Job_Type")
	private String jobType;

	@Column(name = "Skills")
	private String skills;

	@Column(name = "Employer_Username")
	private String employerUsername;

	public Employer()
	{
		super();
	}


	public Employer(long id, String jobTitle, int locationPincode, String payType, String category, String jobDescription,
			String jobType, String skills, String employerUsername) {
		super();
		this.id = id;
		this.jobTitle = jobTitle;
		this.locationPincode = locationPincode;
		this.payType = payType;
		this.category = category;
		this.jobDescription = jobDescription;
		this.jobType = jobType;
		this.skills = skills;
		this.employerUsername = employerUsername;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public int getlocationPincode() {
		return locationPincode;
	}

	public void setlocationPincode(int locationPincode) {
		this.locationPincode = locationPincode;
	}

	public String getPayType() {
		return payType;
	}

	public void setPayType(String payType) {
		this.payType = payType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getJobDescription() {
		return jobDescription;
	}

	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public String getSkills() {
		return skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}

	public String getEmployerUsername() {
		return employerUsername;
	}

	public void setEmployerUsername(String employerUsername) {
		this.employerUsername = employerUsername;
	}








}