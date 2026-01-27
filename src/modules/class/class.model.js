import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    availableSite: {
      type: Number,
      required: true,
      default: 0,
    },
    enroll: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
    categoryName: {
      type: String,
      required: true,
    },
    instructorName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    feedback: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Class", classSchema);
