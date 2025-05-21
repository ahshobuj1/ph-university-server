import httpStatus from 'http-status';
import mongoose from 'mongoose';

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSources = Object.values(err?.errors).map((value) => {
    return {
      path: value?.path,
      message: value?.message,
    };
  });

  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: 'ValidationError',
    errorSources,
  };
};
