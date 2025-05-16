import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { semesterNameCodeMap } from './semester.constant';
import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';

const createSemester = async (semester: TSemester) => {
  // Validate code Against name
  if (semesterNameCodeMap[semester.name] !== semester.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid code for semester');
  }

  const result = await SemesterModel.create(semester);
  return result;
};

const getSemesterById = async (id: string) => {
  const result = await SemesterModel.findById(id);
  return result;
};

export const semesterService = {
  createSemester,
  getSemesterById,
};
