import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resort: { type: String, required: true },
  ride: { type: String, required: true },
  package: { type: String, required: true },
  child: { type: Number, default: 0 },
  teenage: { type: Number, default: 0 },
  adult: { type: Number, default: 0 },
  totalChild: { type: Number, default: 0 },
  totalTeenage: { type: Number, default: 0 },
  totalAdult: { type: Number, default: 0 },
  date: { type: String, required: true },
  totalPeople: { type: Number, default: 0 },
  totalAmount: { type: Number, default: 0 },
  status: { type: String, enum: ["Pending", "Accepted"], default: "Pending" }, // 👈 status field

}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
