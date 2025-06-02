import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.createOfferedCourse(req.body);

  sendResponse(res, { message: 'Offered course created successfully', result });
});

const getAllOfferedCourse = catchAsync(async () => {});
const getSingleOfferedCourse = catchAsync(async () => {});
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.updateOfferedCourse(id, req.body);

  sendResponse(res, {
    message: 'Offered course is updated successfully',
    result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
};
