import Clock from "../components/clock";
import ClockDescription from "../components/clockDescription";
import { aSchedule, bSchedule, cSchedule } from "../types/schedule";
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
  const navigate = useNavigate();
  const { schedule, loading } = useSchedule();

  const ADay = { title: "A", schedule: aSchedule };
  const BDay = { title: "B", schedule: bSchedule };
  const CDAY = { title: "C", schedule: cSchedule };

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

  const thisWeek: WeeklySchedule = [ADay, ADay, BDay, CDAY, ADay];

  return (
    <>
      <div className="text-text bg-background">
        {getTodayIndex() === -1 ? (
          <div className="text-secondary w-full h-screen flex justify-center items-center text-2xl align-middle">
            No schedule available for today.
          </div>
        ) : (
          <>
            <div className="absolute justify-center flex w-full p-8 bg-background">
              <Weekdays
                weeklySchedule={thisWeek}
                todayIndex={getTodayIndex()}
              />
            </div>
            <div className="min-h-screen flex items-center justify-center bg-background p-8">
              <div className="flex flex-col items-center sm:items-start w-fit">
                <div className="md:pl-4 pl-2 md:mb-[-3%]">
                  {/* Pass the mapped schedule with custom period names, not the raw schedule */}
                  <ClockDescription
                    schedule={mapScheduleWithClassNames(
                      thisWeek[getTodayIndex()].schedule,
                      classNames
                    )}
                  />
                </div>
                {/* Pass the mapped schedule with custom period names for consistency */}
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
              <div className="px-2">
                <button onClick={() => navigate("/settings")}>Settings</button>
              </div>
              <div className="px-2 text-text-secondary">
                <Signature />
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
