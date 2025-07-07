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
import multer from "multer";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); */

//Accepting all requests from frontend (Dev only)

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow undefined origins (like Postman) and all localhost ports
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

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

    
    const flightFuse = new Fuse(flights, {
      keys: ["flightNo", "flightStart", "flightEnd"],
      threshold: 0.1,
    });

    const hotelFuse = new Fuse(hotels, {
      keys: ["hotelName", "hotelLocation", "hotelCountry"],
      threshold: 0.4,
    });

    const vehicleFuse = new Fuse(vehicles, {
      keys: ["vehicleName", "vehicleType", "vehicleModel", "vehicleCountry"],
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

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

app.post("/api/uploads", upload.array("images", 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const imageUrls = req.files.map((file) => {
    return `http://localhost:3000/uploads/${file.filename}`;
  });

  res.json({ imageUrls });
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
