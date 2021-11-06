package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Application;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends CrudRepository<Application, Long> {
    List<Application> findAllByPostId(Long postId);
    List<Application> findAllByCandidateId(Long candidateId);

    @Override
    Optional<Application> findById(Long applicationId);


}
