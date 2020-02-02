import React from "react";

function Footer() {
  return (
    <footer className="bg-indigo-900">
      <nav className="flex justify-between max-w-2xl mx-auto p-4 md:p-4 text-sm">
        <p className="text-white">
          See the{` `}
          <a
            className="font-bold text-white hover:underline"
            href="https://github.com/axelclark"
          >
            code
          </a>
          {` `}for this site on Github.
        </p>
      </nav>
    </footer>
  );
}

export default Footer;
