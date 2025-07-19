export class ClassPeriod {
  name: string;
  start: string; // "HH:mm"
  end: string; // "HH:mm"

  constructor(name: string, start: string, end: string) {
    this.name = name;
    this.start = start;
    this.end = end;
  }

  getStartUnix(): number {
    return this.timeStringToUnix(this.start);
  }

  getEndUnix(): number {
    return this.timeStringToUnix(this.end);
  }

  getDurationSeconds(): number {
    return this.getEndUnix() - this.getStartUnix();
  }

  private timeStringToUnix(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    const now = new Date();

    now.setHours(hours, minutes, 0, 0);

    return Math.floor(now.getTime() / 1000);
  }
}
