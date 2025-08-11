import { useGradeBasedSchedule } from '../hooks/useGradeBasedSchedule';
import { GradeLevel } from '../utils/cookies';

function GradeSelector() {
  const { gradeLevel, setGradeLevel } = useGradeBasedSchedule();

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const grade = event.target.value as GradeLevel;
    setGradeLevel(grade);
  };

  return (
    <div className="border border-primary p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2 text-text">Grade Level</h2>
      <p className="text-secondary text-sm mb-3">
        Select your grade level to get the appropriate schedule
      </p>
      <select
        value={gradeLevel || '6-8'}
        onChange={handleGradeChange}
        className="w-full p-2 border border-primary rounded bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="6-8">Middle School (Grades 6-8)</option>
        <option value="9-12">High School (Grades 9-12)</option>
      </select>
    </div>
  );
}

export default GradeSelector;