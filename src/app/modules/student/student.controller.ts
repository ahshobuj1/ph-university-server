import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';

// import { studentValidationSchemaWithJoi } from './student.validation.joi';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentService.getAllStudents();

    res.status(200).json({
      success: true,
      message: 'All students got successfully',
      length: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentService.getStudentById(id);

    res.status(200).json({
      success: true,
      message: 'Student got successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteSingleStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
