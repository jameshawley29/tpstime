export type GradeLevel = '6-8' | '9-12';

export const GRADE_COOKIE_NAME = 'userGrade';

export function setGradeCookie(grade: GradeLevel): void {
  document.cookie = `${GRADE_COOKIE_NAME}=${grade}; path=/; max-age=${365 * 24 * 60 * 60}`;
}

export function getGradeCookie(): GradeLevel | null {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const gradeCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${GRADE_COOKIE_NAME}=`)
  );
  
  if (gradeCookie) {
    const grade = gradeCookie.split('=')[1] as GradeLevel;
    return grade === '6-8' || grade === '9-12' ? grade : null;
  }
  
  return null;
}

export function clearGradeCookie(): void {
  document.cookie = `${GRADE_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}