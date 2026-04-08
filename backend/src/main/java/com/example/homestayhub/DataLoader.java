package com.example.homestayhub;

import com.example.homestayhub.entity.*;
import com.example.homestayhub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private HomestayRepository homestayRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private GuideRepository guideRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public void run(String... args) throws Exception {
        if (homestayRepository.count() == 0) {
            loadHomestays();
        }
        if (attractionRepository.count() == 0) {
            loadAttractions();
        }
        if (guideRepository.count() == 0) {
            loadGuides();
        }
        if (bookingRepository.count() == 0) {
            loadBookings();
        }
        if (reviewRepository.count() == 0) {
            loadReviews();
        }
    }

    private void loadHomestays() {
        homestayRepository.save(new Homestay("Cozy Mountain Retreat", "Shimla, Himachal Pradesh", 2500, 4.8, 124, "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80", "Available year-round", "WiFi,Kitchen,Mountain View,Fireplace,Parking", "Cottage", 4, 2, "A charming mountain retreat nestled in the Himalayan foothills. Perfect for couples and families seeking a peaceful escape.", "Priya Sharma"));
        homestayRepository.save(new Homestay("Luxury Beach Villa", "Goa, Goa", 4500, 4.9, 89, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80", "Available except monsoon season", "Pool,WiFi,AC,Beach Access,Chef", "Villa", 8, 4, "Experience luxury living by the Arabian Sea. This stunning villa features a private pool and world-class amenities.", "Raj Kapoor"));
        homestayRepository.save(new Homestay("Urban Heritage Home", "Jaipur, Rajasthan", 1800, 4.7, 203, "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", "Available year-round", "WiFi,AC,Heritage Architecture,Courtyard,Breakfast", "Heritage Home", 6, 3, "Live like royalty in a beautifully restored Rajasthani haveli. Rich in culture, art, and traditional architecture.", "Meera Rathore"));
        homestayRepository.save(new Homestay("Kerala Backwater Home", "Alleppey, Kerala", 3200, 4.6, 156, "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80", "Available year-round", "Boat Tour,Chef,AC,Sunset Views,WiFi", "Houseboat", 4, 2, "Float through the serene backwaters of Kerala on this traditional houseboat.", "Thomas Varghese"));
        homestayRepository.save(new Homestay("Tea Garden Bungalow", "Darjeeling, West Bengal", 2100, 4.5, 78, "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=600&q=80", "Available except peak summer", "Tea Tour,Garden,WiFi,Mountain View,Breakfast", "Bungalow", 5, 3, "Wake up to misty mountains and fresh tea leaves in this colonial-era bungalow.", "Anita Ghosh"));
        homestayRepository.save(new Homestay("Desert Safari Camp", "Jaisalmer, Rajasthan", 3500, 4.8, 112, "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", "October to March only", "Camel Safari,Bonfire,Cultural Shows,Stargazing,Traditional Meals", "Glamping", 2, 1, "Experience the magic of the Thar Desert under a sky full of stars.", "Vikram Singh"));
    }

    private void loadAttractions() {
        attractionRepository.save(new Attraction("Taj Mahal", "Agra, Uttar Pradesh", "Historical Monument", 4.9, "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80", "One of the Seven Wonders of the World, this magnificent white marble mausoleum is a testament to eternal love.", 1100, "October to March", "2-3 hours"));
        attractionRepository.save(new Attraction("Goa Beaches", "Panaji, Goa", "Beach & Nature", 4.7, "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", "Pristine beaches, vibrant nightlife, and Portuguese heritage.", 0, "November to February", "Full day"));
        attractionRepository.save(new Attraction("Kerala Backwaters", "Alleppey, Kerala", "Nature & Water", 4.8, "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80", "A serene network of lagoons, lakes, and canals through palm-fringed villages.", 500, "September to March", "Half to full day"));
        attractionRepository.save(new Attraction("Manali Valley", "Manali, Himachal Pradesh", "Mountain & Adventure", 4.6, "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80", "High-altitude Himalayan resort for skiing, trekking, and snow-capped mountain views.", 0, "October to June", "Multiple days"));
        attractionRepository.save(new Attraction("Jaipur Pink City", "Jaipur, Rajasthan", "Heritage & Culture", 4.7, "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80", "Magnificent forts, palaces, and bazaars showcasing Rajput grandeur.", 200, "October to March", "2-3 days"));
        attractionRepository.save(new Attraction("Mysore Palace", "Mysore, Karnataka", "Historical Monument", 4.5, "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80", "Magnificent royal palace famous for its Dasara festival illuminations.", 200, "October to February", "2-3 hours"));
        attractionRepository.save(new Attraction("Varanasi Ghats", "Varanasi, Uttar Pradesh", "Spiritual & Cultural", 4.6, "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80", "One of the world's oldest living cities and a spiritual epicenter.", 0, "October to March", "Full day"));
        attractionRepository.save(new Attraction("Andaman Islands", "Port Blair, Andaman", "Beach & Nature", 4.8, "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", "Crystal-clear waters, pristine beaches, and rich marine life.", 0, "November to April", "5-7 days"));
    }

    private void loadGuides() {
        guideRepository.save(new Guide("Ravi Kumar", "Heritage & Culture Tours", "Delhi & Agra", 12, "English,Hindi,Spanish,French", 4.9, 234, 500, "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", "Historical Monument Tours,Cultural Experiences,Food Tours,Photography Tours,Night Tours"));
        guideRepository.save(new Guide("Priya Nair", "Backwater & Nature Tours", "Kerala", 8, "English,Hindi,Malayalam", 4.8, 167, 400, "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", "Houseboat Tours,Bird Watching,Village Walks,Cooking Classes"));
        guideRepository.save(new Guide("Arjun Singh", "Adventure & Mountain Tours", "Manali, Himachal Pradesh", 15, "English,Hindi,Punjabi", 4.7, 189, 600, "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80", "Trekking,Skiing,Rock Climbing,Camping"));
        guideRepository.save(new Guide("Meena Joshi", "Cultural & Food Tours", "Rajasthan", 10, "English,Hindi,French", 4.6, 145, 450, "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", "Food Tours,Cooking Classes,Palace Tours,Desert Safari"));
        guideRepository.save(new Guide("Samuel D'Souza", "Beach & Water Sports", "Goa", 9, "English,Hindi,Portuguese", 4.8, 212, 550, "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", "Scuba Diving,Surfing,Beach Tours,Water Sports"));
        guideRepository.save(new Guide("Ananya Bose", "Wildlife & Nature", "Jim Corbett, Uttarakhand", 11, "English,Hindi,Bengali", 4.9, 178, 650, "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80", "Safari Tours,Bird Watching,Nature Walks,Photography"));
    }

    private void loadBookings() {
        bookingRepository.save(new Booking("BK-2026-001", "HOMESTAY", "CONFIRMED", "Cozy Mountain Retreat", "Shimla, Himachal Pradesh", "Sarah Johnson", "sarah.j@example.com", "2026-03-20", "2026-03-25", 2, 12500, true, "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=200&q=80"));
        bookingRepository.save(new Booking("BK-2026-002", "HOMESTAY", "PENDING", "Luxury Beach Villa", "Goa, Goa", "Rahul Mehta", "rahul.m@example.com", "2026-04-10", "2026-04-15", 4, 22500, false, "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80"));
        bookingRepository.save(new Booking("BK-2026-003", "GUIDE", "CONFIRMED", "Heritage Tour with Ravi Kumar", "Agra, Uttar Pradesh", "Emily Chen", "emily.c@example.com", "2026-03-18", "2026-03-18", 2, 2000, true, "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200&q=80"));
        bookingRepository.save(new Booking("BK-2026-004", "HOMESTAY", "COMPLETED", "Urban Heritage Home", "Jaipur, Rajasthan", "James Wilson", "james.w@example.com", "2026-02-01", "2026-02-05", 3, 7200, true, "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80"));
        bookingRepository.save(new Booking("BK-2026-005", "GUIDE", "CANCELLED", "Beach Tour with Samuel D'Souza", "Goa", "Anna Smith", "anna.s@example.com", "2026-03-05", "2026-03-05", 2, 1100, false, "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&q=80"));
        bookingRepository.save(new Booking("BK-2026-006", "HOMESTAY", "CONFIRMED", "Tea Garden Bungalow", "Darjeeling, West Bengal", "Priya Kumar", "priya.k@example.com", "2026-05-01", "2026-05-04", 2, 6300, true, "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=200&q=80"));
    }

    private void loadReviews() {
        reviewRepository.save(new Review("Sarah Johnson", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", 5, "2026-02-15", "Cozy Mountain Retreat", "Absolutely stunning retreat! The mountain views were breathtaking and the host was incredibly welcoming. Will definitely return.", "approved"));
        reviewRepository.save(new Review("Rahul Mehta", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", 4, "2026-02-10", "Luxury Beach Villa", "Beautiful villa with excellent amenities. The pool and beach access were highlights. Slightly pricey but worth it.", "approved"));
        reviewRepository.save(new Review("Emily Chen", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", 5, "2026-02-08", "Heritage Tour - Ravi Kumar", "Ravi is an exceptional guide! His knowledge of history and culture is outstanding. Made our Agra trip truly memorable.", "approved"));
        reviewRepository.save(new Review("James Wilson", "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", 4, "2026-01-25", "Urban Heritage Home", "Loved the heritage architecture and the central location. The breakfast was delicious. A truly authentic experience.", "approved"));
        reviewRepository.save(new Review("Anna Smith", "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80", 3, "2026-01-20", "Desert Safari Camp", "Good experience overall but the tent facilities could be improved. The camel safari and bonfire were amazing though.", "pending"));
        reviewRepository.save(new Review("Michael Brown", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", 5, "2026-01-15", "Kerala Backwater Home", "The most unique experience of my life! Floating through the backwaters at sunset was magical.", "approved"));
        reviewRepository.save(new Review("Priya Kumar", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", 2, "2026-01-10", "Tea Garden Bungalow", "The location was beautiful but the service was disappointing. The facilities need upgrading.", "flagged"));
    }
}