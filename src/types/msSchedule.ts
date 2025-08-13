// Placeholder MS schedules for A, B, C days

import { ClassPeriod } from "./classPeriod";

export const msASchedule: ClassPeriod[] = [
  new ClassPeriod("Advisory", "08:00", "08:05"),
  new ClassPeriod("1st Period", "08:10", "08:55"),
  new ClassPeriod("2nd Period", "09:00", "09:45"),
  new ClassPeriod("Break", "09:50", "10:10"),
  new ClassPeriod("3rd Period", "10:15", "11:00"),
  new ClassPeriod("4th Period", "11:05", "11:50"),
  new ClassPeriod("MS Lunch", "11:55", "12:30"),
  new ClassPeriod("MS 5th Period", "12:35", "13:20"),
  new ClassPeriod("6th Period", "13:25", "14:10"),
  new ClassPeriod("7th Period", "14:15", "15:00"),
  new ClassPeriod("Study Period", "15:00", "15:20"),
];

export const msBSchedule: ClassPeriod[] = [
  new ClassPeriod("Advisory", "08:00", "08:05"),
  new ClassPeriod("1st Period", "08:10", "09:30"),
  new ClassPeriod("Break", "09:35", "09:55"),
  new ClassPeriod("3rd Period", "10:00", "11:20"),
  new ClassPeriod("MS Lunch", "11:25", "12:05"),
  new ClassPeriod("MS 5th Period", "12:10", "13:30"),
  new ClassPeriod("7th Period", "13:35", "14:55"),
  new ClassPeriod("Study Period", "15:00", "15:20"),
];

export const msCSchedule: ClassPeriod[] = [
  new ClassPeriod("Advisory", "08:00", "08:05"),
  new ClassPeriod("2nd Period", "08:10", "09:30"),
  new ClassPeriod("MS Long Advisory", "09:35", "09:55"),
  new ClassPeriod("MS Chapel", "10:00", "10:20"),
  new ClassPeriod("4th Period", "10:25", "11:45"),
  new ClassPeriod("MS Lunch", "11:50", "12:30"),
  new ClassPeriod("MS Middle Block", "12:35", "13:15"),
  new ClassPeriod("6th Period", "13:20", "14:40"),
  new ClassPeriod("Study Period", "14:45", "15:15"),
];
