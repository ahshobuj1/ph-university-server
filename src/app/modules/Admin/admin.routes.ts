import { Router } from 'express';
import { adminController } from './admin.controller';
import validationChecker from '../../middlewares/validationChecker';
import { adminValidations } from './admin.validation';

const router = Router();

router.get('/', adminController.getAllAdmin);
router.get('/:id', adminController.getSingleAdmin);

router.patch(
  '/:id',
  validationChecker(adminValidations.updateAdminValidation),
  adminController.updateAdmin,
);

router.delete('/:id', adminController.deleteAdmin);

export const adminRoutes = router;
