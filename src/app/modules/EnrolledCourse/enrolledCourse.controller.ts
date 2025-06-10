import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { enrolledCourseService } from './enrolledCourse.service';

const createEnrolledCourse = catchAsync(async (req, res) => {
  const token = req.user;

  const result = await enrolledCourseService.createEnrolledCourse(
    token,
    req.body,
  );

  sendResponse(res, {
    message: 'Enrolled course successfully',
    result,
  });
});

export const enrolledCourseController = {
  createEnrolledCourse,
};
