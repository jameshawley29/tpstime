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
            <div className="p-8 min-h-screen flex flex-col items-center justify-center bg-background">
              <Clock schedule={thisWeek[getTodayIndex()].schedule} />
            </div>
            <div className="w-full p-8 pt-0 mt-4 bg-background justify-center flex">
              <Schedule schedule={thisWeek[getTodayIndex()].schedule} />
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
