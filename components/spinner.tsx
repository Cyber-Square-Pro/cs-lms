import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
