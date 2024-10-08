/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { getProductDetails } from "@/services";
import ProductDescription from "@/components/ProductDescription";
const ProductPage = ({ productDetails }) => {
  console.log(productDetails);
  const description = productDetails.description.raw.children;
  console.log(description);
  return (
    <>
      <div className="flex justify-center items-center p-5">
        <Link href="/shop" className="bg-red-600 text-white px-4 py-2 rounded-md">Return to Shop</Link>
      </div>
      <div className="custom-dashboard-item h-[100%] w-[90%] mx-auto">
        <div className="flex justify-center items-center p-5">
          <h1 className="text-white text-xl md:text-3xl font-bold">
            {productDetails.name}
          </h1>
        </div>
        <div className="flex justify-center items-center p-5">
          <img
            src={productDetails.image[0].url}
            alt=""
            className="w-[60%] h-[60%]"
          />
        </div>
        <div className="flex justify-center items-center p-5">
          <div className="mx-2">
            <h4 className="text-white text-xl md:text-3xl font-bold">
              ${productDetails.price[0]}
            </h4>
          </div>
          <div className="mx-2">
            <h4 className="text-white line-through text-decoration-red text-xl md:text-3xl font-bold">
              ${productDetails.price[1]}
            </h4>
          </div>
        </div>
        <div>
          <ProductDescription description={description} />
        </div>
        <div className="flex justify-center items-center p-5">
          <Link href={productDetails.link} className="w-[33%] h-[50px]">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md w-full h-full border-2 border-white">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductPage;

export async function getServerSideProps(context) {
  const { params } = context;
  const { product: slug } = params; // Ensure the correct parameter is used
  console.log("Fetching product details for slug:", slug); // Log the slug

  try {
    const productDetails = await getProductDetails(slug);
    return {
      props: {
        productDetails,
      },
    };
  } catch (error) {
    console.error("Error fetching product details:", error);
    // Optionally, you can redirect or return a fallback value
    return {
      props: {
        productDetails: null, // or some default value
      },
    };
  }
}
