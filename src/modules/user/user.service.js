import User from "./user.model.js";

export const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User Already Exist");
  }
  return await User.create(userData);
};

export const getAllUsers = async () => {
  return await User.find();
};

export const updateUserRole = async (id, role) => {
  return await User.findByIdAndUpdate(id, { role }, { new: true });
};
