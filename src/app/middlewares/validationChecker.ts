import { NextFunction, Request, Response } from 'express';
import { ZodTypeAny } from 'zod';
import catchAsync from '../utils/catchAsync';

// higher-order middleware func
const validationChecker = (validateSchema: ZodTypeAny) => {
  //middleware func
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //validation check
    await validateSchema.parseAsync(req.body);
    return next();
  });
};

export default validationChecker;
