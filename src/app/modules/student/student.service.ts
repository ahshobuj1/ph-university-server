import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { StudentModel } from './student.model';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TStudent } from './student.interface';

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
  const result = await StudentModel.findOne({ id: id })
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

const updateStudent = async (id: string, payload: Partial<TStudent>) => {
  const { name, permanentAddress, localAddress, ...primitiveStudentData } =
    payload;

  const modifiedUpdatedStudentData: Record<string, unknown> = {
    ...primitiveStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedStudentData[`name.${key}`] = value;
    }
  }

  if (localAddress && Object.keys(localAddress).length) {
    for (const [key, value] of Object.entries(localAddress)) {
      modifiedUpdatedStudentData[`localAddress.${key}`] = value;
    }
  }

  if (permanentAddress && Object.keys(permanentAddress).length) {
    for (const [key, value] of Object.entries(permanentAddress)) {
      modifiedUpdatedStudentData[`permanentAddress.${key}`] = value;
    }
  }

  const result = await StudentModel.findOneAndUpdate(
    { id },
    modifiedUpdatedStudentData,
  );
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
  updateStudent,
};
