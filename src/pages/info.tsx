import React from 'react';
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="p-2 hover:bg-accent rounded-full transition-colors bg-surface border border-accent"
      aria-label="Back to Home"
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
  );
};

const Info: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background text-text">
    <div className="p-6 max-w-2xl w-full">
         <button
           className="mb-4 text-lg font-bold text-primary border-2 border-primary rounded px-4 py-2 hover:bg-primary/10 flex items-center justify-center"
           onClick={() => window.history.back()}
           aria-label="Back"
           style={{ outline: 'none' }}
         >
           ← Back
         </button>
    <h1 className="text-2xl font-bold mb-4">Project Information</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Team</h2>
      <ul className="list-disc ml-6">
        <li><strong>Owners:</strong> Joe Borgman and Asad Sadikov</li>
        <li><strong>Helper:</strong> Ryo Kimura</li>
        <li><strong>Original Founder:</strong> James Hawley</li>
        <li><strong>Sponsors:</strong> Alex Podchaski and Tim Eischens</li>
      </ul>
    </section>
  <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">To Be Implemented</h2>
      <ul className="list-disc ml-6">
        <li>Google authentication of your TPS account</li>
        <li>Ability to access website without being on TPS wifi</li>
        <li>Display of class schedule</li>
  {/* Theme switching removed from To Be Implemented */}
        <li>Customizable schedule editor</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Feature List</h2>
      <ul className="list-disc ml-6">
        <li>Clock and time display</li>
        <li>Logging button</li>
        <li>Weekday selection</li>
  <li>Responsive design</li>
  <li>Theme switching (light/dark)</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Changelog</h2>
      <ul className="list-disc ml-6">
        <li>Added info page</li>
        <li>Improved navigation with hamburger menu</li>
        <li>Minor UI enhancements</li>
      </ul>
    </section>
    </div>
  </div>
);

export default Info;
