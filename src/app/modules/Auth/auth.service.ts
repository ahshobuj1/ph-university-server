import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

  const accessToken = jwt.sign(
    { jwtPayload },
    config.jwt_access_secret as string,
    {
      expiresIn: '10d',
    },
  );

  return {
    accessToken,
    needsPasswordChange: existingUser?.needsPasswordChange,
  };
};

export const authService = {
  loginUser,
};
