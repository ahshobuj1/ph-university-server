import { TSemester } from './semester.interface';
import { SemesterModel } from './semester.model';

const createSemester = async (semester: TSemester) => {
  type TSemesterNameCode = {
    Autumn: '01';
    Summer: '02';
    Fall: '03';
  };

  const semesterNameCodeMap: TSemesterNameCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };

  // Validate code Against name
  if (semesterNameCodeMap[semester.name] !== semester.code) {
    throw new Error('Invalid code for semester name');
  }

  const result = await SemesterModel.create(semester);
  return result;
};

export const semesterService = {
  createSemester,
};
