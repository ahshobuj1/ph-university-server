import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourse(req.body);

  sendResponse(res, { message: 'Course is created successfully', result });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourse(req?.query);

  sendResponse(res, { message: 'Course is retrieved successfully', result });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourse(id);

  sendResponse(res, { message: 'Course is retrieved successfully', result });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedCourseData = req.body;
  const result = await courseService.updateCourse(id, updatedCourseData);

  sendResponse(res, { message: 'Course is updated successfully', result });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourse(id);

  sendResponse(res, { message: 'Course is deleted successfully', result });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
