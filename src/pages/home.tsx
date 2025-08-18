import Clock from "../components/clock";
import ClockDescription from "../components/clockDescription";
import Weekdays from "../components/weekdays";
import Signature from "../components/signature";
import { WeeklySchedule } from "../types/weekTypes";
import { getTodayIndex } from "../utils/utils";
import Schedule from "../components/schedule";
import { useNavigate } from "react-router-dom";
import { useGradeBasedSchedule } from "../hooks/useGradeBasedSchedule";

function Home() {
  const navigate = useNavigate();
  const { schedule: gradeBasedSchedule } = useGradeBasedSchedule();

  // Use the grade-based schedule as the daily schedule
  const ADay = { title: "A", schedule: gradeBasedSchedule };
  const BDay = { title: "B", schedule: gradeBasedSchedule };
  const CDay = { title: "C", schedule: gradeBasedSchedule };


  const thisWeek: WeeklySchedule = [ADay, ADay, BDay, CDay, ADay];

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
                  <ClockDescription
                    schedule={thisWeek[getTodayIndex()].schedule}
                  />
                </div>
                <Clock 
                  schedule={thisWeek[getTodayIndex()].schedule} 
                />
              </div>
            </div>
            <div className="w-full p-8 pt-0 mt-4 bg-background justify-center flex">
              <Schedule
                schedule={thisWeek[getTodayIndex()].schedule}
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
