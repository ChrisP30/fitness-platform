import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import PostWidgetItem from "./PostWidgetItem";

const PostWidget = ({ recentPosts, slug }) => {
  const [slugAval, setSlugAval] = useState(false);

  useEffect(() => {
    if (slug) {
      setSlugAval(true);
    } else {
      setSlugAval(false);
    }
  }, [slug]);

  return (
    <div className="text-gray-600 w-full min-h-[300px] custom-bg border-4 border-white my-[20px] rounded-lg transition-transform duration-700 hover:scale-[1.02]">
      <h2 className="flex justify-center items-center py-2 border-b-2 border-b-white">
        {slugAval ? "Similar Posts" : "Recent Posts"}
      </h2>
      <div className="h-full">
        {recentPosts.map((post) => {
          return <PostWidgetItem post={post} key={post.title}></PostWidgetItem>;
        })}
      </div>
    </div>
  );
};

export default PostWidget;
