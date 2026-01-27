import {
  Banner,
  Blog,
  Feedback,
  Health,
  Membership,
  TopYoga,
} from "./content.models.js";

export const getBanners = async () => {
  return await Banner.find();
};

export const getTopYoga = async () => {
  return await TopYoga.find();
};

export const getMemberships = async () => {
  return await Membership.find();
};

export const getHealth = async () => {
  return await Health.find();
};

export const getBlogs = async () => {
  return await Blog.find();
};

export const getFeedback = async () => {
  return await Feedback.find();
};
