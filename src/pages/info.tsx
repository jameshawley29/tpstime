import React from 'react';
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../components/HamburgerMenu";
import FooterNote from "../components/FooterNote";

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
  <div className="pt max-w-2xl w-full">
    <h1 className="text-2xl font-bold mb-4">Project Information</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Team</h2>
      <ul className="list-disc ml-6">
        <li><strong>Developed By:</strong> Joe Borgman and Asad Sadikov</li>
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
        <li>Display of a personal class schedule</li>
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
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Changelog</h2>
      <ul className="list-disc ml-6">
        <li>Added info page</li>
        <li>Improved navigation with hamburger menu</li>
        <li>Minor UI enhancements</li>
        <li>Added TimeSync with server (Sometimes offline)</li>
        <li>Added Theme switching (Many options available)</li>
      </ul>
    </section>
    </div>
  </div>
);



// ...existing code...


const InfoWithFooter: React.FC = () => (
  <div className="min-h-screen flex flex-col bg-background">
    {/* Top bar: HamburgerMenu top right */}
    <div className="w-full flex flex-row justify-between items-center pt-4 pb-2 px-2 sm:px-4">
      <div />
      <div className="flex flex-row items-center gap-2">
        <HamburgerMenu />
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <Info />
    </div>
    <FooterNote />
  </div>
);


export default InfoWithFooter;
