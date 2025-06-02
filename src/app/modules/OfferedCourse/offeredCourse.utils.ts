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

// export const hasTimeConflict = (
//   assignSchedules: TSchedules[],
//   newSchedules: TSchedules,
// ) => {
//   // Convert time strings to minutes since midnight for easier comparison
//   const toMinutes = (timeStr: string) => {
//     const [hours, minutes] = timeStr.split(':').map(Number);
//     return hours * 60 + minutes;
//   };

//   const newStart = toMinutes(newSchedules.startTime);
//   const newEnd = toMinutes(newSchedules.endTime);

//   for (let i = 0; i < assignSchedules.length; i++) {
//     const schedule = assignSchedules[i];
//     const existingStart = toMinutes(schedule.startTime);
//     const existingEnd = toMinutes(schedule.endTime);

//     // Check if time ranges overlap
//     if (newStart < existingEnd && newEnd > existingStart) {
//       return true; // Conflict found
//     }
//   }

//   return false; // No conflict found
// };
