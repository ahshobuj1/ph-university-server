/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { SemesterModel } from '../semester/semester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { createAdminId, createFacultyId, createStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';
import { TFaculty } from '../faculty/faculty.interface';
import { FacultyModel } from '../faculty/faculty.model';
import { TAdmin } from '../Admin/admin.interface';
import { AdminModel } from '../Admin/admin.model';
import { JwtPayload } from 'jsonwebtoken';
import { UserRole } from './user.constant';

const createStudent = async (password: string, student: TStudent) => {
  // complete the operations using Transaction and Rollback

  const getSemester = await SemesterModel.findById(student.semester);

  const session = await mongoose.startSession(); //start session
  try {
    session.startTransaction(); // step -> 1
    // student id
    const generatedStudentId = await createStudentId(getSemester!);

    const userData: Partial<TUser> = {
      id: generatedStudentId,
      email: student.email,
      password: password || config.default_pass,
      role: 'student',
    };

    const createUser = await UserModel.create([userData], { session });

    //if (Object.keys(createUser).length)
    if (!createUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    student.id = createUser[0].id;
    student.user = createUser[0]._id;

    const newStudent = await StudentModel.create([student], { session });
    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction(); // step -> 2
    await session.endSession(); // end session

    return newStudent;
  } catch (err: any) {
    await session.abortTransaction(); // step -> 3
    await session.endSession(); // end session
    throw new Error(err);
  }
};

const createFaculty = async (password: string, payload: TFaculty) => {
  const session = await mongoose.startSession(); // session-> step 1

  try {
    session.startTransaction(); // session-> step 2

    const generatedFacultyID = await createFacultyId();

    const userData: Partial<TUser> = {
      id: generatedFacultyID,
      email: payload.email,
      password: password || config.default_pass,
      role: 'faculty',
    };

    const createUser = await UserModel.create([userData], { session });

    if (!createUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    payload.id = createUser[0].id;
    payload.user = createUser[0]._id;

    const createFaculty = await FacultyModel.create([payload], { session });

    await session.commitTransaction(); // session-> step 3
    await session.endSession();

    return createFaculty; // atLast return faculty
  } catch (err: any) {
    await session.abortTransaction(); // session-> step 4
    await session.endSession();
    throw new Error(err);
  }
};

const createAdmin = async (password: string, payload: TAdmin) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const generatedAdminId = await createAdminId();

    const userData: Partial<TUser> = {
      id: generatedAdminId,
      email: payload.email,
      password: password || config.default_pass,
      role: 'admin',
    };

    const createUser = await UserModel.create([userData], { session });

    if (!createUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.id = createUser[0].id;
    payload.user = createUser[0]._id;

    const createAdmin = await AdminModel.create([payload], { session });

    if (!createAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return createAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMe = async (token: JwtPayload) => {
  const { id, role } = token;

  if (role === UserRole.student) {
    return await UserModel.findOne({ id, role });
  }
  if (role === UserRole.faculty) {
    return await UserModel.findOne({ id, role });
  }
  if (role === UserRole.admin) {
    return await UserModel.findOne({ id, role });
  }
};

export const userService = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
};
