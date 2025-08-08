import React, { useEffect, useState } from "react";
import { ClassPeriod } from "../types/classPeriod";
import { getScheduleStatus } from "../hooks/scheduleStatus";

type ClockDescriptionProps = {
  schedule: ClassPeriod[];
};

const ClockDescription: React.FC<ClockDescriptionProps> = ({ schedule }) => {
  const [status, setStatus] = useState(() => getScheduleStatus(schedule));

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getScheduleStatus(schedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  const getDescription = (): string => {
    if (status.isDayOver) {
      return "School Day Complete";
    }

    if (status.currentPeriod) {
      return `Untill ${status.currentPeriod.name} Ends`;
    }

    if (status.nextPeriod) {
      return `Untill ${status.nextPeriod.name} Starts`;
    }

    return "";
  };

  const description = getDescription();

  if (!description) {
    return null;
  }

  return (
    <p className="text-text-secondary text-base md:text-lg font-medium">
      {description}
    </p>
  );
};

export default ClockDescription;
