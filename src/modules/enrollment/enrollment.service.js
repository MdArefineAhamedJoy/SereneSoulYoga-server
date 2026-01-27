import SelectedClass from "../class/selectedClass.model.js";
import EnrolledClass from "./enrollment.model.js";

export const getSelectedClassById = async (id) => {
  return await SelectedClass.findById(id);
};

export const enrollClass = async (enrollData, selectedClassId) => {
  if (selectedClassId) {
    await SelectedClass.findByIdAndDelete(selectedClassId);
  }
  return await EnrolledClass.create(enrollData);
};

export const getEnrolledClasses = async (email) => {
  return await EnrolledClass.find({ paymentUser: email }).sort({
    createdAt: -1,
  });
};
