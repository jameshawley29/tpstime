import React from "react";

const FooterNote: React.FC = () => (
  <footer
    className="w-full bg-background text-xs text-gray-400 flex items-center justify-center py-4 shadow-sm"
    style={{ position: 'relative' }}
  >
    <span>
      Questions? Bugs? Request Features? Email: <a href="mailto:tpstime@trinityprep.org" className="underline text-gray-400">tpstime@trinityprep.org</a>
    </span>
  </footer>
);

export default FooterNote;
