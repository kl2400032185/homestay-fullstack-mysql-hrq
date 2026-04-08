package com.example.homestayhub.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String bookingId;
    private String type; // HOMESTAY, GUIDE, etc.
    private String status; // CONFIRMED, PENDING, COMPLETED, CANCELLED
    private String property;
    private String location;
    private String customer;
    private String email;
    private String checkIn;
    private String checkOut;
    private int guests;
    private double total;
    private boolean paid;
    private String image;

    // Constructors, getters, setters
    public Booking() {}

    public Booking(String bookingId, String type, String status, String property, String location, String customer, String email, String checkIn, String checkOut, int guests, double total, boolean paid, String image) {
        this.bookingId = bookingId;
        this.type = type;
        this.status = status;
        this.property = property;
        this.location = location;
        this.customer = customer;
        this.email = email;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.guests = guests;
        this.total = total;
        this.paid = paid;
        this.image = image;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getProperty() { return property; }
    public void setProperty(String property) { this.property = property; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCustomer() { return customer; }
    public void setCustomer(String customer) { this.customer = customer; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCheckIn() { return checkIn; }
    public void setCheckIn(String checkIn) { this.checkIn = checkIn; }

    public String getCheckOut() { return checkOut; }
    public void setCheckOut(String checkOut) { this.checkOut = checkOut; }

    public int getGuests() { return guests; }
    public void setGuests(int guests) { this.guests = guests; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public boolean isPaid() { return paid; }
    public void setPaid(boolean paid) { this.paid = paid; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}