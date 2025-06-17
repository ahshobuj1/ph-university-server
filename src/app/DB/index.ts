import config from '../config';
import { UserRole } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';

const superUser = {
  id: 'SA-0001',
  email: 'ahsobuj@gmail.com',
  password: config.super_admin_pass,
  needsPasswordChange: false,
  role: UserRole.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await UserModel.findOne({
    role: UserRole.superAdmin,
  });

  if (!isSuperAdminExist) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
