export const calculateGradeAndGPA = (
  totalMarks: number,
): { grade: string; gradePoints: number } => {
  if (totalMarks >= 80) return { grade: 'A', gradePoints: 4.0 };
  if (totalMarks >= 70) return { grade: 'A-', gradePoints: 3.5 };
  if (totalMarks >= 60) return { grade: 'B', gradePoints: 3.0 };
  if (totalMarks >= 50) return { grade: 'C', gradePoints: 2.5 };
  if (totalMarks >= 33) return { grade: 'D', gradePoints: 2.0 };
  return { grade: 'F', gradePoints: 0.0 };
};
