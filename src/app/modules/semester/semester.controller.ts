import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterService } from './semester.service';

const createSemester = catchAsync(async (req, res) => {
  const semester = req.body;
  const result = await semesterService.createSemester(semester);

  sendResponse(res, { message: 'Semester created successfully!', result });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await semesterService.getAllSemester();

  sendResponse(res, { message: 'Semester got successfully', result });
});

const getSemesterById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await semesterService.getSemesterById(id);

  sendResponse(res, { message: 'Semester got successfully', result });
});

const updateSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await semesterService.updateSemester(id, req.body);

  sendResponse(res, { message: 'Semester updated successfully', result });
});

export const semesterController = {
  createSemester,
  getAllSemester,
  getSemesterById,
  updateSemester,
};
