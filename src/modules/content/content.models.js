import mongoose from "mongoose";

export const Banner = mongoose.model(
  "Banner",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      isActive: { type: Boolean, default: true },
    },
    { timestamps: true },
  ),
);

export const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      image: { type: String, required: true },
      author: { type: String, required: true },
      category: { type: String, required: true },
      tags: { type: [String], default: [] },
    },
    { timestamps: true },
  ),
);

export const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema(
    {
      userName: { type: String, required: true },
      userEmail: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, required: true },
    },
    { timestamps: true },
  ),
);

export const Health = mongoose.model(
  "Health",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
      benefits: { type: [String], default: [] },
    },
    { timestamps: true },
  ),
);

export const Membership = mongoose.model(
  "Membership",
  new mongoose.Schema(
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      duration: { type: String, required: true },
      features: { type: [String], default: [] },
    },
    { timestamps: true },
  ),
);

export const TopYoga = mongoose.model(
  "TopYoga",
  new mongoose.Schema(
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true },
    },
    { timestamps: true },
  ),
);
