<<<<<<< Updated upstream
import { ClassPeriod } from "../types/classPeriod";
import { ClassName } from "../types/className";
=======
import Clock from "../components/clock";
import { aSchedule, bSchedule, cSchedule } from "../types/schedule";
import Weekdays from "../components/weekdays";
import Signature from "../components/signature";
import { WeeklySchedule } from "../types/weekTypes";
import Schedule from "../components/schedule";
import { useNavigate } from "react-router-dom";
>>>>>>> Stashed changes

export function getTodayIndex(): number {
  const jsDay = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  // Map JS day to Monday=0, Friday=4
  // JS: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  // Our: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4
  // delete after testing week behavior
  return 1;

  if (jsDay >= 1 && jsDay <= 5) {
    return jsDay - 1;
  }
  return -1; // Not a weekday (Mon-Fri)
}

export function getFormattedDate(date: Date): string {
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";
  return `${month} ${day}${suffix}`;
}

export function getTimeLeftInPeriod(): string {
  const now = new Date();
  const todayIndex = getTodayIndex();

  if (todayIndex === -1) return "No class in session";
  
  const ADay = { title: "A", schedule: aSchedule };
  const BDay = { title: "B", schedule: bSchedule };
  const CDAY = { title: "C", schedule: cSchedule };
  const thisWeek: WeeklySchedule = [ADay, ADay, BDay, CDAY, ADay];

  const currentPeriod = thisWeek[todayIndex].schedule.find((period) => {
    const start = new Date();
    const [startHour, startMinute] = period.start.split(":").map(Number);
    start.setHours(startHour, startMinute, 0, 0);

    const end = new Date();
    const [endHour, endMinute] = period.end.split(":").map(Number);
    end.setHours(endHour, endMinute, 0, 0);

    return now >= start && now < end;
  });

  if (!currentPeriod) return "No class in session";

  const end = new Date();
  const [endHour, endMinute] = currentPeriod.end.split(":").map(Number);
  end.setHours(endHour, endMinute, 0, 0);

  const timeLeft = end.getTime() - now.getTime();
  const minutesLeft = Math.ceil(timeLeft / (1000 * 60))-1;
  const secondsLeft = Math.ceil((timeLeft % (1000 * 60)) / 1000);

  return `${minutesLeft}:${secondsLeft < 10 ? "0" : ""}${secondsLeft}`;
}

export function convertTo12Hour(time24: string): string {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);

  // Convert to 12-hour format
  if (hour === 0) {
    hour = 12; // midnight
  } else if (hour > 12) {
    hour -= 12;
  }

  return `${hour}:${minute}`;
}

export function mapScheduleWithClassNames(
  schedule: ClassPeriod[],
  classNames: ClassName[]
): ClassPeriod[] {
  // Create a lookup map for quick access to class names by period
  const classNameMap = new Map<number, string>();
  classNames.forEach((className) => {
    if (className.period !== undefined && className.name !== undefined) {
      classNameMap.set(className.period, className.name);
    }
  });

  // Map the schedule, replacing names for periods that have matching class names
  return schedule.map((period) => {
    if (period.period !== undefined && classNameMap.has(period.period)) {
      return new ClassPeriod(
        classNameMap.get(period.period)!,
        period.start,
        period.end,
        period.period
      );
    }
    // Return a new ClassPeriod instance to maintain immutability
    return new ClassPeriod(
      period.name,
      period.start,
      period.end,
      period.period
    );
  });
}
