import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyService.getAllFaculty(req?.query);

  sendResponse(res, {
    message: 'Faculty is retrieved successfully',
    result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyService.getSingleFaculty(id);

  sendResponse(res, {
    message: 'Faculty is retrieved successfully',
    result,
  });
});

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { faculty } = req.body;

  const result = await facultyService.updateFaculty(id, faculty);

  sendResponse(res, {
    message: 'Faculty is updated successfully',
    result,
  });
});

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await facultyService.deleteFaculty(id);

  sendResponse(res, {
    message: 'Faculty is deleted successfully',
    result,
  });
});

export const facultyController = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
