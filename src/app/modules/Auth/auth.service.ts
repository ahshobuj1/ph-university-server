import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { sendEmail } from '../../utils/sendEmail';

const loginUser = async (payload: TLoginUser) => {
  // 1-> check exists user
  // 2-> check status is blocked
  // 3-> check isDeleted
  // 4-> check password is correct
  // 5-> create jwt token and sent to client

  // check if user exists
  const user = await UserModel.findOne({ id: payload.id }).select('+password');

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found, Insert correct Id',
    );
  }

  //check if the user isDeleted
  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // check if the user status is blocked
  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // check password is correct -> compare to bcrypt hashing password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password!');
  }

  // create jwt token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    { expiresIn: '365d' },
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: TChangePassword,
) => {
  // console.log('auth service -> ', payload, userData);

  // check user exists and get user data
  const isExistsUser = await UserModel.findOne({
    id: userData.id,
    role: userData.role,
  }).select('+password');

  if (!isExistsUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check old password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.oldPassword,
    isExistsUser.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect old password!');
  }

  // hash new password
  const hashNewPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // now change password
  const changedPassword = await UserModel.findOneAndUpdate(
    {
      id: userData.id,
      role: userData.role,
    },
    {
      password: hashNewPassword,
      needsPasswordChange: false,
      passwordUpdatedAt: new Date(),
    },
    { new: true },
  );

  return changedPassword;
};

const refreshToken = async (token: string) => {
  // console.log(token);

  // verify token
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  // decoded user role and id
  const { id, iat } = decoded;

  // check is user exists
  const user = await UserModel.findOne({ id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check user status
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // check user isDeleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }

  // check if password changed after creating jwt token : Token is no longer valid due to password change

  if (user?.passwordUpdatedAt) {
    const passwordUpdatedAtInSeconds = Math.floor(
      new Date(user?.passwordUpdatedAt).getTime() / 1000,
    );

    if (passwordUpdatedAtInSeconds > (iat as number)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Token is no longer valid due to password change',
      );
    }
  }

  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return { accessToken };
};

const forgotPassword = async (id: string) => {
  console.log(id);

  // check is user exists
  const user = await UserModel.findOne({ id });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // check user status
  if (user?.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is blocked');
  }

  // check user isDeleted
  if (user?.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'The user is deleted');
  }

  // create jwt token
  const jwtPayload = {
    id: user?.id,
    role: user?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  const resetPasswordUiLink = `${config.reset_pass_ui_link}?id=${id}&token=${accessToken}`;

  await sendEmail(user?.email, resetPasswordUiLink, 'Reset your password!');

  return resetPasswordUiLink;
};

export const authService = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
};
