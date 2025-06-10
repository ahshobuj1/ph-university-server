/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { OfferedCourseModel } from '../OfferedCourse/offeredCourse.model';
import { AppError } from '../../errors/AppError';
import { StudentModel } from '../student/student.model';
import { EnrolledCurseModel } from './enrolledCourse.model';
import mongoose from 'mongoose';

const createEnrolledCourse = async (
  token: JwtPayload,
  payload: Partial<TEnrolledCourse>,
) => {
  /**
   * step1: check is offeredCourseExits
   * step2: check if student already enrolled this course
   * step3: check if the maxCredits exceeds limits
   * step4: finally create enrolled course
   * */

  const { id } = token;
  // const { offeredCourse } = payload;

  //* step-1
  const isOfferedCourseExits = await OfferedCourseModel.findById(
    payload.offeredCourse,
  );

  if (!isOfferedCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found!');
  }

  if (isOfferedCourseExits?.maxCapacity <= 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Sorry, this course is already full. Please choose another one!',
    );
  }

  //* step-2
  const student = await StudentModel.findOne({ id }, { _id: 1 });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found!');
  }

  const studentAlreadyExists = await EnrolledCurseModel.findOne({
    offeredCourse: payload?.offeredCourse,
    semesterRegistration: isOfferedCourseExits?.semesterRegistration,
    student: student?._id,
  });

  if (studentAlreadyExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student already enrolled the course!',
    );
  }

  //* step-4
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const enrolledCourseData = {
      semesterRegistration: isOfferedCourseExits.semesterRegistration,
      semester: isOfferedCourseExits.semester,
      academicFaculty: isOfferedCourseExits.academicFaculty,
      department: isOfferedCourseExits.department,
      offeredCourse: payload.offeredCourse,
      course: isOfferedCourseExits.course,
      student: student._id,
      faculty: isOfferedCourseExits.faculty,
      isEnrolled: true,
    };

    const result = await EnrolledCurseModel.create(enrolledCourseData);

    await OfferedCourseModel.findByIdAndUpdate(payload.offeredCourse, {
      maxCapacity: isOfferedCourseExits.maxCapacity - 1,
    });

    await session.commitTransaction();
    await session.endSession(); // end session

    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession(); // end session
    throw new Error(err);
  }
};

export const enrolledCourseService = {
  createEnrolledCourse,
};
