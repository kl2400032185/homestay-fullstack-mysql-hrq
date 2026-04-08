package com.example.homestayhub.controller;

import com.example.homestayhub.entity.Guide;
import com.example.homestayhub.repository.GuideRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/guides")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings({"null", "unchecked"})
public class GuideController {

    @Autowired
    private GuideRepository guideRepository;

    @GetMapping
    public List<Guide> getAllGuides() {
        return guideRepository.findAll();
    }

    @PostMapping
    public Guide createGuide(@RequestBody Guide guide) {
        return guideRepository.save(guide);
    }

    @GetMapping("/{id}")
    public Guide getGuideById(@PathVariable Long id) {
        return guideRepository.findById(id).orElse(null);
    }
}