import { ClockParts } from "../types/clockParts";

export function formatClockParts(totalSeconds: number): ClockParts {
  if (totalSeconds >= 3600) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    return {
      leftSide: String(hours), // No padding
      rightSide: String(minutes).padStart(2, "0"), // Padded
    };
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return {
      leftSide: String(minutes), // No padding
      rightSide: String(seconds).padStart(2, "0"), // Padded
    };
  }
}
