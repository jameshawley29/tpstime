function getTodayIndex(): number {
  const jsDay = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  // Map JS day to Monday=0, Friday=4
  // JS: Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6
  // Our: Mon=0, Tue=1, Wed=2, Thu=3, Fri=4
  if (jsDay >= 1 && jsDay <= 5) {
    return jsDay - 1;
  }
  return -1; // Not a weekday (Mon-Fri)
}

export { getTodayIndex };
