import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    roomType: { type: String, required: true },
    information: { type: String, required: true },
    price: { type: Number, required: true },
    noOfRooms: { type: Number, required: true },
    image: { type: String, required: true }, // store image URL
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
