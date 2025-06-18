import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.createOfferedCourse(req.body);

  sendResponse(res, { message: 'Offered course created successfully', result });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.getAllOfferedCourse(req?.query);

  sendResponse(res, {
    message: 'Offered course is retrieved successfully',
    meta: result?.meta,
    result: result?.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.getSingleOfferedCourse(id);

  sendResponse(res, {
    message: 'Offered course is retrieved successfully',
    result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.updateOfferedCourse(id, req.body);

  sendResponse(res, {
    message: 'Offered course is updated successfully',
    result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.deleteOfferedCourse(id);

  sendResponse(res, {
    message: 'Offered course is deleted successfully',
    result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
};
