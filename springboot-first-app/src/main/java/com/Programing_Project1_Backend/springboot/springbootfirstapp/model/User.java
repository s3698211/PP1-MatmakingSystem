package com.Programing_Project1_Backend.springboot.springbootfirstapp.model;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/*
 * table used to stores all 
 * details of user registrations 
 */
@Entity
@Table(	name = "users") 
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name="FirstName")
	private String firstname;

	@Column(name="UserName")
	private String username;

	@Column(name="LastName")
	private String lastname;

	@Column(name="Email")
	private String email;

	@Column(name="Address")
	private String address;

	@Column(name="Phone")
	private String phone;

	@Column(name="UserType")
	private String user_type;

	@Column(name="Password")
	private String password;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
	joinColumns = @JoinColumn(name = "user_id"), 
	inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	public User() {
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User(String username, String firstname, String lastname, String email, String address, String phone,
			String password, String user_type) {
		super();
		this.username=username;
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.address = address;
		this.phone = phone;
		this.password = password;
		this.user_type=user_type;
	}

	public String getUser_type() {
		return user_type;
	}

	public void setUser_type(String user_type) {
		this.user_type = user_type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
}
