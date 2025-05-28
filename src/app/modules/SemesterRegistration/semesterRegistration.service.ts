import httpStatus from 'http-status';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { RegistrationStatus } from './semesterRegistration.constant';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../semester/semester.model';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
  // const currentStatus = payload?.status;

  /**
   * Step1: Check if there any registered semester that is already 'UPCOMING'|'ONGOING'
   * Step2: Check if the semester is exist
   * Step3: Check if the semester is already registered!
   * Step4: Create the semester registration
   */

  // check is there any registered semester already UPCOMING | ONGOING
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistrationModel.findOne({
      $or: [
        { status: RegistrationStatus.UPCOMING },
        { status: RegistrationStatus.ONGOING },
      ],
    });

  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.CONFLICT,
      `There is already an ${isThereAnyUpcomingOrOngoingSemester?.status} registered semester`,
    );
  }

  // Check if the semester is exist

  const isSemesterExists = await SemesterModel.findById(payload.semester);
  if (!isSemesterExists) {
    throw new AppError(httpStatus.BAD_REQUEST, `There is no semester here`);
  }

  // Check if the semester is already registered!
  const isSemesterAlreadyExists = await SemesterModel.findOne({
    semester: payload.semester,
  });
  if (isSemesterAlreadyExists) {
    throw new AppError(httpStatus.CONFLICT, `Semester already exists here `);
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistration = async () => {};
const getSingleSemesterRegistration = async () => {};
const updateSemesterRegistration = async () => {};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
