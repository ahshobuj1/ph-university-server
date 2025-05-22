import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { searchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { FacultyModel } from './faculty.model';

const getAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find().populate('academicFaculty').populate('department'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await facultyQuery.modelQuery;
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findById(id)
    .populate('academicFaculty')
    .populate('department');

  return result;
};

const updateFaculty = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...primitiveFacultyData } = payload;

  const modifiedUpdatedFacultyData: Record<string, unknown> = {
    ...primitiveFacultyData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedFacultyData[`name.${key}`] = value;
    }
  }

  const result = await FacultyModel.findByIdAndUpdate(
    id,
    modifiedUpdatedFacultyData,
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to updated faculty');
  }

  return result;
};

export const facultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
};
