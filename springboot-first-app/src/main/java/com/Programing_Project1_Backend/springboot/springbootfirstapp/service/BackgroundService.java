package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;

import com.Programing_Project1_Backend.springboot.springbootfirstapp.exception.ResourceNotFoundException;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.Background;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.model.User;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.BackgroundRepository;
import com.Programing_Project1_Backend.springboot.springbootfirstapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BackgroundService {
    @Autowired
    private BackgroundRepository backgroundRepository;

    @Autowired
    private UserRepository userRepository;


    public Background saveBackground(Background background, String username) {
        User user = userRepository.findByUsername(username).get();
        if(user == null) {
            throw new ResourceNotFoundException("User " + username + " does not exist.");
        }
        //Update background
        if(user.getBackground() != null) {
            background.setId(user.getBackground().getId());
        }
        //Create background
        user.setBackground(background);
        background.setUser(user);

        return backgroundRepository.save(background);
    }
}
