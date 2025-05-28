import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.createSemesterRegistration(
    req.body,
  );

  sendResponse(res, { message: 'Semester registered successfully', result });
});

const getAllSemesterRegistration = catchAsync(async () => {});
const getSingleSemesterRegistration = catchAsync(async () => {});
const updateSemesterRegistration = catchAsync(async () => {});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
