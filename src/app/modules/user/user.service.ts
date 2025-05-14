import config from '../../config';
import { SemesterModel } from '../semester/semester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { createStudentId } from './user.utils';

const createStudent = async (password: string, student: TStudent) => {
  const getSemester = await SemesterModel.findById(student.semester);

  // student id
  const generatedStudentId = await createStudentId(getSemester);

  const userData: Partial<TUser> = {
    id: generatedStudentId,
    password: password || config.default_pass,
    role: 'student',
  };

  const createUser = await UserModel.create(userData);

  if (Object.keys(createUser).length) {
    student.id = generatedStudentId;
    student.user = createUser._id;
    student.isDeleted = createUser.isDeleted;

    const newStudent = await StudentModel.create(student);
    return newStudent;
  }
};

export const userService = {
  createStudent,
};

// check user exist in the db
// if (await StudentModel.isUserExists(student.email)) {
//   throw new Error('User already exists');
// }
