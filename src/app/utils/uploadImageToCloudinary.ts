import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs/promises';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const uploadImageToCloudinary = async (
  path: string,
  imageName: string,
): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    // delete tmp file from uploads
    await fs.unlink(path);
    console.log(result);
    return result;
  } catch (error) {
    await fs.unlink(path);
    throw error;
  }
};

export const upload = multer({ storage: storage });
