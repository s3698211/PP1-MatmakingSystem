package com.Programing_Project1_Backend.springboot.springbootfirstapp.repository;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BackgroundRepository extends CrudRepository<Background, Long> {
    @Override
    Optional<Background> findById(Long id);

    Background findBackgroundByUser(User user);
}
