# Smart Travel API

A RESTful API for the Smart Travel web application, built with Node.js, Express, and MongoDB. This API manages flights, hotels, vehicles, users, and bookings, and supports image uploads.

## Features

- User registration and login (with password hashing)
- CRUD operations for Flights, Hotels, Vehicles, and Bookings
- Search across flights, hotels, and vehicles
- Image upload support for hotels, flights, and vehicles
- CORS support for local development
- MongoDB integration via Mongoose

## Project Structure

```
.
├── controllers/         # Route handlers for each resource
├── models/              # Mongoose models
├── routes/              # Express route definitions
├── public/uploads/      # Uploaded images
├── index.js             # Entry point
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd smart-travel-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up your MongoDB connection string in `index.js` if needed.

### Running the Server

- For development (with auto-reload):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm run serve
  ```

The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

## IMPORTANT!!
Make sure to have public/uploads folder created manually if does not exists. It is the folder where uploaded images are stored.

### Flights

- `GET    /api/flights`           — List all flights
- `GET    /api/flights/:id`       — Get a single flight
- `POST   /api/flights`           — Create a flight
- `PUT    /api/flights/:id`       — Update a flight
- `DELETE /api/flights/:id`       — Delete a flight

### Hotels

- `GET    /api/hotels`            — List all hotels
- `GET    /api/hotels/:id`        — Get a single hotel
- `POST   /api/hotels`            — Create a hotel (supports image upload)
- `PUT    /api/hotels/:id`        — Update a hotel (supports image upload)
- `DELETE /api/hotels/:id`        — Delete a hotel

### Vehicles

- `GET    /api/vehicles`          — List all vehicles
- `GET    /api/vehicles/:id`      — Get a single vehicle
- `POST   /api/vehicles`          — Create a vehicle
- `PUT    /api/vehicles/:id`      — Update a vehicle
- `DELETE /api/vehicles/:id`      — Delete a vehicle

### Users

- `GET    /api/user`              — List all users
- `POST   /api/user`              — Register a new user
- `POST   /api/user/login`        — Login
- `PUT    /api/user/:id`          — Update user
- `DELETE /api/user/:id`          — Delete user

### Bookings

- `GET    /api/bookings`          — List all bookings
- `GET    /api/bookings/user?userId=...` — List bookings for a user
- `POST   /api/bookings`          — Create a booking
- `DELETE /api/bookings/:id`      — Delete a booking

### Search

- `POST   /api/search`            — Search flights, hotels, and vehicles

### Image Upload

- `POST   /api/upload`            — Upload a single image (field: `image`)
- `POST   /api/uploads`           — Upload multiple images (field: `images`)

Uploaded images are served from `/uploads`.

## Notes