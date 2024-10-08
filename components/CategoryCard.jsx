/* eslint-disable @next/next/no-img-element */
import React from "react";
import CategoryPostCard from "./CategoryPostCard";

const CategoryCard = ({ subcategory }) => {
  return (
    <div className="text-gray-600 w-full min-h-[600px] custom-bg shadow-xl border-4 border-white my-[20px] rounded-xl duration-1000 ease-in-out hover:scale-[1.02]">
      <div className="w-full h-[80px] flex justify-center items-center">
        <h1 className="text-2xl lg:text-4xl custom-shadow">{subcategory.name}</h1>
      </div>
      <div className="relative w-[95%] h-[300px] mx-auto border-4 border-white rounded-xl mb-8">
        <img
          src={subcategory.subImage.url}
          alt=""
          className="absolute w-full h-full rounded-lg object-cover"
        />
      </div>
      <div className="w-[80%] flex mx-auto mb-5">
        <p className="text-sm">
          {subcategory.description}
        </p>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center">
        <h4 className="text-2xl text-gray-600 lg:text-3xl  flex justify-center pb-2 custom-shadow">
          Newest Posts
        </h4>
      </div>
      <div>
        {subcategory.posts.map((post, id) => {
          return <CategoryPostCard key={id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default CategoryCard;
