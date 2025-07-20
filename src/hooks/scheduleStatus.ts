import { ClassPeriod } from "../types/classPeriod";

type ScheduleStatus = {
  secondsUntilNext: number;
  currentPeriod?: ClassPeriod;
  nextPeriod?: ClassPeriod;
  isDayOver: boolean;
};

export function getScheduleStatus(schedule: ClassPeriod[]): ScheduleStatus {
  const nowUnix = Math.floor(Date.now() / 1000);

  for (let i = 0; i < schedule.length; i++) {
    const period = schedule[i];
    const startUnix = period.getStartUnix();
    const endUnix = period.getEndUnix();

    if (nowUnix >= startUnix && nowUnix < endUnix) {
      return {
        secondsUntilNext: endUnix - nowUnix,
        currentPeriod: period,
        nextPeriod: schedule[i + 1] || undefined,
        isDayOver: false,
      };
    }

    if (nowUnix < startUnix) {
      return {
        secondsUntilNext: startUnix - nowUnix,
        currentPeriod: undefined,
        nextPeriod: period,
        isDayOver: false,
      };
    }
  }

  return {
    secondsUntilNext: 0,
    currentPeriod: schedule[schedule.length - 1],
    nextPeriod: undefined,
    isDayOver: true,
  };
}

type ActivePeriodInfo = {
  period: ClassPeriod | undefined;
  isCurrentlyActive: boolean;
  isBetweenClasses: boolean;
};

export function getActivePeriod(schedule: ClassPeriod[]): ActivePeriodInfo {
  const status = getScheduleStatus(schedule);

  // If we're currently in a class
  if (status.currentPeriod && !status.isDayOver) {
    return {
      period: status.currentPeriod,
      isCurrentlyActive: true,
      isBetweenClasses: false,
    };
  }

  // If we're between classes
  if (!status.currentPeriod && status.nextPeriod) {
    return {
      period: status.nextPeriod,
      isCurrentlyActive: false,
      isBetweenClasses: true,
    };
  }

  // Day is over or no classes
  return {
    period: undefined,
    isCurrentlyActive: false,
    isBetweenClasses: false,
  };
}
