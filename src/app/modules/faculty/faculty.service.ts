import { FacultyModel } from './faculty.model';

const getAllFaculty = async () => {
  const result = await FacultyModel.find();
  return result;
};

const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};

export const facultyService = {
  getAllFaculty,
  getSingleFaculty,
};
