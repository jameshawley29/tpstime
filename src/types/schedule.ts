import { ClassPeriod } from "./classPeriod";

export const defaultSchedule = [
  new ClassPeriod("Homeroom", "09:00", "09:15"),
  new ClassPeriod("Math", "09:20", "10:05"),
  new ClassPeriod("English", "10:10", "10:55"),
  new ClassPeriod("Science", "11:00", "11:45"),
  new ClassPeriod("Social Studies", "11:50", "12:35"),
  new ClassPeriod("Lunch", "12:40", "13:20"),
  new ClassPeriod("Physical Education", "13:25", "14:10"),
  new ClassPeriod("Art", "14:15", "15:00"),
  new ClassPeriod("Elective", "15:05", "15:50"),
  new ClassPeriod("Dismissal", "21:50", "22:00"),
];

export const aSchedule = [
  new ClassPeriod("Homeroom", "09:00", "09:10"),
  new ClassPeriod("1st Period", "09:15", "10:00", 1),
  new ClassPeriod("2", "10:05", "10:50", 2),
  new ClassPeriod("3", "10:55", "11:40", 3),
  new ClassPeriod("Lunch", "11:45", "12:30"),
  new ClassPeriod("4", "12:35", "13:20", 4),
  new ClassPeriod("5", "13:25", "14:10", 5),
  new ClassPeriod("6", "14:15", "15:00", 6),
  new ClassPeriod("7", "15:05", "16:00", 7),
  new ClassPeriod("Dismissal", "21:50", "23:20"),
  new ClassPeriod("Leave", "23:00", "23:59"),
];

export const bSchedule = [
  new ClassPeriod("Homeroom", "09:00", "09:20"),
  new ClassPeriod("English", "09:25", "10:10"),
  new ClassPeriod("Math", "10:15", "11:00"),
  new ClassPeriod("Science", "11:05", "11:50"),
  new ClassPeriod("Lunch", "11:55", "12:40"),
  new ClassPeriod("Art", "12:45", "13:30"),
  new ClassPeriod("Social Studies", "13:35", "14:20"),
  new ClassPeriod("Physical Education", "14:25", "15:10"),
  new ClassPeriod("Elective", "15:15", "16:00"),
  new ClassPeriod("Dismissal", "21:50", "22:00"),
];

export const cSchedule = [
  new ClassPeriod("Homeroom", "09:00", "09:05"),
  new ClassPeriod("Science", "09:10", "09:40"),
  new ClassPeriod("Math", "10:00", "10:45"),
  new ClassPeriod("English", "10:50", "11:35"),
  new ClassPeriod("Lunch", "11:40", "12:25"),
  new ClassPeriod("Physical Education", "12:30", "13:15"),
  new ClassPeriod("Art", "13:20", "14:05"),
  new ClassPeriod("Social Studies", "14:10", "14:55"),
  new ClassPeriod("Elective", "15:00", "15:45"),
  new ClassPeriod("Dismissal", "21:50", "22:00"),
];
