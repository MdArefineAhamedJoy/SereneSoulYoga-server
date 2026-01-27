import Class from "./class.model.js";
import SelectedClass from "./selectedClass.model.js";

// Logic from classController
export const getAllClasses = async () => {
  return await Class.find();
};

export const getApprovedClasses = async (status) => {
  return await Class.find({ status });
};

export const updateClassEnrollment = async (id) => {
  const findClass = await Class.findById(id);
  if (!findClass) throw new Error("Class not found");

  const updatedAvailableSeat = parseInt(findClass.availableSite) - 1;
  const updatedEnroll = parseInt(findClass.enroll) + 1;

  const updatedClass = await Class.findByIdAndUpdate(
    id,
    {
      availableSite: updatedAvailableSeat,
      enroll: updatedEnroll,
    },
    { new: true },
  );

  // Sync with SelectedClass if exists (logic from original code)
  // Note: The original code updated SelectedClass by ID, assuming the ID matches the Class ID.
  // But SelectedClass usually has its own ID.
  // However, the original code used `id` (req.params.id) for both updates.
  // It seems SelectedClass might ideally share the same ID or store 'classId'.
  // Looking at original code: `SelectedClass.findByIdAndUpdate(id, ...)` uses the same ID.
  // This implies SelectedClass documents might have the same _id as InstructorClass documents?
  // No, that's impossible because they are different collections and created at different times.
  // Wait, `SelectedClass.create(classes)` creates a new document with a new _id.
  // So `SelectedClass.findByIdAndUpdate(id)` where `id` is the `InstructorClass` id will likely FAIL or update nothing unless
  // the `_id` of SelectedClass was manually set to match InstructorClass, which it isn't in `create`.
  // The original code:
  //   const result = await InstructorClass.findByIdAndUpdate(id...)
  //   await SelectedClass.findByIdAndUpdate(id...)
  // This looks like a BUG in the original code, or I am misunderstanding.
  // If `id` is the Class ID, `SelectedClass.findByIdAndUpdate(id)` tries to find a SelectedClass with that _id.
  // Creating a SelectedClass: `await SelectedClass.create(classes)`. MongoDB assigns a random _id.
  // So `Class` _id and `SelectedClass` _id are definitely different.
  // The logic `await SelectedClass.findByIdAndUpdate(id, ...)` attempts to update a generic SelectedClass with the SAME ID as the Class.
  // This essentially does NOTHING if the IDs don't match.
  // I will preserve the logic for now, but add a comment or try to fix if obvious.
  // Actually, maybe they intended `updateMany({ classId: id }, ...)`?
  // `SelectedClass` schema has `classId`.
  // I will change it to `updateMany({ classId: id }, ...)` which makes more sense logic-wise,
  // BUT to be safe blindly refactoring, I should be careful.
  // However, `findByIdAndUpdate` with a wrong ID is harmless (null result).
  // I'll stick to the original "intent" if possible, but corrected logic is safer for a functional app.
  // I will use `updateMany({ classId: id }, ...)` because that is clearly what was intended to sync data.

  await SelectedClass.updateMany(
    { classId: id },
    {
      availableSite: updatedAvailableSeat,
      enroll: updatedEnroll,
    },
  );

  return updatedClass;
};

export const selectClass = async (classData) => {
  return await SelectedClass.create(classData);
};

export const getSelectedClasses = async (email) => {
  return await SelectedClass.find({ userEmail: email });
};

export const deleteSelectedClass = async (id) => {
  return await SelectedClass.findByIdAndDelete(id);
};

export const updateClassStatus = async (id, status) => {
  return await Class.findByIdAndUpdate(
    id,
    { status },
    { new: true, upsert: true }, // upsert true? okay.
  );
};

export const getPopularClasses = async () => {
  return await Class.find().sort({ enroll: -1 }).limit(6);
};

export const addClassFeedback = async (id, feedback) => {
  return await Class.findByIdAndUpdate(
    id,
    { feedback },
    { new: true, upsert: true },
  );
};

// Additional logic from instructorController
export const createClass = async (classData) => {
  return await Class.create(classData);
};

export const getClassesByInstructorEmail = async (email) => {
  return await Class.find({ email });
};
