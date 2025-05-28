import { semesterRegistrationController } from './semesterRegistration.controller';
import { Router } from 'express';

const router = Router();

router.post(
  '/create-semester-registration',
  semesterRegistrationController.createSemesterRegistration,
);
router.get('/', semesterRegistrationController.getAllSemesterRegistration);
router.get(
  '/:id',
  semesterRegistrationController.getSingleSemesterRegistration,
);
router.patch('/:id', semesterRegistrationController.updateSemesterRegistration);

export const semesterRegistrationRoutes = router;
