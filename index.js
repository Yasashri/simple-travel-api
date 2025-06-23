import express, { json } from "express";
import mongoose from "mongoose";
import Flight from "./models/flight.model.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

app.post("/api/flights", async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/flights", async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.status(200).json(flights);
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
