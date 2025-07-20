import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import LogButton from "../components/logButton";

function Settings() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  return (
    <div className="text-purple-600 dark:text-stone-50 dark:bg-black min-h-screen">
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => navigate("/")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
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
      <div className="p-8 flex flex-col items-center justify-center bg-white dark:bg-black">
        <h1 className="text-2xl font-bold mb-8">Settings</h1>
        
        <div className="w-full max-w-md space-y-6">
          {isSignedIn && user && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Account Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Email: {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}
          
          <div className="flex justify-center">
            <LogButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
