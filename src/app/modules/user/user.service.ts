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
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { DepartmentModel } from '../department/department.model';

const createStudent = async (
  file: any,
  password: string,
  student: TStudent,
) => {
  // complete the operations using Transaction and Rollback

  const isDepartmentExists = await DepartmentModel.findById(student.department);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department not found');
  }

  const getSemester = await SemesterModel.findById(student.semester);

  const session = await mongoose.startSession(); //start session
  try {
    session.startTransaction(); // step -> 1
    // student id
    const generatedStudentId = await createStudentId(getSemester!);

    // upload image to cloudinary
    if (file) {
      const imageName = `${student?.name?.firstName}-${generatedStudentId}`;
      const { secure_url } = await uploadImageToCloudinary(
        file.path,
        imageName,
      );

      student.profileImage = secure_url;
    }

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
    student.academicFaculty = isDepartmentExists?.academicFaculty;

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

const createFaculty = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // check email already exists
  const isEmailExist = await FacultyModel.findOne({ email: payload.email });

  if (isEmailExist) {
    throw new AppError(httpStatus.CONFLICT, 'Email already exists');
  }

  const isDepartmentExists = await DepartmentModel.findById(payload.department);

  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department not found');
  }

  const session = await mongoose.startSession(); // session-> step 1

  try {
    session.startTransaction(); // session-> step 2

    const generatedFacultyID = await createFacultyId();

    // upload image to cloudinary
    if (file) {
      const imageName = `${payload?.name?.firstName}-${generatedFacultyID}`;
      const { secure_url } = await uploadImageToCloudinary(
        file.path,
        imageName,
      );

      payload.profileImage = secure_url;
    }

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
    payload.academicFaculty = isDepartmentExists?.academicFaculty;

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

const createAdmin = async (file: any, password: string, payload: TAdmin) => {
  // check email already exists
  const isEmailExist = await AdminModel.findOne({ email: payload.email });

  if (isEmailExist) {
    throw new AppError(httpStatus.CONFLICT, 'Email already exists');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const generatedAdminId = await createAdminId();

    // upload image to cloudinary
    if (file) {
      const imageName = `${payload?.name?.firstName}-${generatedAdminId}`;
      const { secure_url } = await uploadImageToCloudinary(
        file.path,
        imageName,
      );

      payload.profileImage = secure_url;
    }

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
    return await StudentModel.findOne({ id });
  }
  if (role === UserRole.faculty) {
    return await FacultyModel.findOne({ id });
  }
  if (role === UserRole.admin) {
    return await AdminModel.findOne({ id });
  }
};

const changeUserStatus = async (id: string, payload: { status: string }) => {
  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const userService = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeUserStatus,
};
