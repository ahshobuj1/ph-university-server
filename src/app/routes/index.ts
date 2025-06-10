import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.routes';
import { userRoutes } from '../modules/user/user.routes';
import { semesterRoutes } from '../modules/semester/semester.routes';
import { academicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.routes';
import { departmentRoutes } from '../modules/department/department.routes';
import { facultyRoutes } from '../modules/faculty/faculty.routes';
import { adminRoutes } from '../modules/Admin/admin.routes';
import { courseRoutes } from '../modules/Course/course.routes';
import { semesterRegistrationRoutes } from '../modules/SemesterRegistration/semesterRegistration.routes';
import { offeredCourseRoutes } from '../modules/OfferedCourse/offeredCourse.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { enrolledCourseRoutes } from '../modules/EnrolledCourse/enrolledCourse.routes';

const router = Router();

const modulesRoutes = [
  {
    path: '/students',
    route: studentRoutes,
  },
  {
    path: '/faculties',
    route: facultyRoutes,
  },
  {
    path: '/admins',
    route: adminRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/semesters',
    route: semesterRoutes,
  },
  {
    path: '/semester-registrations',
    route: semesterRegistrationRoutes,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },
  {
    path: '/departments',
    route: departmentRoutes,
  },
  {
    path: '/courses',
    route: courseRoutes,
  },
  {
    path: '/offered-courses',
    route: offeredCourseRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/enrolled-courses',
    route: enrolledCourseRoutes,
  },
];

modulesRoutes.forEach((data) => router.use(data.path, data.route));

export default router;
