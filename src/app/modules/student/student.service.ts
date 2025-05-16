import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';

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
  const session = await mongoose.startSession(); // start session

  try {
    session.startTransaction(); // step -> 1

    const deletedStudent = await StudentModel.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Failed to delete student');
    }

    const deletedUser = await UserModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, ' Failed to delete user');
    }

    await session.commitTransaction(); // step -> 2
    await session.endSession(); // close session

    return deletedStudent;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction(); // step -> 3
    await session.endSession(); // close session
    throw new Error(err);
  }
};

export const studentService = {
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
