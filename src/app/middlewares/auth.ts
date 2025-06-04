import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

// higher-order middleware func
const auth = (...requiredRoles: TUserRole[]) => {
  //middleware func
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check if token is undefined

    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    // verify token
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // decoded user role and id
    const { role } = decoded;

    // check authorization access by role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // set user to express req
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
