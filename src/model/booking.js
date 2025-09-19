// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     customerName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     date: { type: Date, required: true },

//     // Item info
//     itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
//     itemType: { type: String, enum: ["rides", "resorts", "packages"], required: true },

//     // Counts
//     adults: { type: Number, default: 0 },
//     teenagers: { type: Number, default: 0 },
//     kids: { type: Number, default: 0 },
//     totalPeople: { type: Number, required: true },
//     totalAmount: { type: Number, required: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  date: Date,
  adults: Number,
  teenagers: Number,
  kids: Number,
  totalPeople: Number,
  totalAmount: Number,
  itemId: String,
  itemType: String,
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
