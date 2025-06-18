import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { semesterRegistrationService } from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.createSemesterRegistration(
    req.body,
  );

  sendResponse(res, { message: 'Semester registered successfully', result });
});

const getAllSemesterRegistration = catchAsync(async (req, res) => {
  const result = await semesterRegistrationService.getAllSemesterRegistration(
    req.query,
  );

  sendResponse(res, {
    message: 'Semester registered retrieved successfully',
    meta: result?.meta,
    result: result?.result,
  });
});

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.getSingleSemesterRegistration(id);

  sendResponse(res, {
    message: 'Semester registered retrieved successfully',
    result,
  });
});

const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await semesterRegistrationService.updateSemesterRegistration(
    id,
    req.body,
  );

  sendResponse(res, {
    message: 'Semester registration is updated successfully',
    result,
  });
});

const deleteSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await semesterRegistrationService.deleteSemesterRegistration(id);

  sendResponse(res, {
    message: 'Semester registered is deleted successfully',
    result,
  });
});

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
};
