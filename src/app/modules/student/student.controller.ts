import { Request, Response } from 'express';
import { studentService } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    //send to service
    const result = await studentService.createStudent(student);

    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
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

export const studentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
