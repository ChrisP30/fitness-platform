import React from "react";

const Welcome = () => {
  return (
    <div className="flex w-full h-[90vh] flex-col justify-center items-center border-4 border-white custom-dashboard-item">
      <div className="mx-auto flex w-[90%]">
        <h2 className="text-3xl text-white mx-auto">
          Welcome to Fitness Geek!
        </h2>
      </div>
      <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto flex mt-10">
        <p className="text-white text-sm md:text-base lg:text-lg mx-auto">
          We Pride ourselves with partnering with the top health/fitness
          companies so we can bring you the best products to help you on your
          fitness and health journey!
        </p>
      </div>
    </div>
  );
};

export default Welcome;
