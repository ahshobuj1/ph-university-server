import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudent = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudents = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id });
  return result;
};

export const studentService = {
  createStudent,
  getAllStudents,
  getStudentById,
};
