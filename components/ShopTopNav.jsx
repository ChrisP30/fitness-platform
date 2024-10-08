import React from "react";
import { useState } from "react";

const ShopTopNav = () => {
  const [expandTrue, setExpandedTrue] = useState(false);

  const toggleExpand = () => {
    setExpandedTrue(!expandTrue);
  };
  return (
    <div
      className={`custom-dashboard-item mx-auto container mb-2 transition-all duration-700 ease-in-out border-4 border-white flex justify-center ${
        expandTrue ? "h-[500px] items-end" : "h-[100px] items-center"
      }`}
    >
      <button
        className={`bg-orange-600 w-[100px] h-[35px] ${
          expandTrue ? "mb-5" : "mb-0"
        }`}
        onClick={toggleExpand}
      >
        Expand
      </button>
    </div>
  );
};

export default ShopTopNav;
