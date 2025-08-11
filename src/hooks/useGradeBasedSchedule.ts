import { useState, useEffect } from 'react';
import { ClassPeriod } from '../types/classPeriod';
import { middleSchoolSchedule, highSchoolSchedule } from '../types/schedule';
import { getGradeCookie, setGradeCookie, GradeLevel } from '../utils/cookies';

interface UseGradeBasedScheduleReturn {
  schedule: ClassPeriod[];
  gradeLevel: GradeLevel | null;
  setGradeLevel: (grade: GradeLevel) => void;
  loading: boolean;
}

export function useGradeBasedSchedule(): UseGradeBasedScheduleReturn {
  const [gradeLevel, setGradeLevelState] = useState<GradeLevel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get grade from cookie on mount
    const savedGrade = getGradeCookie();
    setGradeLevelState(savedGrade);
    setLoading(false);
  }, []);

  const setGradeLevel = (grade: GradeLevel) => {
    setGradeCookie(grade);
    setGradeLevelState(grade);
  };

  const getScheduleForGrade = (grade: GradeLevel | null): ClassPeriod[] => {
    if (grade === '6-8') {
      return middleSchoolSchedule;
    } else if (grade === '9-12') {
      return highSchoolSchedule;
    }
    // Default to middle school if no grade is set
    return middleSchoolSchedule;
  };

  return {
    schedule: getScheduleForGrade(gradeLevel),
    gradeLevel,
    setGradeLevel,
    loading,
  };
}