import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterService } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
  const semester = req.body;
  const result = await semesterService.createSemester(semester);

  sendResponse(res, { message: 'Semester created successfully!', result });
});

export const semesterController = {
  createSemester,
};
