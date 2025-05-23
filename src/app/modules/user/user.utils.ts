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

  //return -> 2025010001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const createStudentId = async (semester: TSemester) => {
  const lastStudentId = await findLastStudentId();

  let currentId = (0).toString();

  // 2025 01 0001 -> id
  const lastStudentYear = lastStudentId?.substring(4, 0); //year -> 2025
  const lastStudentCode = lastStudentId?.substring(4, 6); //code -> 01
  const currentStudentYear = semester.year;
  const currentStudentCode = semester.code;

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentCode === currentStudentCode
  ) {
    currentId = lastStudentId.substring(6);
  }
  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `${semester.year}${semester.code}${incrementId}`;
};

const findLastFacultyId = async () => {
  const lastFaculty = await UserModel.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const createFacultyId = async () => {
  let currentId = (0).toString();
  const lastFacultyId = await findLastFacultyId();

  if (lastFacultyId) {
    // F- 0001
    currentId = lastFacultyId.substring(2);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `F-${incrementId}`;
};

// Admin ID
const findLastAdminId = async () => {
  const lastAdminID = await UserModel.findOne(
    { role: 'admin' },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastAdminID?.id ? lastAdminID?.id : undefined;
};

export const createAdminId = async () => {
  let currentId = (0).toString();
  const lastAdminId = await findLastAdminId();

  if (lastAdminId) {
    currentId = lastAdminId.substring(2);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  return `A-${incrementId}`;
};
