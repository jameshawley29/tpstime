import Clock from "../components/clock";
import { aSchedule, bSchedule, cSchedule } from "../types/schedule";
import Weekdays from "../components/weekdays";
import Signature from "../components/signature";
import { WeeklySchedule } from "../types/weekTypes";
import { getTodayIndex } from "../utils/utils";
import Schedule from "../components/schedule";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const ADay = { title: "A", schedule: aSchedule };
  const BDay = { title: "B", schedule: bSchedule };
  const CDAY = { title: "C", schedule: cSchedule };

  const thisWeek: WeeklySchedule = [BDay, CDAY, BDay, CDAY, ADay];

  return (
    <>
      <div className="text-purple-600 dark:text-stone-50 dark:bg-black">
        {getTodayIndex() === -1 ? (
          <div className="text-blue-500 w-full h-screen flex justify-center items-center text-2xl align-middle">
            No schedule available for today.
          </div>
        ) : (
          <>
            <div className="absolute justify-center flex w-full p-8 bg-white dark:bg-black">
              <Weekdays
                weeklySchedule={thisWeek}
                todayIndex={getTodayIndex()}
              />
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
                <button onClick={() => navigate("/settings")}>
                  Settings
                </button>
              </div>
              <div className="px-2 text-gray-400">
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
