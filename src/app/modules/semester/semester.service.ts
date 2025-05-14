import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';

const createSemester = async (semester: TSemester) => {
  const result = await SemesterModel.create(semester);
  return result;
};

export const semesterService = {
  createSemester,
};
