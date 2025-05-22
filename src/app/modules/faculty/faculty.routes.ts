import { Router } from 'express';
import { facultyController } from './faculty.controller';

const router = Router();

router.get('/', facultyController.getAllFaculty);
router.get('/:id', facultyController.getSingleFaculty);

export const facultyRoutes = router;
