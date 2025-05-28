import httpStatus from 'http-status';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { RegistrationStatus } from './semesterRegistration.constant';
import { AppError } from '../../errors/AppError';
import { SemesterModel } from '../semester/semester.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSemesterRegistration = async (payload: TSemesterRegistration) => {
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
  const isSemesterAlreadyExists = await SemesterModel.find({
    semester: payload.semester,
  });
  if (isSemesterAlreadyExists) {
    throw new AppError(httpStatus.CONFLICT, `Semester already exists here `);
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistration = async (query: Record<string, unknown>) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('semester'),
    query,
  )
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistration = async (id: string) => {
  const result =
    await SemesterRegistrationModel.findById(id).populate('semester');
  return result;
};

const updateSemesterRegistration = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  /**
   * Step1: Check if the semester is exist
   * Step2: Check if the requested registered semester is exists
   * Step3: If the requested semester registration is ended, we will not update anything
   * Step4: If the requested semester registration is 'UPCOMING', we will let update everything.
   * Step5: If the requested semester registration is 'ONGOING', we will not update anything  except status to 'ENDED'
   * Step6: If the requested semester registration is 'ENDED' , we will not update anything
   *
   * UPCOMING --> ONGOING --> ENDED
   *
   */

  // check is semester registration is exists
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `The Semester registration is not found`,
    );
  }

  // status
  const currentSemesterStatus = isSemesterRegistrationExists.status;
  const requestedStatus = payload?.status;

  //If the requested semester registration is ended, we will not update anything
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The Semester registration is already Ended`,
    );
  }

  // UPCOMING --> ONGOING --> ENDED
  if (
    currentSemesterStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not directly update status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update status from ${currentSemesterStatus} to ${requestedStatus}`,
    );
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true },
  );
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
