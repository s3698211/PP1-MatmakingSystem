package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.exception.DuplicateUserExceptionHandler;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Application;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.JobPost;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.ApplicationRepository;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.JobPostRepository;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    JobPostRepository jobPostRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    SendMailService sendMailService;

    public List<Application> getApplicationsPostId(Long postId) {
        return applicationRepository.findAllByPostId(postId);
    }

    public List<Application> getApplicationsCandidateId(Long candidateId) {
        return applicationRepository.findAllByCandidateId(candidateId);
    }

    public Application getApplicationById(Long id) {

        Optional<Application> temp = applicationRepository.findById(id);
        return temp.get();
    }

    /**
     *
     * @param postId
     * @param candidateName
     * @return
     * Application
     * @Description:
     * Create application everytime a user applies for a job.
     * For each job, user can only apply one time.
     */
    public Application saveApplication( Application application,Long postId, String candidateName) {

        User user = userRepository.findByUsername(candidateName).get();
        JobPost post = jobPostRepository.findById(postId).get();

        List<Application> postApplications = post.getApplications();
        List<Application> userApplications = user.getApplications();

        for(Application a : postApplications) {
            if(a.getCandidate().getId().equals(user.getId())) {
                throw new DuplicateUserExceptionHandler("User " + user.getEmail() + " is already applied to this job.");
            }
        }

        postApplications.add(application);

        userApplications.add(application);

        application.setCandidate(user);
        application.setPost(post);

        applicationRepository.save(application);

        //SendEmail to notify
        String body = "There is one just applied to your job " + post.getJobTitle()+ ". Please take a look";

        sendMailService.sendEmail(post.getEmployer().getEmail(), body, "Job Hunter - Job Notification");
        System.out.println(post.getEmployer().getEmail());
        return application;

    }



}
