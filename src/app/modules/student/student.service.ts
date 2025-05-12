import { StudentModel } from './student.model';

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id });
  return result;
};

const deleteSingleStudent = async (id: string) => {
  const result = await StudentModel.updateOne(
    { _id: id },
    { $set: { isDeleted: true } },
  );
  return result;
};

export const studentService = {
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
