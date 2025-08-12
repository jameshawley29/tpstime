import { useNavigate } from "react-router-dom";
import LogButton from "../components/logButton";
import ScheduleEditor from "../components/ScheduleEditor";

function Settings() {
  // No authentication required
  const navigate = useNavigate();

  // ...existing code...

  return (
    <div className="text-primary bg-background min-h-screen">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>
      <div className="p-8 flex flex-col items-center justify-center bg-background">
        <h1 className="text-2xl mb-8 text-text">Settings</h1>

        <div className="w-full max-w-md space-y-6">
          {/* Account info removed, no authentication required */}

          <ScheduleEditor />

          <div className="flex justify-center">
            <LogButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
