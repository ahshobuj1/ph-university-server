import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import { semesterNameCodeMap } from './semester.constant';
import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemester = async (semester: TSemester) => {
  // Validate code Against name
  if (semesterNameCodeMap[semester.name] !== semester.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid code for semester');
  }

  const result = await SemesterModel.create(semester);
  return result;
};

const getAllSemester = async (query: Record<string, unknown>) => {
  const SemesterQuery = new QueryBuilder(SemesterModel.find(), query)
    .search(['name', 'year', 'code'])
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await SemesterQuery.modelQuery;
  const meta = await SemesterQuery.countTotal();

  return { meta, result };
};

const getSemesterById = async (id: string) => {
  const result = await SemesterModel.findById(id);
  return result;
};

const updateSemester = async (id: string, payload: Partial<TSemester>) => {
  //
  if (payload.name && semesterNameCodeMap[payload.name] !== payload.code) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await SemesterModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'failed to update semester',
    );
  }

  return result;
};

export const semesterService = {
  createSemester,
  getAllSemester,
  getSemesterById,
  updateSemester,
};
