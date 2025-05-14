import { TSemesterNameCode } from './semester.interface';

// Validate code Against name
export const semesterNameCodeMap: TSemesterNameCode = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

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

export type TMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
