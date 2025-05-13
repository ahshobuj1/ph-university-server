import { RequestHandler } from 'express';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';

const createStudent: RequestHandler = async (req, res, next) => {
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
