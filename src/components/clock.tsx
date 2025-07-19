import React, { useEffect, useState } from "react";
import { ClassPeriod } from "../types/classPeriod";
import { getScheduleStatus } from "../hooks/scheduleStatus";
import { formatClockParts } from "../hooks/formatClockParts";

type ClockProps = {
  schedule: ClassPeriod[];
};

const Clock: React.FC<ClockProps> = ({ schedule }) => {
  const [status, setStatus] = useState(() => getScheduleStatus(schedule));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getScheduleStatus(schedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  const { leftSide, rightSide } = formatClockParts(status.secondsUntilNext);

  return (
    <div className="flex flex-col items-start justify-center space-y-1 font-mono">
      <p className="text-lg md:text-3xl pl-3">{status.currentPeriod?.name}</p>

      {status.isDayOver ? (
        <p className="text-red-500">Schedule has ended for the day.</p>
      ) : (
        <p
          className={`text-[25vw] md:text-[20vw] w-full font-bold text-center leading-none ${
            !status.currentPeriod ? "text-green-500 dark:text-inherit" : ""
          }`}
        >
          {leftSide}:{rightSide}
        </p>
      )}
    </div>
  );
};

export default Clock;
