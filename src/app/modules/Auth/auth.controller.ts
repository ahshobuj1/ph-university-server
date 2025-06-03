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

export const authController = {
  loginUser,
};
