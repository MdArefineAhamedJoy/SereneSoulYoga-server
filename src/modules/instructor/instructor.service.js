import Class from "../class/class.model.js";
import User from "../user/user.model.js";

export const createInstructorClass = async (classData) => {
  return await Class.create(classData);
};

export const getInstructorClasses = async (email) => {
  return await Class.find({ email });
};

export const getPopularInstructors = async () => {
  const findClass = await Class.find().sort({ enroll: -1 });
  const filter = findClass.map((instructor) => instructor.email);
  const result = await User.find({ email: { $in: filter } }).limit(6);
  return result;
};
