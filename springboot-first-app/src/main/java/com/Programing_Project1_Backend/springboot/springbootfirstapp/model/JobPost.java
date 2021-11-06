package com.Programing_Project1_Backend.springboot.springbootfirstapp.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


/* 
 the table created from the employee to post the job
 */
@Entity
@Table(name = "JobPosts")

public class JobPost {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "Job_Title")
	private String jobTitle;

	@Column(name = "Pincode")
	private String locationPincode;
	
	@Column(name= "Location")
	private String location;

	private String state;
	
	@Column(name = "Salary")
	private String salary;


	@Column(name = "Category")
	private String category;

	@Column(name = "Job_Description")
	private String jobDescription;

	@Column(name = "Job_Type")
	private String jobType;

	@Column(name = "Skills")
	private String skills;


	@OneToMany(fetch=FetchType.LAZY, mappedBy = "post", orphanRemoval = true)
	private List<Application> applications = new ArrayList<Application>();

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(updatable = false)
	private Date created_at;
	@JsonFormat(pattern = "yyyy-MM-dd")

	private Date updated_at;
	@ManyToOne(fetch= FetchType.EAGER)
	@JoinColumn(name="userId", updatable =false, nullable=false)
	@JsonIgnore
	private User employer;


	public JobPost()
	{
		super();
	}


	

	public String getLocationPincode() {
		return locationPincode;
	}


	public void setLocationPincode(String locationPincode) {
		this.locationPincode = locationPincode;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getSalary() {
		return salary;
	}


	public void setSalary(String salary) {
		this.salary = salary;
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

	public User getEmployer() {
		return employer;
	}

	public void setEmployer(User employer) {
		this.employer = employer;
	}

	public List<Application> getApplications() {
		return applications;
	}

	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}
	@PrePersist
	protected void onCreate() {
		this.created_at = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		this.updated_at = new Date();
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	public Date getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Date updated_at) {
		this.updated_at = updated_at;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
}