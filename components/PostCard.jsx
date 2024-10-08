/* eslint-disable @next/next/no-img-element */
import React from "react";
import moment from "moment";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="text-gray-600 w-full min-h-[600px] custom-bg shadow-xl border-4 border-white my-[20px] rounded-xl transition-transform duration-700 hover:scale-[1.02]">
      <div className="relative w-full overflow-hidden h-[300px] mx-auto mb-4 transition-all duration-1000 ease-in-out shadow-xl border-b-2 border-white">
        <img
          src={post.featuredImage.url}
          alt=""
          className="absolute w-full h-full object-cover"
        />
      </div>
      <h3 className="text-2xl lg:text-4xl md:text-3xl sm:text-2xl mx-auto flex justify-center w-[75%] mb-10 transition-all duration-1000 custom-shadow">
        <Link
          href={`/post/${post.slug}`}
          className="w-full h-full flex justify-center items-center"
        >
          {post.title}
        </Link>
      </h3>
      <div className="flex justify-center  items-center mb-10">
        <div className="relative w-[50px] h-[50px] transition-all duration-1000 ease-in-out border-4 border-white rounded-full">
          <img
            src={post.author.photo.url}
            alt=""
            className="absolute w-full h-full rounded-full"
          />
        </div>
        <p className="mx-2">{post.author.name}</p>
        <p>🗓️ {moment(post.createdAt).format("MM-DD-YYYY")}</p>
      </div>
      <p className="text-base sm:text-base md:text-xl lg:text-2xl w-[90%] mx-auto my-10">
        {post.excerpt}
      </p>
      <div>
        <button className="bg-red-500 w-[40%] h-14 mx-auto flex justify-center items-center border-red-500 border-4 rounded-lg my-10 text-white text-lg transition-all duration-500 hover:scale-[1.1]">
          <Link
            href={`/post/${post.slug}`}
            className="w-full h-full flex justify-center items-center"
          >
            View Post
          </Link>
        </button>
      </div>
    </div>
  );
};

export default PostCard;
