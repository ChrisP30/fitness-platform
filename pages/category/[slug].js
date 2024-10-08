/* eslint-disable @next/next/no-img-element */
import React from "react";
import Head from "next/head";
import PostWidget from "@/components/PostWidget";
import SubCategories from "@/components/SubCategories";
import {
  getSubCategoryData,
  getSubCategories,
  getSimilarPosts,
} from "@/services"; // Adjust this import based on where your API function is defined
import CategoryCard from "@/components/CategoryCard";


const CategoryPage = ({ subcategories, categories, recentPosts, slug }) => {
  // console.log(recentPosts)

  return (
    <>
      <Head>
        <title>Fitness Geek</title>
      </Head>
      <div className="container mx-auto px-6 mb-8 transition-all duration-1000 ease-in-out">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {subcategories[0].map((subcategory, id) => {
              return <CategoryCard key={id} subcategory={subcategory} />;
            })}
          </div>
          <div className="lg:col-span-4 col-span-1 transition-all duration-1000 ease-in-out">
            <div className="lg:sticky relative top-8">
              <PostWidget recentPosts={recentPosts} slug={slug} />
              {/* <div className="text-gray-600 w-full min-h-[300px] custom-bg border-4 border-white my-[20px] rounded-lg transition-transform duration-700 hover:scale-[1.02]"></div> */}
              <SubCategories categories={categories[0].subcategories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { slug } }) {
  try {
    // Execute both promises in parallel to save time
    const [subcategories, categories, recentPosts] = await Promise.all([
      getSubCategoryData(slug),
      getSubCategories(slug),
      getSimilarPosts([slug], slug),
    ]);

    console.log("Subs Fetched", subcategories);
    // Simplified return using shorthand for properties
    return {
      props: { subcategories, categories, recentPosts, slug },
    };
  } catch (error) {
    console.error("Error fetching subcategory data:", error);

    // Consider providing more context or details in the props for error handling
    return {
      props: {
        subcategories: [],
        categories: [],
        recentPosts: [],
        slug,
        error: "Failed to fetch data", // Optionally pass error messages or codes
      },
    };
  }
}

export default CategoryPage;
