export function getTodayIndex(): number {
  const jsDay = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  // Map JS day to Monday=0, Friday=4
  // JS: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  // Our: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4
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
