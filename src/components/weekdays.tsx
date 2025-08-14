import { WeeklySchedule } from "../types/weekTypes";

type WeekdaysProps = {
  weeklySchedule: WeeklySchedule;
  todayIndex: number;
};

function Weekdays({ weeklySchedule, todayIndex }: WeekdaysProps) {
  return (
    <div className="flex w-full md:justify-start justify-between items-center gap-2">
      {weeklySchedule.map((day, index) => (
        <div
          key={index}
          className={
            `${index === todayIndex
              ? 'font-bold text-3xl bg-primary/10 px-4 py-2 rounded text-primary shadow outline outline-2 outline-primary'
              : 'font-normal text-2xl text-primary px-4 py-2 rounded'}`
          }
        >
          {day.title}
        </div>
      ))}
    </div>
  );
}

export default Weekdays;
