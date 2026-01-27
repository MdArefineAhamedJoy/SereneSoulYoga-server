import mongoose from "mongoose";

const selectedClassSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    name: {
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
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("SelectedClass", selectedClassSchema);
