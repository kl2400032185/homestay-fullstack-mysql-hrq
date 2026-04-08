package com.example.homestayhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String avatar;
    private int rating;
    private String date;
    private String property;
    private String comment;
    private String status; // approved, pending, flagged

    // Constructors, getters, setters
    public Review() {}

    public Review(String author, String avatar, int rating, String date, String property, String comment, String status) {
        this.author = author;
        this.avatar = avatar;
        this.rating = rating;
        this.date = date;
        this.property = property;
        this.comment = comment;
        this.status = status;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public int getRating() { return rating; }
    public void setRating(int rating) { this.rating = rating; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getProperty() { return property; }
    public void setProperty(String property) { this.property = property; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}