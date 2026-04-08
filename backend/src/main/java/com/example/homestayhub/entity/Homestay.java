package com.example.homestayhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "homestays")
public class Homestay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private double price;
    private double rating;
    private int reviews;
    private String image;
    private String availability;
    private String amenities;
    private String type;
    private int guests;
    private int bedrooms;
    private String description;
    private String host;

    public Homestay() {}

    public Homestay(String name, String location, double price, double rating, int reviews, String image, String availability, String amenities, String type, int guests, int bedrooms, String description, String host) {
        this.name = name;
        this.location = location;
        this.price = price;
        this.rating = rating;
        this.reviews = reviews;
        this.image = image;
        this.availability = availability;
        this.amenities = amenities;
        this.type = type;
        this.guests = guests;
        this.bedrooms = bedrooms;
        this.description = description;
        this.host = host;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviews() { return reviews; }
    public void setReviews(int reviews) { this.reviews = reviews; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getGuests() { return guests; }
    public void setGuests(int guests) { this.guests = guests; }

    public int getBedrooms() { return bedrooms; }
    public void setBedrooms(int bedrooms) { this.bedrooms = bedrooms; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getHost() { return host; }
    public void setHost(String host) { this.host = host; }
}