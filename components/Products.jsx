/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";

const Products = ({ item }) => {
  console.log(item)
  return (
    <Link href={`/shop/${item.slug}`}>
        <div className="custom-dashboard-item flex flex-col justify-center items-center p-4 border-2 border-white h-[450px]">
          <div className="w-[150px] h-[200px] mb-4">
            <img src={item.image[0].url} alt="" className="w-full h-full"/>
          </div>
          <div>
            <h3 className="text-white text-md">{item.name}</h3>
          </div>
          <div className="mt-2 mb-2 text-sm">
            <h4 className="text-white">{item.rating}</h4>
          </div>
          <div className="flex">
            <div className="mx-2">
              <h4 className="text-white">${item.price[0]}</h4>
            </div>
            <div className="mx-2">
              <h4 className="text-white line-through text-decoration-red">${item.price[1]}</h4>
            </div>
          </div>
          <div className="w-[75%] h-[35px] mt-4 md:w-[75%]">
            <button className="bg-orange-600 w-full h-full rounded-lg border-2 border-white">
                View Product
            </button>
          </div>
          <div className="mt-3">
            <h4 className="text-white text-[11px]">Free Shipping for Orders over $75.00 with provider!</h4>
          </div>
        </div>
    </Link>
  );
};

export default Products;
