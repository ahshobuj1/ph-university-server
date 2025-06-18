import { model, Schema } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';
import { Blood, Gender } from './admin.constant';
import config from '../../config';

const adminNameSchema = new Schema<TAdminName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const adminSchema = new Schema<TAdmin>(
  {
    id: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    profileImage: { type: String, default: config.default_profile_image },
    designation: { type: String, required: true },
    name: adminNameSchema,
    gender: { type: String, required: true, enum: Gender },
    dateOfBirth: { type: String, required: true },
    contact: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    localAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    blood: { type: String, enum: Blood },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = model<TAdmin>('Admin', adminSchema);
