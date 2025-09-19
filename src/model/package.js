import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    adultPrice: {
      type: Number,
      required: true,
    },
    teenagerPrice: {
      type: Number,
      required: true,
    },
    kidsPrice: {
      type: Number,
      required: true,
    },
    information: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Package || mongoose.model("Package", packageSchema);
