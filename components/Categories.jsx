import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import CategoryItem from "./CategoryItem";

const Categories = ({ categories }) => {
  return (
    <div className="text-gray-600 w-full min-h-[300px] custom-bg border-4 border-white my-[20px] rounded-lg transition-transform duration-700 hover:scale-[1.02]">
      <h2 className="flex justify-center items-center border-b-2 border-b-white h-10">
        Categories
      </h2>
      <div className="overflow-scroll h-full">
        {categories.map((category) => {
          return <CategoryItem category={category} key={category.name} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
