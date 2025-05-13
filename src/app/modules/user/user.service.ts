import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudent = async (password: string, student: TStudent) => {
  const generatedId = '20251000001';

  const userData: Partial<TUser> = {
    password: password || config.default_pass,
    id: generatedId,
    role: 'student',
  };

  const createUser = await UserModel.create(userData);

  if (Object.keys(createUser).length) {
    student.id = generatedId;
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
