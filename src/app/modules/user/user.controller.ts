import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;

  // Zod validation
  // const validateStudent = studentValidationWithZod.parse(student);

  //send to service
  const result = await userService.createStudent(password, student);

  sendResponse(res, {
    message: 'Student created successfully',
    result: result,
  });
});
export const userController = {
  createStudent,
};
