import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// import { studentValidationSchemaWithJoi } from './student.validation.joi';

// Higher-order func

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudents();

  res.status(200).json({
    success: true,
    message: 'All students got successfully',
    length: result.length,
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.getStudentById(id);

  sendResponse(res, {
    message: 'Student got successfully',
    result,
  });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await studentService.deleteSingleStudent(id);

  sendResponse(res, {
    message: 'Student deleted successfully',
    result,
  });
});

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
