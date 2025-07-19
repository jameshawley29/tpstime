import Home from "./pages/home";
import { initializeThemeFromSystemPreference } from "./theme/initTheme";

function App() {
  initializeThemeFromSystemPreference();

  return (
    <div className="text-purple-600 dark:text-stone-50 dark:bg-black">
      <Home />
    </div>
  );
}

export default App;
