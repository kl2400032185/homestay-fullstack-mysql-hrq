package com.example.homestayhub.controller;

import com.example.homestayhub.entity.User;
import com.example.homestayhub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend
@SuppressWarnings({"null", "unchecked"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping

    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}