package com.example.homestayhub.controller;

import com.example.homestayhub.entity.Attraction;
import com.example.homestayhub.repository.AttractionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attractions")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings({"null", "unchecked"})
public class AttractionController {

    @Autowired
    private AttractionRepository attractionRepository;

    @GetMapping
    public List<Attraction> getAllAttractions() {
        return attractionRepository.findAll();
    }

    @PostMapping
    public Attraction createAttraction(@RequestBody Attraction attraction) {
        return attractionRepository.save(attraction);
    }

    @GetMapping("/{id}")
    public Attraction getAttractionById(@PathVariable Long id) {
        return attractionRepository.findById(id).orElse(null);
    }
}