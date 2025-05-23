import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminService } from './admin.service';

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminService.getAllAdmin(req?.query);

  sendResponse(res, {
    message: 'Admin is retrieved successfully',
    result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getSingleAdmin(id);

  sendResponse(res, {
    message: 'Admin is retrieved successfully',
    result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;

  const result = await adminService.updateAdmin(id, admin);

  sendResponse(res, {
    message: 'Admin is updated successfully',
    result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteAdmin(id);

  sendResponse(res, {
    message: 'Admin is deleted successfully',
    result,
  });
});

export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
