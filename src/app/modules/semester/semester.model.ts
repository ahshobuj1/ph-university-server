import httpStatus from 'http-status';
import { model, Schema } from 'mongoose';
import { TSemester } from './semester.interface';
import { semesterMonthSchema, semesterNameCodeMap } from './semester.constant';
import { AppError } from '../../errors/AppError';

const semesterSchema = new Schema<TSemester>(
  {
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'] },
    code: {
      type: String,
      enum: ['01', '02', '03'],
      validate: {
        validator: function (code: string) {
          return semesterNameCodeMap[this.name] === code;
        },
        message: 'Invalid code for semester name',
      },
    },
    year: { type: String },
    startMonth: { type: String, enum: semesterMonthSchema },
    endMonth: { type: String, enum: semesterMonthSchema },
  },
  {
    timestamps: true,
  },
);

// check is exists with middleware
semesterSchema.pre('save', async function (next) {
  const isExists = await SemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isExists) {
    throw new AppError(httpStatus.CONFLICT, 'Semester already exists');
  }
  next();
});

export const SemesterModel = model<TSemester>('Semester', semesterSchema);
