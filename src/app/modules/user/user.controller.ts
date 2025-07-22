import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  // const file = req.file;

  const { password, student } = req.body;
  const result = await userService.createStudent(password, student);

  sendResponse(res, {
    message: 'Student is created successfully',
    result: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  // const file = req.file;
  const { password, faculty } = req.body;
  const result = await userService.createFaculty(password, faculty);

  sendResponse(res, {
    message: 'Faculty is created successfully',
    result: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  // const file = req.file;

  const { password, admin } = req.body;
  const result = await userService.createAdmin(password, admin);

  sendResponse(res, {
    message: 'Admin is created successfully',
    result: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUser(req?.query);

  sendResponse(res, {
    message: 'All users retrieved successfully',
    meta: result?.meta,
    result: result?.result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const token = req.user;
  const result = await userService.getMe(token);

  sendResponse(res, {
    message: 'User is retrieved successfully',
    result: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.changeUserStatus(id, req.body);

  sendResponse(res, {
    message: 'Changed user status successfully!',
    result: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeUserStatus,
  getAllUser,
};
