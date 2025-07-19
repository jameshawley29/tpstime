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
