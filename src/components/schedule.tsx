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
  <h2 className="text-4xl md:text-7xl py-8 text-text-secondary" style={{marginTop: '+75px'}}>{formattedDate}</h2>
      <div>
        {/* Flaw in the code below: it is computing the current class based on if
        two strings are the same, it should be an index based system as to not
        have future errors */}
        {schedule?.map((period, index) => {
          const isActivePeriod = activePeriodInfo.period?.name === period.name;
          const shouldBlink =
            isActivePeriod && activePeriodInfo.isBetweenClasses;

          return (
            <div
              key={`${period.name}-${period.start}-${index}`}
              className={`flex flex-row justify-between md:text-5xl py-2 transition-colors duration-500 ease-in-out ${
                isActivePeriod
                  ? shouldBlink
                    ? highlightNext
                      ? "text-primary"
                      : "text-text-secondary"
                    : "text-primary"
                  : "text-text-secondary"
              }`}
            >
              <h3 className={`text-xl md:text-5xl${isActivePeriod ? ' font-bold' : ''}`}>{period.name}</h3>
              <p className={`text-lg md:text-5xl${isActivePeriod ? ' font-bold' : ''}`}> 
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
