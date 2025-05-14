import { model, Schema } from 'mongoose';
import { TSemester } from './semester.interface';

export const semesterMonthSchema = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const semesterSchema = new Schema<TSemester>(
  {
    name: { type: String, enum: ['Autumn', 'Summer', 'Fall'] },
    code: { type: String, enum: ['01', '02', '03'] },
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
    throw new Error('Semester already exists');
  }
  next();
});

export const SemesterModel = model<TSemester>('Semester', semesterSchema);
