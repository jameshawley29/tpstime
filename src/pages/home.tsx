import Clock from "../components/clock";
import ClockDescription from "../components/clockDescription";
import TimeSync from "../components/TimeSync";
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
import HamburgerMenu from "../components/HamburgerMenu";
import FooterNote from "../components/FooterNote";

function Home() {
  const [scheduleType, setScheduleType] = React.useState<'US' | 'MS'>(() => {
    const saved = localStorage.getItem('scheduleType');
    return saved === 'MS' ? 'MS' : 'US';
  });
  const navigate = useNavigate();
  const { schedule, loading } = useSchedule();

  React.useEffect(() => {
    const handler = (e: any) => {
      setScheduleType(e.detail);
    };
    window.addEventListener('scheduleTypeChanged', handler);
    return () => window.removeEventListener('scheduleTypeChanged', handler);
  }, []);

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
  <div className="text-text bg-background min-h-screen w-full flex flex-col relative">
      {/* Top bar: HamburgerMenu and Weekdays on same row */}
      <div className="w-full flex flex-row justify-between items-center pt-4 pb-2 px-2 sm:px-4">
        <div className="flex flex-row items-center gap-2">
          <Weekdays
            weeklySchedule={thisWeek}
            todayIndex={getTodayIndex()}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <HamburgerMenu />
        </div>
      </div>
      {/* Main content */}
      {getTodayIndex() === -1 ? (
        <div className="text-secondary w-full min-h-screen flex justify-center items-center text-xl sm:text-2xl align-middle">
          No schedule available for today.
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full bg-background min-h-screen">
            <div className="flex flex-col items-center w-full max-w-2xl">
              <div className="w-full px-2 sm:px-4 mb-2">
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
              {/* TimeSync accuracy below the clock */}
              <div className="w-full flex justify-center mt-2">
                <TimeSync />
              </div>
            </div>
          </div>
          <div className="w-full px-2 sm:px-8 pt-0 mt-4 bg-background flex justify-center">
            <div className="w-full max-w-2xl">
              <Schedule
                schedule={mapScheduleWithClassNames(
                  thisWeek[getTodayIndex()].schedule,
                  classNames
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}



const HomeWithFooter: React.FC = () => (
  <>
    <Home />
    <FooterNote />
  </>
);

export default HomeWithFooter;
