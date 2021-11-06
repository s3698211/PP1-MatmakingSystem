package com.Programing_Project1_Backend.springboot.springbootfirstapp.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class SendMailService {
    @Autowired
    private JavaMailSender javaMailSender;

    public void sendEmail(String to, String body, String topic) {
        SimpleMailMessage simpleMessage = new SimpleMailMessage();
        simpleMessage.setFrom("tohoangkhoi@gmail.com");
        simpleMessage.setTo(to);
        simpleMessage.setSubject(topic);
        simpleMessage.setText(body);
        javaMailSender.send(simpleMessage);
        System.out.println("sent mail to " + to);

    }

}
