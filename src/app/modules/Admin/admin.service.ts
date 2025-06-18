import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import mongoose from 'mongoose';
import { adminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { AdminModel } from './admin.model';

const getAllAdmin = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(AdminModel.find().populate('user'), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();

  return { meta, result };
};

const getSingleAdmin = async (id: string) => {
  const result = await AdminModel.findById(id).populate('user');

  return result;
};

const updateAdmin = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...primitiveAdminData } = payload;

  const modifiedUpdatedAdminData: Record<string, unknown> = {
    ...primitiveAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedAdminData[`name.${key}`] = value;
    }
  }

  const result = await AdminModel.findByIdAndUpdate(
    id,
    modifiedUpdatedAdminData,
    { new: true },
  );

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to updated admin');
  }

  return result;
};

const deleteAdmin = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await AdminModel.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );

    const deletedUser = await UserModel.findByIdAndUpdate(
      deletedAdmin?.user,
      {
        isDeleted: true,
      },
      { new: true },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const adminService = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
