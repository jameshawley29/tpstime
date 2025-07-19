import Clock from "../components/clock";
import { aSchedule, bSchedule, cSchedule } from "../types/schedule";
import Weekdays from "../components/weekdays";
import Signature from "../components/signature";
import { WeeklySchedule } from "../types/weekTypes";
import { getTodayIndex } from "../utils/utils";
import Schedule from "../components/schedule";

function Home() {
  const ADay = { title: "A", schedule: aSchedule };
  const BDay = { title: "B", schedule: bSchedule };
  const CDAY = { title: "C", schedule: cSchedule };

  const thisWeek: WeeklySchedule = [BDay, CDAY, BDay, CDAY, ADay];

  return (
    <>
      <div className="absolute justify-center flex w-full p-8 bg-white dark:bg-black">
        <Weekdays weeklySchedule={thisWeek} todayIndex={getTodayIndex()} />
      </div>
      <div className="p-8 min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
        <Clock schedule={thisWeek[getTodayIndex()].schedule} />
      </div>
      <div className="w-full p-8 pt-0 mt-4 bg-white dark:bg-black justify-center flex">
        <Schedule schedule={thisWeek[getTodayIndex()].schedule} />
      </div>
      <div className="py-10 md:py-0"></div>
      <section className="w-full flex justify-between">
        <div className="px-2">
          <button>Settings</button>
        </div>
        <div className="px-2 text-gray-400">
          <Signature />
        </div>
      </section>
    </>
  );
}

export default Home;
