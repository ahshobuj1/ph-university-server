import { Router } from 'express';
import { facultyController } from './faculty.controller';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from './faculty.validation';
import { UserRole } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = Router();

router.get(
  '/',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  facultyController.getAllFaculty,
);
router.get(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin, UserRole.faculty, UserRole.student),
  facultyController.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  validationChecker(facultyValidations.updateFacultyValidation),
  facultyController.updateFaculty,
);

router.delete(
  '/:id',
  auth(UserRole.superAdmin, UserRole.admin),
  facultyController.deleteFaculty,
);

export const facultyRoutes = router;
