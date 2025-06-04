import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);

  sendResponse(res, {
    message: 'User logged in successfully',
    result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);

  sendResponse(res, {
    message: 'password is changed successfully',
    result,
  });
});

export const authController = {
  loginUser,
  changePassword,
};
