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

    // Dynamic margin multiplier for schedule position
    const [scheduleMargin, setScheduleMargin] = useState(0);

    useEffect(() => {
      // Set margin based on window height and multiplier
      const multiplier = 1.1; // Tweak this value as needed
      setScheduleMargin(window.innerHeight * multiplier);
      // Optionally update on resize
      const handleResize = () => setScheduleMargin(window.innerHeight * multiplier);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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

  // Update document.title to match homepage clock logic
  useEffect(() => {
    const { getScheduleStatus } = require("../hooks/scheduleStatus");
    const updateTitle = () => {
      const status = getScheduleStatus(schedule);
      if (status.isDayOver) {
        document.title = "School Day Complete";
        return;
      }
      const totalMinutes = Math.ceil(status.secondsUntilNext / 60);
      if (status.currentPeriod) {
        document.title = `${totalMinutes} minute${totalMinutes === 1 ? '' : 's'} until ${status.currentPeriod.name} ends`;
      } else if (status.nextPeriod) {
        document.title = `${totalMinutes} minute${totalMinutes === 1 ? '' : 's'} until ${status.nextPeriod.name} starts`;
      } else {
        document.title = "TPSTIME";
      }
    };
    updateTitle();
    const interval = setInterval(updateTitle, 1000);
    return () => clearInterval(interval);
  }, [schedule]);

  return (
    <div className="w-full">
      {/* Center the time and remove static margin */}
      <h2
        className="text-4xl md:text-7xl py-8 text-text-secondary flex justify-center items-center"
        style={{ marginTop: 0 }}
      >
        {formattedDate}
      </h2>
      {/* Schedule container with dynamic margin */}
      <div style={{ marginTop: `${scheduleMargin}px`, transition: 'margin-top 0.5s' }}>
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
