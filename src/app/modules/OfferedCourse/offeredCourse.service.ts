import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { SemesterRegistrationModel } from '../SemesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { FacultyModel } from '../faculty/faculty.model';
import { CourseModel } from '../Course/course.model';
import { DepartmentModel } from '../department/department.model';

const createOfferedCourse = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    department,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // check is semesterRegistration exits
  const isSemesterRegistrationExits =
    await SemesterRegistrationModel.findById(semesterRegistration);

  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Semester Registration is not found',
    );
  }

  // add semester ObjectId from semester registration
  payload.semester = isSemesterRegistrationExits?.semester;

  // check is academicFaculty exits
  const isAcademicFacultyExits =
    await AcademicFacultyModel.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty is not found');
  }

  // check is department exits
  const isDepartmentExits = await DepartmentModel.findById(department);
  if (!isDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Department is not found');
  }

  // check is course exits
  const isCourseExits = await CourseModel.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course is not found');
  }

  // check is course exits
  const isFacultyExits = await FacultyModel.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty is not found');
  }

  // check is department belongs to academicFaculty
  const isDepartmentMatched = await DepartmentModel.findOne({
    _id: department,
    academicFaculty,
  });

  if (!isDepartmentMatched) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isDepartmentExits.name} is not belongs to the ${isAcademicFacultyExits.name}`,
    );
  }

  // check is section already exists with same Semester Registration
  const isSectionAlreadyExists = await OfferedCourseModel.find({
    semesterRegistration,
    course,
    section,
  });

  if (isSectionAlreadyExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Offered course with same section already exists',
    );
  }

  const result = await OfferedCourseModel.create(payload);
  return result;
};

const getAllOfferedCourse = async () => {};
const getSingleOfferedCourse = async () => {};
const updateOfferedCourse = async () => {};

export const offeredCourseService = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
