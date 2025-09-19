// models/Ride.js
import mongoose from "mongoose";

const RideSchema = new mongoose.Schema(
  {
    rideName: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    information: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      enum: ["Thriller", "Kiddi", "High Thriller"],
      required: true,
    },
    ageLimit: {
      type: String,
      enum: ["5-10", "10-18", "18-50", "5-18", "5-50", "10-50"],
      required: true,
    },
        image: { type: String, required: true }, // store image URL or path

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "rides" } // ensures it saves in "rides" collection
);

// Prevent model overwrite in dev
const Ride = mongoose.models.Ride || mongoose.model("Ride", RideSchema);

export default Ride;
