import { TDepartment } from './department.interface';
import { DepartmentModel } from './department.model';

const createDepartment = async (payload: TDepartment) => {
  const result = await DepartmentModel.create(payload);
  return result;
};

const getAllDepartments = async () => {
  const result = await DepartmentModel.find().populate('academicFaculty');
  return result;
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
