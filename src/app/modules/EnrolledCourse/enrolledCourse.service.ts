/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { OfferedCourseModel } from '../OfferedCourse/offeredCourse.model';
import { AppError } from '../../errors/AppError';
import { StudentModel } from '../student/student.model';
import { EnrolledCurseModel } from './enrolledCourse.model';
import mongoose from 'mongoose';
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model';
import { CourseModel } from '../Course/course.model';
import { FacultyModel } from '../faculty/faculty.model';
import { calculateGradeAndGPA } from './enrolledCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';

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

  const studentAlreadyExistsOfferedCourse = await EnrolledCurseModel.findOne({
    offeredCourse: payload?.offeredCourse,
    semesterRegistration: isOfferedCourseExits?.semesterRegistration,
    student: student?._id,
  });

  if (studentAlreadyExistsOfferedCourse) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Student already enrolled the course!',
    );
  }

  //* step3
  // find find  enrolled course
  // find existing course credit
  // find current course credit
  // find maxCredit from semesterRegistration

  const course = await CourseModel.findById(isOfferedCourseExits.course).select(
    'credits',
  );

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, 'course not found!');
  }

  const semesterRegistration = await SemesterRegistrationModel.findById(
    isOfferedCourseExits.semesterRegistration,
  );

  if (!semesterRegistration) {
    throw new AppError(httpStatus.NOT_FOUND, 'semesterRegistration not found!');
  }

  const enrolledCourse = await EnrolledCurseModel.aggregate([
    {
      $match: {
        student: student._id,
        semesterRegistration: isOfferedCourseExits.semesterRegistration,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'courseData',
      },
    },
    {
      $unwind: '$courseData',
    },
    {
      $group: {
        _id: null,
        existingCredit: { $sum: '$courseData.credits' },
      },
    },
    {
      $project: {
        _id: 0,
        existingCredit: 1,
      },
    },
  ]);

  const maxCredit = semesterRegistration.maxCredit;
  const existingCourseCredit = enrolledCourse[0]?.existingCredit;
  const currentCourseCredit = course.credits;
  const totalCourseCredit = existingCourseCredit + currentCourseCredit;

  if (totalCourseCredit && maxCredit && totalCourseCredit > maxCredit) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't enroll. Your total credit (${totalCourseCredit}) exceeds the max allowed (${maxCredit}).`,
    );
  }

  // //* step4
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

const getAllEnrolledCourse = async (query: Record<string, unknown>) => {
  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCurseModel.find().populate(
      'semesterRegistration semester academicFaculty department offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();
  return { meta, result };
};

const getMyEnrolledCourse = async (
  token: JwtPayload,
  query: Record<string, unknown>,
) => {
  const studentId = token.id;

  const student = await StudentModel.findOne({ id: studentId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCurseModel.find({
      student: student._id,
    }).populate(
      'semesterRegistration semester academicFaculty department offeredCourse course student faculty',
    ),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await enrolledCourseQuery.modelQuery;
  const meta = await enrolledCourseQuery.countTotal();
  return { meta, result };
};

const updateEnrolledCourseMarks = async (
  token: JwtPayload,
  payload: Partial<TEnrolledCourse>,
) => {
  const { semesterRegistration, offeredCourse, student, courseMarks } = payload;

  const enrolledCourse = await EnrolledCurseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
  });

  if (!enrolledCourse) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enrolled course not found');
  }

  const faculty = await FacultyModel.findOne({ id: token.id }).select('_id');
  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'faculty not found');
  }

  const isCourseBelongToFaculty = await EnrolledCurseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: faculty._id,
  });

  if (!isCourseBelongToFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You are not able to update enrolled course marks',
    );
  }

  //* now update the course marks

  const modifiedCourseMarksData: Record<string, unknown> = { ...courseMarks };

  if (courseMarks?.finalTerm) {
    const { classTest1, midTerm, classTest2, finalTerm } = courseMarks;

    const totalMarks = classTest1 + midTerm + classTest2 + finalTerm;
    const { grade, gradePoints } = calculateGradeAndGPA(totalMarks);

    modifiedCourseMarksData.grade = grade;
    modifiedCourseMarksData.gradePoints = gradePoints;
    modifiedCourseMarksData.isCompleted = true;
    modifiedCourseMarksData.updatedAt = Date.now();
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedCourseMarksData[`courseMarks.${key}`] = value;
    }
  }

  const result = await EnrolledCurseModel.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedCourseMarksData,
    {
      new: true,
    },
  );

  return result;
};

export const enrolledCourseService = {
  createEnrolledCourse,
  updateEnrolledCourseMarks,
  getAllEnrolledCourse,
  getMyEnrolledCourse,
};
