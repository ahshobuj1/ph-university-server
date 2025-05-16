import { StudentModel } from './student.model';

const getAllStudents = async () => {
  const result = await StudentModel.find()
    .populate('user')
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getStudentById = async (id: string) => {
  const result = await StudentModel.findOne({ _id: id })
    .populate('user')
    .populate('semester')
    .populate({
      path: 'department',
      populate: {
        path: 'academicFaculty',
      },
    });
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
