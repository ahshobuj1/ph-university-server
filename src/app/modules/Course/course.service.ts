/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import mongoose from 'mongoose';

const createCourse = async (payload: Partial<TCourse>) => {
  const result = await CourseModel.create(payload);
  return result;
};

const getAllCourse = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourse = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const session = await mongoose.startSession();
  const { preRequisiteCourses, ...remainingCourseData } = payload;

  try {
    session.startTransaction();

    const basicCourseUpdateInfo = await CourseModel.findByIdAndUpdate(
      id,
      remainingCourseData,
      {
        new: true,
        session,
      },
    );

    if (!basicCourseUpdateInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const PreRequisiteToDelete = preRequisiteCourses
        .filter((item) => item.course && item.isDeleted)
        .map((item) => item.course);

      // Delete course to array
      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: PreRequisiteToDelete } },
          },
        },
        { new: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      // Add new course to array
      const preRequisiteToAdd = preRequisiteCourses.filter(
        (item) => item.course && !item.isDeleted,
      );

      const addedNewPreRequisite = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: preRequisiteToAdd },
          },
        },
        { new: true, session },
      );

      if (!addedNewPreRequisite) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id);
    return result;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const deleteCourse = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

const updateFacultiesWithCourse = async (
  id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    { upsert: true, new: true },
  );

  return result;
};

export const courseService = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  updateFacultiesWithCourse,
};
