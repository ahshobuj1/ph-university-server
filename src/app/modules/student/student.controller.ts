import { Request, Response } from 'express';
import { studentService } from './student.service';
import studentValidationWithZod from './student.zod.validation';

// import { studentValidationSchemaWithJoi } from './student.validation.joi';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;

    // Zod validation
    const validateStudent = studentValidationWithZod.parse(student);

    // Joi validation
    // const { error, value } = studentValidationSchemaWithJoi.validate(student);
    // if (error) {
    //   return res.status(500).json({
    //     success: false,
    //     message: 'Student model in not valid',
    //     error: error.details,
    //   });
    // }

    //send to service
    const result = await studentService.createStudent(validateStudent);

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
  createStudent,
  getAllStudents,
  getStudentById,
  deleteSingleStudent,
};
