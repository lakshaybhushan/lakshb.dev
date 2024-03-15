import React from "react";

const Header = () => {
  return (
    <main className="text-center md:my-[2vh] mt-[6vh] md:mt-0">
      <div className="mb-4">
        <span className="me-2 rounded border bg-yellow-100 text-xs font-medium text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300 p-2 md:px-4 md:py-3 ">
          🚧 Not Updated since 2023 🚧
        </span>
      </div>
      <h1 className="text-4xl">Projects</h1>
    </main>
  );
};

export default Header;
