import React, { useEffect, useState } from "react";
import { ClassPeriod } from "../types/classPeriod";
import { getFormattedDate, convertTo12Hour } from "../utils/utils";
import { getScheduleStatus } from "../hooks/scheduleStatus";

type ScheduleProps = {
  schedule: ClassPeriod[];
};

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const today = new Date();
  const formattedDate = getFormattedDate(today);

  const [status, setStatus] = useState(() => getScheduleStatus(schedule));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getScheduleStatus(schedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  return (
    <div className="w-full">
      <h2 className="text-7xl py-8">{formattedDate}</h2>
      <div>
        {schedule?.map((period) => (
          <div
            key={period.name}
            className={`flex flex-row justify-between md:text-5xl py-2 ${
              period.name === status.currentPeriod?.name
                ? "text-inherit"
                : "text-gray-400 dark:text-gray-600"
            }`}
          >
            <h3 className="text-xl md:text-5xl">{period.name}</h3>
            <p className="text-lg md:text-5xl">
              {convertTo12Hour(period.start)} - {convertTo12Hour(period.end)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
