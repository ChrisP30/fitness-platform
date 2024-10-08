/* eslint-disable @next/next/no-img-element */
import "tailwindcss/tailwind.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import PostCard from "@/components/PostCard";
import PostWidget from "@/components/PostWidget";
import Categories from "@/components/Categories";
import { getCategories, getRecentPosts, getPosts } from "@/services";

function Home({ initialPosts, recentPosts, recentCategories }) {
  const [visiblePosts, setVisiblePosts] = useState(initialPosts.slice(0, 5));
  const [nextIndex, setNextIndex] = useState(5);
  console.log(initialPosts);

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
            {visiblePosts.map((post, index) => (
              <PostCard post={post.node} key={index} />
            ))}
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
              <Categories categories={recentCategories} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  try {
    const initialPosts = await getPosts();
    const [recentPosts, categories] = await Promise.all([
      getRecentPosts(),
      getCategories(),
    ]);

    return {
      props: {
        initialPosts: initialPosts || [],
        recentPosts: recentPosts ? recentPosts.reverse() : [],
        recentCategories: categories || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        initialPosts: [],
        recentPosts: [],
        recentCategories: [],
      },
      revalidate: 60,
    };
  }
}
