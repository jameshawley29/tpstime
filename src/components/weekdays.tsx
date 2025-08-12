import { WeeklySchedule } from "../types/weekTypes";

type WeekdaysProps = {
  weeklySchedule: WeeklySchedule;
  todayIndex: number;
};

function Weekdays({ weeklySchedule, todayIndex }: WeekdaysProps) {
  return (
    <div className="flex w-full md:justify-start [&>*]:max-w-10 [&>*]:text-primary [&>*]:p-2 [&>*]:rounded [&>*]:flex-1 [&>*]:px-4 [&>*]:text-center justify-between items-center">
      {weeklySchedule.map((day, index) => (
        <div key={index} className="font-bold">
          {day.title}
        </div>
      ))}
    </div>
  );
}

export default Weekdays;
