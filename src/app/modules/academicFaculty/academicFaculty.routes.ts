import { Router } from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validationChecker from '../../middlewares/validationChecker';
import { academicFacultyValidations } from './academicFaculty.validation';

const router = Router();

router.post(
  '/create-academic-faculty',
  validationChecker(academicFacultyValidations.createAcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
);

router.get('/', academicFacultyController.getAcademicFaculties);
router.get('/:id', academicFacultyController.getSingleAcademicFaculty);

export const academicFacultyRoutes = router;
