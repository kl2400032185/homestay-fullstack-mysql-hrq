package com.example.homestayhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "guides")
public class Guide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialty;
    private String location;
    private int experience;
    private String languages; // Could be JSON or separate table, but for simplicity string
    private double rating;
    private int reviews;
    private double rate;
    private String image;
    private String services; // Similarly, string for simplicity

    // Constructors, getters, setters
    public Guide() {}

    public Guide(String name, String specialty, String location, int experience, String languages, double rating, int reviews, double rate, String image, String services) {
        this.name = name;
        this.specialty = specialty;
        this.location = location;
        this.experience = experience;
        this.languages = languages;
        this.rating = rating;
        this.reviews = reviews;
        this.rate = rate;
        this.image = image;
        this.services = services;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecialty() { return specialty; }
    public void setSpecialty(String specialty) { this.specialty = specialty; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getExperience() { return experience; }
    public void setExperience(int experience) { this.experience = experience; }

    public String getLanguages() { return languages; }
    public void setLanguages(String languages) { this.languages = languages; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviews() { return reviews; }
    public void setReviews(int reviews) { this.reviews = reviews; }

    public double getRate() { return rate; }
    public void setRate(double rate) { this.rate = rate; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getServices() { return services; }
    public void setServices(String services) { this.services = services; }
}