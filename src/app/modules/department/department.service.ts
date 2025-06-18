import QueryBuilder from '../../builder/QueryBuilder';
import { TDepartment } from './department.interface';
import { DepartmentModel } from './department.model';

const createDepartment = async (payload: TDepartment) => {
  const result = await DepartmentModel.create(payload);
  return result;
};

const getAllDepartments = async (query: Record<string, unknown>) => {
  const DepartmentQuery = new QueryBuilder(
    DepartmentModel.find().populate('academicFaculty'),
    query,
  )
    .search(['name'])
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await DepartmentQuery.modelQuery;
  const meta = await DepartmentQuery.countTotal();

  return { meta, result };
};

const getSingleDepartment = async (id: string) => {
  const result = await DepartmentModel.findById(id).populate('academicFaculty');
  return result;
};

const updateDepartment = async (id: string, payload: Partial<TDepartment>) => {
  const result = await DepartmentModel.findOneAndUpdate({ _id: id }, payload);
  return result;
};

export const DepartmentService = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
};
