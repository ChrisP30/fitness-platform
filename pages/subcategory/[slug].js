/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { getCategories, getRecentPosts, getSubCategoryPost } from "@/services";
import PostCard from "@/components/PostCard";
import Categories from "@/components/Categories";
import PostWidget from "@/components/PostWidget";

const SubcategoryPage = ({ initialPosts, categories, recentPosts, slug }) => {
  const [visiblePosts, setVisiblePosts] = useState(initialPosts.slice(0, 5));
  const [nextIndex, setNextIndex] = useState(5);
  const [currentSlug, setCurrentSlug] = useState(slug);

  useEffect(() => {
    const fetchData = async () => {
      // Use initialPosts directly from props
      const newPosts = initialPosts;
      console.log("Fetched new posts:", newPosts); // Log fetched data for debugging
      setVisiblePosts(newPosts.slice(0, 5));
      setNextIndex(5);
    };

    fetchData();
  }, [initialPosts]);

  const loadMorePosts = () => {
    const newPosts = initialPosts.slice(nextIndex, nextIndex + 5);
    setVisiblePosts([...visiblePosts, ...newPosts]);
    setNextIndex(nextIndex + 5);
  };

  return (
    <>
      <Head>
        <title>Fitness Geek</title>
      </Head>
      <div className="container mx-auto px-6 mb-8 transition-all duration-1000 ease-in-out">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 transition-all duration-1000 ease-in-out">
          <div className="lg:col-span-8 col-span-1 transition-all duration-1000 ease-in-out">
            {visiblePosts.length > 0 ? (
              visiblePosts.map((post, index) => (
                <PostCard key={index} post={post.node} />
              ))
            ) : (
              <p>No posts available for this subcategory.</p>
            )}
            {nextIndex < initialPosts.length && (
              <button
                onClick={loadMorePosts}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto flex"
              >
                Load More
              </button>
            )}
          </div>
          <div className="lg:col-span-4 col-span-1 transition-all duration-1000 ease-in-out">
            <div className="lg:sticky relative top-8">
              <PostWidget recentPosts={recentPosts} />
              <Categories categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcategoryPage;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const initialPosts = await getSubCategoryPost(slug);

    const [categories, recentPosts] = await Promise.all([
      getCategories(),
      getRecentPosts(),
    ]);

    recentPosts.reverse();

    return {
      props: {
        initialPosts: initialPosts || [],
        categories: categories || [],
        recentPosts: recentPosts || [],
        slug,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        initialPosts: [],
        categories: [],
        recentPosts: [],
        slug,
      },
    };
  }
}
