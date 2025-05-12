import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.delete('/:id', studentController.deleteSingleStudent);

export const studentRoutes = router;
