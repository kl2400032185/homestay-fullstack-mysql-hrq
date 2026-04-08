# HomestayHub 🏠

A full-featured homestay and tourism platform built with React (frontend) and Spring Boot (backend).

## 🚀 Getting Started

### Prerequisites
- Node.js (for frontend)
- Java 17+ and Maven (for backend)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build and run:
   ```bash
   mvn clean package
   java -jar target/homestayhub-backend-0.0.1-SNAPSHOT.jar
   ```
   - Backend runs on `http://localhost:8080`
   - Uses MySQL by default at `jdbc:mysql://localhost:3306/homestayhub`

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd mfinsight
   ```
2. Install and run:
   ```bash
   npm install
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`

## 📁 File Structure
```
backend/                 # Spring Boot backend
  src/main/java/         # Java source code
  src/main/resources/    # Application properties
  pom.xml                # Maven dependencies
mfinsight/               # React frontend
  src/
    App.jsx              # Main app with page routing
    main.jsx             # React entry point
    data/
      mockData.js        # Mock data
    components/
      Sidebar.jsx        # Navigation sidebar
    pages/
      HomePage.jsx       # Landing page
      HomestaysPage.jsx  # Browse homestays
      AttractionsPage.jsx# Tourist attractions
      GuidesPage.jsx     # Local guides
      AdminPage.jsx      # Admin dashboard
      HostPage.jsx       # Host dashboard
      TouristPage.jsx    # Tourist dashboard
      GuidePage.jsx      # Guide dashboard
      AnalyticsPage.jsx  # Analytics
      BookingsPage.jsx   # Bookings
      ReviewsPage.jsx    # Reviews
```

## 🚀 Deployment

### Railway (Recommended)
1. Push code to GitHub.
2. Connect repo to [Railway](https://railway.app).
3. Deploy backend and set `DATABASE_URL`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` for your MySQL instance.
4. Deploy frontend from `mfinsight/` (build: `npm run build`, start: `npx serve dist -p $PORT`).

### Local Production
- Backend: `mvn clean package && java -jar target/*.jar`
- Frontend: `npm run build && npx serve dist`

## 🏠 HomestayHub
"# homestay-fullstack-mysql-hrq" 
