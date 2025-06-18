import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DepartmentService } from './department.service';

const createDepartment = catchAsync(async (req, res) => {
  const result = await DepartmentService.createDepartment(req.body);

  sendResponse(res, {
    message: 'Department is created successfully',
    result,
  });
});

const getAllDepartments = catchAsync(async (req, res) => {
  const result = await DepartmentService.getAllDepartments(req?.query);

  sendResponse(res, {
    message: 'Departments got successfully',
    meta: result?.meta,
    result: result?.result,
  });
});

const getSingleDepartments = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const result = await DepartmentService.getSingleDepartment(id);

  sendResponse(res, {
    message: 'Department got successfully',
    result,
  });
});

const updateDepartments = catchAsync(async (req, res) => {
  const id = req?.params?.id;
  const payload = req.body;
  const result = await DepartmentService.updateDepartment(id, payload);

  sendResponse(res, {
    message: 'Department is updated successfully',
    result,
  });
});

export const departmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartments,
  updateDepartments,
};
