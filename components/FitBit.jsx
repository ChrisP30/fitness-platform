import React, { useState } from "react";
import Link from "next/link";

const FitBit = () => {
  const [skipTrue, setSkipTrue] = useState(false);
  
  const FitBitRoutes = [
    {
      mainText: "Have a Fitbit?",
      buttonText: "Integrate Here",
      path: "fitbitintegration",
    },
    { mainText: "Don't Have One?", buttonText: "Buy Here", path: "shop" },
  ];

  return (
    !skipTrue && (
      <div className="custom-dashboard container mx-auto border-4 border-white my-5 w-[90%] transition-all duration-1000 ease-in-out">
        <div className="flex text-white h-[100px] mt-10 mx-auto justify-center items-center">
          <h2 className="text-lg md:text-2xl lg:text-3xl">
            You are not logged in for Fitbit Integration
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row w-[90%] container h-fit mx-auto my-10 transition-all duration-1000 ease-in-out p-1">
          {FitBitRoutes.map((item, key) => (
            <div
              className="flex h-[200px] my-2 justify-center w-[90%] bg-white flex-col lg:w-[50%] items-center custom-dashboard-item border-2 border-white lg:mr-3 mx-auto"
              key={key}
            >
              <h3 className="text-white text-2xl mb-5">{item.mainText}</h3>
              <Link href={`/${item.path}`} className="w-[50%] h-[50px]">
                <button className="bg-orange-400 h-full w-full">
                  {item.buttonText}
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-[75px]">
          <h4 
            className="text-white text-xl hover:text-black transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setSkipTrue(true)}
          >
            Skip for Now
          </h4>
        </div>
      </div>
    )
  );
};

export default FitBit;
