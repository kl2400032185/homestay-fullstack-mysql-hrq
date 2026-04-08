package com.example.homestayhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "attractions")
public class Attraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String category;
    private double rating;
    private String image;
    private String description;
    private double entryFee;
    private String bestTime;
    private String duration;

    // Constructors, getters, setters
    public Attraction() {}

    public Attraction(String name, String location, String category, double rating, String image, String description, double entryFee, String bestTime, String duration) {
        this.name = name;
        this.location = location;
        this.category = category;
        this.rating = rating;
        this.image = image;
        this.description = description;
        this.entryFee = entryFee;
        this.bestTime = bestTime;
        this.duration = duration;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getEntryFee() { return entryFee; }
    public void setEntryFee(double entryFee) { this.entryFee = entryFee; }

    public String getBestTime() { return bestTime; }
    public void setBestTime(String bestTime) { this.bestTime = bestTime; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }
}