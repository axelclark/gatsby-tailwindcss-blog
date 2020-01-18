import React from "react";

function Footer() {
  return (
    <footer className="bg-blue-700">
      <nav className="flex justify-between max-w-4xl mx-auto p-4 md:p-4 text-sm">
        <p className="text-white">
          Created by{` `}
          <a
            className="font-bold no-underline text-white"
            href="https://bryant.io"
          >
            Axel Clark
          </a>
        </p>
      </nav>
    </footer>
  );
}

export default Footer;
