# HomestayHub Backend

This is the Spring Boot backend for the HomestayHub fullstack application.

## Prerequisites

- Java 17 or higher
- Maven
- MySQL Server

## Setup

1. Install MySQL and create a database named `homestayhub`.
2. The backend defaults to:
   - URL: `jdbc:mysql://localhost:3306/homestayhub`
   - Username: `root`
   - Password: `root`
3. Override them with `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` if your MySQL setup is different.
4. Run `mvn spring-boot:run` to start the server.

## API Endpoints

- GET /api/users - Get all users
- POST /api/users - Create a new user

The server runs on port 8080.
