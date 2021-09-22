package com.Programing_Project1_Backend.springboot.springbootfirstapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="Application")
public class Application {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id;

    private String degree;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date created_at;
    @JsonFormat(pattern = "yyyy-MM-dd")

    private Date updated_at;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="candidateId", updatable = false, nullable = false )
    @JsonIgnore
    private User candidate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="postId", updatable = false, nullable = false )
    @JsonIgnore
    private JobPost post;


    public Application() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public Date getUpdate_at() {
        return updated_at;
    }

    public void setUpdate_at(Date update_at) {
        this.updated_at = update_at;
    }

    public User getCandidate() {
        return candidate;
    }

    public void setCandidate(User candidate) {
        this.candidate = candidate;
    }

    public JobPost getPost() {
        return post;
    }

    public void setPost(JobPost post) {
        this.post = post;
    }

    @PrePersist
    protected void onCreate() {
        this.created_at = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updated_at = new Date();
    }
}
