import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { facultyService } from './faculty.service';

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyService.getAllFaculty();

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

export const facultyController = {
  getAllFaculty,
  getSingleFaculty,
};
