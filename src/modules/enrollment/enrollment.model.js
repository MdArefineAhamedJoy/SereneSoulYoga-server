import mongoose from "mongoose";

const enrolledClassSchema = new mongoose.Schema(
  {
    paymentUser: {
      type: String,
      required: true,
    },
    classId: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
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

export default mongoose.model("EnrolledClass", enrolledClassSchema);
