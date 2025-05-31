import { TOfferedCourse } from './offeredCourse.interface';

const createOfferedCourse = async (payload: TOfferedCourse) => {
  console.log(payload);
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
