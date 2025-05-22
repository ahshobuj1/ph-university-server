import { Router } from 'express';
import { facultyController } from './faculty.controller';

const router = Router();

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);
router.patch('/:id', facultyController.updateFaculty);

export const facultyRoutes = router;
