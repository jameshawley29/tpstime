import React, { useEffect, useState } from "react";
import { ClassPeriod } from "../types/classPeriod";
import { getScheduleStatus } from "../hooks/scheduleStatus";

type ClockDescriptionProps = {
  schedule: ClassPeriod[];
};

const ClockDescription: React.FC<ClockDescriptionProps> = ({ schedule }) => {
  // Initialize the status state with the current schedule status
  // This tracks whether we're in a class, between classes, or if the day is over
  const [status, setStatus] = useState(() => getScheduleStatus(schedule));

  // Update status immediately when schedule prop changes
  // This ensures we don't show outdated period names during data loading
  useEffect(() => {
    setStatus(getScheduleStatus(schedule));
  }, [schedule]);

  // Set up real-time updates to the schedule status
  // Updates every second to reflect current period state
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getScheduleStatus(schedule));
    }, 1000);

    return () => clearInterval(interval);
  }, [schedule]);

  // Generate the appropriate description text based on current schedule status
  const getDescription = (): string => {
    // Check if all periods for the day are complete
    if (status.isDayOver) {
      return "School Day Complete";
    }

    // If we're currently in a class period, show time until it ends
    // Uses the period's name (e.g., "Math", "English", "Period 1")
    if (status.currentPeriod) {
      return `Until ${status.currentPeriod.name} Ends`;
    }

    // If we're between classes, show time until next period starts
    // Uses the next period's name (e.g., "Math", "English", "Period 2")
    if (status.nextPeriod) {
      return `Until ${status.nextPeriod.name} Starts`;
    }

    // No active periods - return empty string (component will render null)
    return "";
  };

  // Get the current description text
  const description = getDescription();

  // Don't render anything if there's no description to show
  if (!description) {
    return null;
  }

  // Render the description with appropriate styling
  return (
    <p className="text-text-secondary text-base md:text-lg font-medium">
      {description}
    </p>
  );
};

export default ClockDescription;
