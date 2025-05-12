import { Request, Response } from 'express';
import { userService } from './user.service';

const createStudent = async (req: Request, res: Response) => {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const userController = {
  createStudent,
};
