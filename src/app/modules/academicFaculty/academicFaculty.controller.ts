import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFaculty(req.body);

  sendResponse(res, {
    message: 'Academic Faculty is created successfully',
    result,
  });
});

const getAcademicFaculties = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAcademicFaculties(req?.query);

  sendResponse(res, {
    message: 'Academic Faculty got successfully',
    meta: result?.meta,
    result: result?.result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyService.getSingleAcademicFaculty(id);

  sendResponse(res, {
    message: 'Academic Faculty got successfully',
    result,
  });
});

const deleteAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicFacultyService.deleteAcademicFaculty(id);

  sendResponse(res, {
    message: 'Academic Faculty  deleted successfully',
    result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
  deleteAcademicFaculty,
};
