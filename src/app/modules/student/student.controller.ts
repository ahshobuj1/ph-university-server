import { Request, Response } from 'express';
import { studentService } from './student.service';

// import { studentValidationSchemaWithJoi } from './student.validation.joi';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudents();

    res.status(200).json({
      success: true,
      message: 'All students got successfully',
      length: result.length,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: err,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentService.getStudentById(id);

    res.status(200).json({
      success: true,
      message: 'Student got successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student',
      error: err,
    });
  }
};

const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await studentService.deleteSingleStudent(id);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting student',
      error: err,
    });
  }
};

export const studentController = {
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
