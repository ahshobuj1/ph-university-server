import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterService } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
  const semester = req.body;
  const result = await semesterService.createSemester(semester);

  sendResponse(res, { message: 'Semester created successfully!', result });
});

const getSemesterById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await semesterService.getSemesterById(id);

  sendResponse(res, { message: 'Semester got successfully', result });
});

export const semesterController = {
  createSemester,
  getSemesterById,
};
