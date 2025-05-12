import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendresponse';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    // Zod validation
    // const validateStudent = studentValidationWithZod.parse(student);

    //send to service
    const result = await userService.createStudent(password, student);

    sendResponse(res, {
      message: 'Student created successfully',
      result: result,
    });
  } catch (err) {
    next(err);
  }
};
export const userController = {
  createStudent,
};
