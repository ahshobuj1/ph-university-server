import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createAcademicFaculty = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const getAcademicFaculties = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(AcademicFacultyModel.find(), query)
    .filter()
    .sort()
    .pagination()
    .fields();

  const result = await FacultyQuery.modelQuery;
  const meta = await FacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicFaculty = async (id: string) => {
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

export const academicFacultyService = {
  createAcademicFaculty,
  getAcademicFaculties,
  getSingleAcademicFaculty,
};
