import React from 'react';

const Info: React.FC = () => (
  <div className="p-6 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">Project Information</h1>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Team</h2>
      <ul className="list-disc ml-6">
        <li><strong>Owners:</strong> Joe Borgman, Asad Sadikov</li>
        <li><strong>Helper:</strong> Ryo Kimura</li>
        <li><strong>Original Founder:</strong> James Hawley</li>
        <li><strong>Sponsors:</strong> Alex Podchaski, Tim Eischens</li>
      </ul>
    </section>
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Feature List</h2>
      <ul className="list-disc ml-6">
        <li>Class schedule display</li>
        <li>Theme switching (light/dark)</li>
        <li>Customizable schedule editor</li>
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
      </ul>
    </section>
    <section>
      <h2 className="text-xl font-semibold mb-2">To Be Implemented</h2>
      <ul className="list-disc ml-6">
        <li>Add ability to login with school acount</li>
        <li>Move off of wifi</li>
      </ul>
    </section>
  </div>
);

export default Info;
