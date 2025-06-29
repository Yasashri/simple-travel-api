import express from "express";
import mongoose from "mongoose";
import { Hotel, Flight, Vehicle } from "./models/index.js";
import flightRoute from "./routes/flight.route.js";
import hotelRoutes from "./routes/hotel.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";
import cors from "cors";
import Fuse from "fuse.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/flights", flightRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookings", bookingRoutes);

// Home page route is here

app.get("/api/home", async (req, res) => {
  try {
    const [flights, hotels, vehicles] = await Promise.all([
      Flight.find().sort({ createdAt: -1 }).limit(10),
      Hotel.find().sort({ createdAt: -1 }).limit(10),
      Vehicle.find().sort({ createdAt: -1 }).limit(10),
    ]);

    res.status(200).json({
      flights,
      hotels,
      vehicles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/search", async (req, res) => {
  const query = req.body.search;

  if (!query) return res.status(400).json({ message: "Search query required" });

  try {
    const [flights, hotels, vehicles] = await Promise.all([
      Flight.find({}),
      Hotel.find({}),
      Vehicle.find({}),
    ]);

    // Configure fuzzy options
    const flightFuse = new Fuse(flights, {
      keys: ["flightNo", "flightStart", "flightEnd"],
      threshold: 0.1, // lower = stricter
    });

    const hotelFuse = new Fuse(hotels, {
      keys: ["hotelName", "hotelLocation"],
      threshold: 0.4,
    });

    const vehicleFuse = new Fuse(vehicles, {
      keys: ["vehicleName", "vehicleType", "vehicleModel"],
      threshold: 0.4,
    });

    res.json({
      query,
      flights: flightFuse.search(query).map(r => r.item),
      hotels: hotelFuse.search(query).map(r => r.item),
      vehicles: vehicleFuse.search(query).map(r => r.item),
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


mongoose
  .connect(
    "mongodb+srv://user:qBzbhr2aQqAxbZK1@travelc.pgydfz2.mongodb.net/travelc?retryWrites=true&w=majority&appName=travelc"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
