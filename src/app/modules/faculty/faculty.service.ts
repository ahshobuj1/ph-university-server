import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { searchableFields } from './faculty.constant';
import { TFaculty } from './faculty.interface';
import { FacultyModel } from './faculty.model';
import { UserModel } from '../user/user.model';
import mongoose from 'mongoose';

const getAllFaculty = async (query: Record<string, unknown>) => {
  const facultyQuery = new QueryBuilder(
    FacultyModel.find()
      .populate('user')
      .populate('academicFaculty')
      .populate('department'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await facultyQuery.modelQuery;
  const meta = await facultyQuery.countTotal();

  return { meta, result };
};

const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findById(id)
    .populate('user')
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

const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deleteFaculty = await FacultyModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    const deletedUser = await UserModel.findByIdAndUpdate(
      deleteFaculty?.user,
      {
        isDeleted: true,
      },
      { new: true },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return deleteFaculty;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const facultyService = {
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
