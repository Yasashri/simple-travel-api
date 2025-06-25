import express, { json, urlencoded } from "express";
import mongoose from "mongoose";
import { Flight, Hotel, Vehicle } from "./models/index.js";
import flightRoute from "./routes/flight.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/flights", flightRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});



app.post("/api/hotels", async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/vehicles", async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/vehicles", async (req, res) => {
  try {
    const vehicle = await Vehicle.find({});
    res.status(200).json(vehicle);
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
