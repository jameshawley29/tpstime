import React, { useEffect, useState } from "react";
import { ClassPeriod } from "../types/classPeriod";
import { getFormattedDate, convertTo12Hour } from "../utils/utils";
import { getActivePeriod } from "../hooks/scheduleStatus";

type ScheduleProps = {
  schedule: ClassPeriod[];
};

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const today = new Date();
  const formattedDate = getFormattedDate(today);

  const [activePeriodInfo, setActivePeriodInfo] = useState(() =>
    getActivePeriod(schedule)
  );

  const [highlightNext, setHighlightNext] = useState(false);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setActivePeriodInfo(getActivePeriod(schedule));
    }, 1000);

    const highlightInterval = setInterval(() => {
      setHighlightNext((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(highlightInterval);
    };
  }, [schedule]);

  return (
    <div className="w-full">
      <h2 className="text-7xl py-8">{formattedDate}</h2>
      <div>
        {schedule?.map((period) => {
          const isActivePeriod = activePeriodInfo.period?.name === period.name;
          const shouldBlink =
            isActivePeriod && activePeriodInfo.isBetweenClasses;

          return (
            <div
              key={period.name}
              className={`flex flex-row justify-between md:text-5xl py-2 transition-colors duration-500 ease-in-out ${
                isActivePeriod
                  ? shouldBlink
                    ? highlightNext
                      ? "text-inherit"
                      : "text-gray-400 dark:text-gray-600"
                    : "text-inherit"
                  : "text-gray-400 dark:text-gray-600"
              }`}
            >
              <h3 className="text-xl md:text-5xl">{period.name}</h3>
              <p className="text-lg md:text-5xl">
                {convertTo12Hour(period.start)} - {convertTo12Hour(period.end)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Schedule;
