import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// import { studentValidationSchemaWithJoi } from './student.validation.joi';

// Higher-order func

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudents(req?.query);

  res.status(200).json({
    success: true,
    message: 'All students got successfully',
    length: result.length,
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await studentService.getStudentById(id);

  sendResponse(res, {
    message: 'Student got successfully',
    result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req?.params?.studentId;
  const updatedStudentData = req?.body?.student;
  const result = await studentService.updateStudent(id, updatedStudentData);

  sendResponse(res, { message: 'Student updated successfully', result });
});

const deleteSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
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
  updateStudent,
};
