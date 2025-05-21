import mongoose from 'mongoose';
import { TCommonErrorResponse, TErrorSources } from '../interface/error';

export const handleCastError = (
  err: mongoose.Error.CastError,
): TCommonErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  return {
    statusCode: 400,
    message: 'Invalid ID',
    errorSources,
  };
};
