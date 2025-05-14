import { TSemester } from '../semester/semester.interface';
import { UserModel } from './user.model';

// find last student by createdAt -> -1
const findLastStudentId = async () => {
  const lastStudent = await UserModel.findOne(
    { role: 'student' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  //202501  0001
  const fourDigitId = lastStudent?.id ? lastStudent.id.substring(6) : undefined;
  return fourDigitId;
};

export const createStudentId = async (semester: TSemester) => {
  //
  const currentId = (await findLastStudentId()) || (0).toString();
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `${semester.year}${semester.code}${incrementId}`;
};
