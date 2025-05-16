import { Router } from 'express';
import { departmentController } from './department.controller';
import validationChecker from '../../middlewares/validationChecker';
import { departmentValidations } from './department.validation';

const router = Router();

router.post(
  '/create-department',
  validationChecker(departmentValidations.createDepartmentValidation),
  departmentController.createDepartment,
);

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getSingleDepartments);
router.patch('/:id', departmentController.updateDepartments);

export const departmentRoutes = router;
