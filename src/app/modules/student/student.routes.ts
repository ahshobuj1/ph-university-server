import express from 'express';
import { studentController } from './student.controller';
import validationChecker from '../../middlewares/validationChecker';
import { studentValidations } from './student.zod.validation';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getStudentById);
router.patch(
  '/:studentId',
  validationChecker(studentValidations.updateStudentValidationSchema),
  studentController.updateStudent,
);
router.delete('/:studentId', studentController.deleteSingleStudent);

export const studentRoutes = router;
