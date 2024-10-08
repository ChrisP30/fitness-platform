/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  getPosts,
  getPostDetails,
  getSimilarPosts,
  getCategories,
} from "@/services";
import PostDetail from "@/components/PostDetail";
import PostWidget from "@/components/PostWidget";
import Categories from "@/components/Categories";
import Author from "@/components/Author";
import Head from "next/head";

const PostDetails = ({ postDetails, recentPosts, categories }) => {
  console.log(postDetails);
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <div className="container mx-auto px-6 mb-8 transition-all duration-1000 ease-in-out">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all duration-1000 ease-in-out">
          <div className="lg:col-span-8 col-span-1 transition-all duration-1000 ease-in-out">
            <PostDetail postDetails={postDetails} />
            <Author author={postDetails.author} />
          </div>
          <div className="lg:col-span-4 col-span-1 transition-all duration-1000 ease-in-out">
            <div className="lg:sticky relative top-8">
              <PostWidget recentPosts={recentPosts} slug={postDetails.slug} />
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  let postDetails,
    categories,
    similarPosts = [];

  try {
    const detailsPromise = getPostDetails(slug);
    const categoriesPromise = getCategories();

    [postDetails, categories] = await Promise.all([
      detailsPromise,
      categoriesPromise,
    ]);

    // Assuming `getPostDetails` might return null or undefined on failure
    if (postDetails && postDetails.categories?.length > 0) {
      const firstCategorySlug = postDetails.categories[0].slug;
      similarPosts = await getSimilarPosts([firstCategorySlug], slug);
    }
  } catch (error) {
    console.error("Error fetching data for post details page:", error);
    // Implement appropriate error handling or fallback here
  }

  return {
    props: {
      postDetails: postDetails || null, // Ensure you handle null cases in your component
      recentPosts: similarPosts,
      categories: categories || [],
    },
  };
}
