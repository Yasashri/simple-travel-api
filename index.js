import express from "express";
import mongoose from "mongoose";
import { Hotel, Flight, Vehicle } from "./models/index.js";
import flightRoute from "./routes/flight.route.js";
import hotelRoutes from "./routes/hotel.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import userRoutes from "./routes/user.route.js";
import bookingRoutes from "./routes/booking.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/flights", flightRoute);
app.use("/api/hotels", hotelRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/api/", async (req, res) => {
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
