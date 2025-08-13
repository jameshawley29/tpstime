import Clock from "../components/clock";
import ClockDescription from "../components/clockDescription";
import { aSchedule, bSchedule, cSchedule } from "../types/schedule";
import { msASchedule, msBSchedule, msCSchedule } from "../types/msSchedule";
import Weekdays from "../components/weekdays";
import Signature from "../components/signature";
import { WeeklySchedule } from "../types/weekTypes";
import { getTodayIndex, mapScheduleWithClassNames } from "../utils/utils";
import Schedule from "../components/schedule";
import { useNavigate } from "react-router-dom";
import { ClassName } from "../types/className";
import { useSchedule } from "../hooks/useSchedule";
import { useMemo } from "react";
import React from "react";

function Home() {
  const [scheduleType, setScheduleType] = React.useState<'US' | 'MS'>('US');
  const navigate = useNavigate();
  const { schedule, loading } = useSchedule();

  // US schedule
  const ADayUS = { title: "A", schedule: aSchedule };
  const BDayUS = { title: "B", schedule: bSchedule };
  const CDAYUS = { title: "C", schedule: cSchedule };

  // MS schedule
  const ADayMS = { title: "A", schedule: msASchedule };
  const BDayMS = { title: "B", schedule: msBSchedule };
  const CDAYMS = { title: "C", schedule: msCSchedule };

  const defaultClassNames: ClassName[] = [
    { name: "Period 1", period: 1 },
    { name: "Period 2", period: 2 },
    { name: "Period 3", period: 3 },
    { name: "Period 4", period: 4 },
    { name: "Period 5", period: 5 },
    { name: "Period 6", period: 6 },
    { name: "Period 7", period: 7 },
  ];

  const classNames: ClassName[] = useMemo(() => {
    if (
      loading ||
      !schedule ||
      !Array.isArray(schedule) ||
      schedule.length === 0
    ) {
      return defaultClassNames;
    }

    const dbClassNames: ClassName[] = schedule.map((item: any) => ({
      name: item.subject || `Period ${item.period}`,
      period: item.period,
    }));

    const periodMap = new Map<number, string>();
    dbClassNames.forEach((className) => {
      if (className.period) {
        periodMap.set(
          className.period,
          className.name || `Period ${className.period}`
        );
      }
    });

    return defaultClassNames.map((defaultClass) => ({
      name: periodMap.get(defaultClass.period!) || defaultClass.name,
      period: defaultClass.period,
    }));
  }, [schedule, loading]);

  const thisWeek: WeeklySchedule = scheduleType === 'US'
    ? [ADayUS, ADayUS, BDayUS, CDAYUS, ADayUS]
    : [ADayMS, ADayMS, BDayMS, CDAYMS, ADayMS];

  return (
    <>
      <div className="text-text bg-background">
        <div className="w-full flex flex-row justify-between items-start pt-6 pb-2 px-4">
          <div className="w-fit">
            <Weekdays
              weeklySchedule={thisWeek}
              todayIndex={getTodayIndex()}
            />
          </div>
          <div className="flex gap-4 w-fit">
            <button
              className={`px-4 py-2 rounded-lg border-2 text-lg font-bold ${scheduleType === 'US' ? 'bg-primary text-background border-primary' : 'bg-background text-primary border-primary'}`}
              onClick={() => setScheduleType('US')}
            >
              US
            </button>
            <button
              className={`px-4 py-2 rounded-lg border-2 text-lg font-bold ${scheduleType === 'MS' ? 'bg-primary text-background border-primary' : 'bg-background text-primary border-primary'}`}
              onClick={() => setScheduleType('MS')}
            >
              MS
            </button>
          </div>
        </div>
        {getTodayIndex() === -1 ? (
          <div className="text-secondary w-full h-screen flex justify-center items-center text-2xl align-middle">
            No schedule available for today.
          </div>
        ) : (
          <>
            <div className="min-h-screen flex items-center justify-center bg-background p-8">
              <div className="flex flex-col items-center sm:items-start w-fit">
                <div className="md:pl-4 pl-2 md:mb-[-3%]">
                  <ClockDescription
                    schedule={mapScheduleWithClassNames(
                      thisWeek[getTodayIndex()].schedule,
                      classNames
                    )}
                  />
                </div>
                <Clock
                  schedule={mapScheduleWithClassNames(
                    thisWeek[getTodayIndex()].schedule,
                    classNames
                  )}
                />
              </div>
            </div>
            <div className="w-full p-8 pt-0 mt-4 bg-background justify-center flex">
              <Schedule
                schedule={mapScheduleWithClassNames(
                  thisWeek[getTodayIndex()].schedule,
                  classNames
                )}
              />
            </div>
            <div className="py-10 md:py-0"></div>
            <section className="w-full flex justify-between">
              <div className="pl-4 md:pl-8">
                <button className="text-2xl md:text-4xl" onClick={() => navigate("/settings")}>Settings</button>
              </div>
              <div className="pr-4 md:pr-8 text-text text-2xl md:text-4xl">
                <Signature />
              </div>
            </section>
            <div className="w-full h-4 bg-background" />
          </>
        )}
      </div>
    </>
  );
}

export default Home;
