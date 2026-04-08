package com.example.homestayhub.controller;

import com.example.homestayhub.entity.Homestay;
import com.example.homestayhub.repository.HomestayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/homestays")
@CrossOrigin(origins = "http://localhost:5173")
@SuppressWarnings({"null", "unchecked"})
public class HomestayController {

    @Autowired
    private HomestayRepository homestayRepository;

    @GetMapping
    public List<Homestay> getAllHomestays() {
        return homestayRepository.findAll();
    }

    @PostMapping
    public Homestay createHomestay(@RequestBody Homestay homestay) {
        return homestayRepository.save(homestay);
    }

    @GetMapping("/{id}")
    public Homestay getHomestayById(@PathVariable Long id) {
        return homestayRepository.findById(id).orElse(null);
    }
}