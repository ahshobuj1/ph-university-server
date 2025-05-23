import { Router } from 'express';
import { facultyController } from './faculty.controller';
import validationChecker from '../../middlewares/validationChecker';
import { facultyValidations } from './faculty.validation';

const router = Router();

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);

router.patch(
  '/:id',
  validationChecker(facultyValidations.updateFacultyValidation),
  facultyController.updateFaculty,
);

router.delete('/:id', facultyController.deleteFaculty);

export const facultyRoutes = router;
