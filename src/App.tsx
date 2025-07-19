import Home from "./pages/home";
import { initializeThemeFromSystemPreference } from "./theme/initTheme";
import { getTodayIndex } from "./utils/utils";

function App() {
  initializeThemeFromSystemPreference();

  return (
    <div className="text-purple-600 dark:text-stone-50 dark:bg-black">
      {getTodayIndex() === -1 ? (
        <div className="text-blue-500 w-full h-screen flex justify-center items-center text-2xl align-middle">
          No schedule available for today.
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
