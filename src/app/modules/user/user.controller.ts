import { NextFunction, Request, Response } from 'express';
import { userService } from './user.service';

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

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const userController = {
  createStudent,
};
