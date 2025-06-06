import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await authService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  // set refresh token to cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    message: 'User logged in successfully',
    result: { accessToken, needsPasswordChange },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword(req.user, req.body);

  sendResponse(res, {
    message: 'password is changed successfully',
    result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  sendResponse(res, {
    message: 'refresh token is retrieved successfully',
    result,
  });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await authService.forgotPassword(id);

  sendResponse(res, {
    message: 'Check your email to reset password! ',
    result,
  });
});

export const authController = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
};
