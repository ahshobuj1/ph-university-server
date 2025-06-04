import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TChangePassword, TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // 1-> check exists user
  // 2-> check status is blocked
  // 3-> check isDeleted
  // 4-> check password is correct
  // 5-> create jwt token and sent to client

  // check if user exists
  const existingUser = await UserModel.findOne({ id: payload.id });

  if (!existingUser) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found, Insert correct Id',
    );
  }

  //check if the user isDeleted
  if (existingUser.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }

  // check if the user status is blocked
  if (existingUser.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  // check password is correct -> compare to bcrypt hashing password
  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    existingUser?.password as string,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password!');
  }

  // create jwt token
  const jwtPayload = {
    id: existingUser?.id,
    role: existingUser?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: existingUser?.needsPasswordChange,
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

export const authService = {
  loginUser,
  changePassword,
};
