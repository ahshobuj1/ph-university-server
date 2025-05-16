import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../config';
import { SemesterModel } from '../semester/semester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { createStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';

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
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction(); // step -> 2
    await session.endSession(); // end session

    return newStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction(); // step -> 3
    await session.endSession(); // end session
    throw new Error(err);
  }
};

export const userService = {
  createStudent,
};

// check user exist in the db
// if (await StudentModel.isUserExists(student.email)) {
//   throw new Error('User already exists');
// }
