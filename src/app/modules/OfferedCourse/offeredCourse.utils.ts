import { TDays } from './offeredCourse.interface';

export type TSchedules = {
  days: TDays[];
  startTime: string;
  endTime: string;
};

export const hasTimeConflict = (
  assignSchedules: TSchedules[],
  newSchedules: TSchedules,
) => {
  for (const schedule of assignSchedules) {
    const existingStartTime = `1970-01-01T${schedule.startTime}`;
    const existingEndTime = `1970-01-01T${schedule.endTime}`;
    const newStartTime = `1970-01-01T${newSchedules.startTime}`;
    const newEndTime = `1970-01-01T${schedule.endTime}`;

    // 07:00 - 09:00
    // 10:00 - 12:00
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
  }

  return false;
};
