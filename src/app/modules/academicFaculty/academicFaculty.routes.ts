import { Router } from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validationChecker from '../../middlewares/validationChecker';
import { academicFacultyValidations } from './academicFaculty.validation';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-academic-faculty',
  auth(UserRole.admin, UserRole.superAdmin),
  validationChecker(academicFacultyValidations.createAcademicFacultyValidation),
  academicFacultyController.createAcademicFaculty,
);

router.get(
  '/',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.faculty),
  academicFacultyController.getAcademicFaculties,
);
router.get(
  '/:id',
  auth(UserRole.admin, UserRole.superAdmin, UserRole.faculty, UserRole.student),
  academicFacultyController.getSingleAcademicFaculty,
);

export const academicFacultyRoutes = router;
